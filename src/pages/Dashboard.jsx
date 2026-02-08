import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/config';
import { logOut } from '../firebase/auth';
import { 
  User, Clock, CreditCard, LogOut, Mic, 
  TrendingUp, Award, Calendar, Check, Sparkles, Zap 
} from 'lucide-react';

export default function Dashboard({ user }) {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [appStatus, setAppStatus] = useState('offline'); // 'active', 'idle', 'offline'

  useEffect(() => {
    if (!user) return;

    const docId = user.email.replace('.', '_').replace('@', '_at_');
    const userRef = doc(db, 'users', docId);

    // Real-time listener (Firebase onSnapshot)
    const unsubscribe = onSnapshot(userRef, (doc) => {
      console.log('[DASHBOARD] Firebase update received!', new Date().toISOString());
      
      if (doc.exists()) {
        const data = doc.data();
        console.log('[DASHBOARD] Data:', {
          remaining_seconds: data.remaining_seconds,
          last_active: data.last_active,
          is_using_app: data.is_using_app
        });
        
        setUserData(data);
        setSyncing(false);
        
        // Check app status based on last_active timestamp
        if (data.last_active) {
          const lastActive = new Date(data.last_active);
          const now = new Date();
          const diffSeconds = (now - lastActive) / 1000;
          
          console.log('[DASHBOARD] Time diff:', diffSeconds, 'seconds');
          
          if (diffSeconds < 10) {
            console.log('[DASHBOARD] Status: ACTIVE');
            setAppStatus('active'); // Active in last 10 seconds
          } else if (diffSeconds < 60) {
            console.log('[DASHBOARD] Status: IDLE');
            setAppStatus('idle'); // Idle (last active within 1 minute)
          } else {
            console.log('[DASHBOARD] Status: OFFLINE');
            setAppStatus('offline'); // Offline (no activity for 1+ minute)
          }
        } else {
          console.log('[DASHBOARD] No last_active - Status: OFFLINE');
          setAppStatus('offline');
        }
      }
      setLoading(false);
    }, (error) => {
      console.error('[DASHBOARD] onSnapshot error:', error);
    });

    // Additional 5-second polling for extra reliability
    const pollInterval = setInterval(async () => {
      setSyncing(true);
      // onSnapshot will automatically update when data changes
      // This just triggers a visual sync indicator
      setTimeout(() => setSyncing(false), 500);
    }, 5000);

    return () => {
      unsubscribe();
      clearInterval(pollInterval);
    };
  }, [user]);

  const handleLogout = async () => {
    await logOut();
    window.location.href = '/';
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    // Format as HH:MM:SS
    const h = String(hours).padStart(2, '0');
    const m = String(minutes).padStart(2, '0');
    const s = String(secs).padStart(2, '0');
    
    return `${h}:${m}:${s}`;
  };

  const handlePayment = (link) => {
    window.open(link, '_blank');
  };

  const handleRazorpayPayment = async (amount, packageType) => {
    // Check if Razorpay is loaded
    if (!window.Razorpay) {
      alert('Payment gateway is loading. Please try again in a moment.');
      return;
    }

    try {
      // Create order on backend first (this ensures auto-capture)
      const response = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: amount * 100, // Amount in paise
          email: user?.email,
          phone: userData?.phoneNumber || '',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create order');
      }

      const order = await response.json();
      console.log('Order created:', order.id);

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_live_SDa0tRbVfVpnhQ',
        amount: order.amount,
        currency: order.currency,
        name: 'InterviewAI',
        description: packageType,
        order_id: order.id, // Use order ID from backend
        image: '/logo.png',
        handler: async function (response) {
          console.log('Payment ID:', response.razorpay_payment_id);
          console.log('Order ID:', response.razorpay_order_id);
          
          // Call test-add-time endpoint to add time immediately with amount
          try {
            alert('Payment successful! Adding time...');
            const addTimeResponse = await fetch(`/api/test-add-time?email=${encodeURIComponent(user?.email)}&amount=${amount}`);
            const result = await addTimeResponse.json();
            
            if (result.success) {
              alert('Time added successfully! Refreshing...');
              setTimeout(() => {
                window.location.reload();
              }, 1000);
            } else {
              alert('Payment successful but time addition failed. Please refresh manually.');
              setTimeout(() => {
                window.location.reload();
              }, 2000);
            }
          } catch (error) {
            console.error('Error adding time:', error);
            alert('Payment successful! Please refresh the page to see updated time.');
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          }
        },
        prefill: {
          name: user?.displayName || '',
          email: user?.email || '',
          contact: userData?.phoneNumber || '',
        },
        notes: {
          email: user?.email,
          phone: userData?.phoneNumber || '',
        },
        theme: {
          color: '#3B82F6',
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment initialization failed. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  const remainingTime = userData?.remaining_seconds || 0;
  const totalPurchased = userData?.total_purchased || 0;
  const isFirstTime = totalPurchased === 0;

  const currentPrice = isFirstTime ? 300 : 500;
  const paymentLink = isFirstTime 
    ? 'https://rzp.io/rzp/7Q42vVa'  // First time ₹300
    : 'https://rzp.io/rzp/GrVtHchT'; // Regular ₹500

  // Testing link (₹1 for 30 minutes)
  const testingLink = 'https://rzp.io/rzp/0Jo7CKc';

  const features = [
    '2 Hours Practice Time',
    'Perfect for 1 Interview',
    'All Features Included',
    'Real-time AI Answers',
    '100% Stealth Mode',
    'Resume Upload',
    '3 Input Modes',
    'Screenshot Analysis',
    '12+ Tech Stacks',
    'Instant Activation'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      {/* Modern Header with Gradient */}
      <header className="bg-white/80 backdrop-blur-lg shadow-sm border-b border-gray-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex justify-between items-center gap-2">
            <Link to="/" className="flex items-center space-x-2 group flex-shrink-0">
              <div className="bg-gradient-to-br from-primary-600 to-blue-600 p-2 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300">
                <Mic className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-primary-600 to-blue-600 bg-clip-text text-transparent">InterviewAI</span>
            </Link>
            <div className="flex items-center gap-2 flex-shrink-0">
              {/* Compact App Status Indicator */}
              {appStatus === 'active' && (
                <div className="flex items-center gap-1.5 px-2 py-1 bg-green-50 border border-green-200 rounded-full">
                  <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                  <span className="text-green-700 font-semibold text-xs hidden sm:inline">Active</span>
                </div>
              )}
              {appStatus === 'idle' && (
                <div className="flex items-center gap-1.5 px-2 py-1 bg-yellow-50 border border-yellow-200 rounded-full">
                  <div className="h-2 w-2 rounded-full bg-yellow-500 animate-pulse"></div>
                  <span className="text-yellow-700 font-semibold text-xs hidden sm:inline">Idle</span>
                </div>
              )}
              {appStatus === 'offline' && (
                <div className="flex items-center gap-1.5 px-2 py-1 bg-gray-50 border border-gray-200 rounded-full">
                  <div className="h-2 w-2 rounded-full bg-gray-400"></div>
                  <span className="text-gray-600 font-semibold text-xs hidden sm:inline">Offline</span>
                </div>
              )}
              
              <button onClick={handleLogout} className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-700 rounded-lg transition-all duration-300 shadow-sm">
                <LogOut className="h-4 w-4" />
                <span className="font-medium text-sm hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Modern Welcome Section with Gradient */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-primary-600 to-blue-600 bg-clip-text text-transparent mb-2">
            Welcome back, {user?.displayName || 'User'}!
          </h1>
          <p className="text-gray-600 text-lg">Ready to ace your next interview? 🚀</p>
        </motion.div>

        {/* Modern Stats Grid with Gradients */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="relative overflow-hidden bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 group"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-blue-100 text-sm font-medium mb-1">Remaining Time</p>
                  <p className="text-4xl font-black text-white">{formatTime(remainingTime)}</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm p-4 rounded-xl">
                  <Clock className="h-8 w-8 text-white" />
                </div>
              </div>
              <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                <div className="h-full bg-white/40 rounded-full" style={{width: `${Math.min((remainingTime / 7200) * 100, 100)}%`}}></div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative overflow-hidden bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 group"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm font-medium mb-1">Total Purchased</p>
                  <p className="text-4xl font-black text-white">{formatTime(totalPurchased)}</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm p-4 rounded-xl">
                  <TrendingUp className="h-8 w-8 text-white" />
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="relative overflow-hidden bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 group"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm font-medium mb-1">Sessions</p>
                  <p className="text-4xl font-black text-white">{userData?.payment_history?.length || 0}</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm p-4 rounded-xl">
                  <Award className="h-8 w-8 text-white" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Modern Profile Section + Payment History (Desktop only) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-1 space-y-6 hidden lg:block"
          >
            {/* Profile Card */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <div className="bg-gradient-to-br from-primary-500 to-blue-500 p-2 rounded-lg mr-3">
                  <User className="h-5 w-5 text-white" />
                </div>
                Profile
              </h2>
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  {user?.photoURL ? (
                    <img 
                      src={user.photoURL} 
                      alt="Profile" 
                      className="h-20 w-20 rounded-full ring-4 ring-primary-100 shadow-lg"
                    />
                  ) : (
                    <div className="h-20 w-20 rounded-full bg-gradient-to-br from-primary-400 to-blue-500 flex items-center justify-center ring-4 ring-primary-100 shadow-lg">
                      <User className="h-10 w-10 text-white" />
                    </div>
                  )}
                  <div>
                    <p className="font-bold text-gray-900 text-lg">{user?.displayName}</p>
                    <p className="text-sm text-gray-600">{user?.email}</p>
                  </div>
                </div>
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-gray-600">Member since</p>
                    <Calendar className="h-4 w-4 text-gray-400" />
                  </div>
                  <p className="text-sm font-semibold text-gray-900">
                    {userData?.createdAt?.toDate().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) || 'Recently'}
                  </p>
                </div>
              </div>
            </div>

            {/* Payment History - Desktop */}
            {userData?.payment_history && userData.payment_history.length > 0 && (
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-gray-100">
                <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <div className="bg-gradient-to-br from-indigo-500 to-purple-500 p-2 rounded-lg mr-3">
                    <Calendar className="h-4 w-4 text-white" />
                  </div>
                  Payment History
                </h2>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {userData.payment_history.slice().reverse().map((payment, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex justify-between items-center p-3 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl hover:shadow-md transition-all duration-300 border border-gray-100"
                    >
                      <div className="flex items-center space-x-2">
                        <div className={`p-1.5 rounded-lg ${payment.amount === 0 ? 'bg-gradient-to-br from-green-400 to-emerald-500' : 'bg-gradient-to-br from-blue-400 to-indigo-500'}`}>
                          {payment.amount === 0 ? (
                            <Sparkles className="h-4 w-4 text-white" />
                          ) : (
                            <CreditCard className="h-4 w-4 text-white" />
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 text-sm">{payment.package}</p>
                          <p className="text-xs text-gray-500">{new Date(payment.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-900">₹{payment.amount}</p>
                        <p className="text-xs text-gray-600">{formatTime(payment.seconds)}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          {/* Profile Card - Mobile only */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:hidden"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <div className="bg-gradient-to-br from-primary-500 to-blue-500 p-2 rounded-lg mr-3">
                  <User className="h-5 w-5 text-white" />
                </div>
                Profile
              </h2>
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  {user?.photoURL ? (
                    <img 
                      src={user.photoURL} 
                      alt="Profile" 
                      className="h-20 w-20 rounded-full ring-4 ring-primary-100 shadow-lg"
                    />
                  ) : (
                    <div className="h-20 w-20 rounded-full bg-gradient-to-br from-primary-400 to-blue-500 flex items-center justify-center ring-4 ring-primary-100 shadow-lg">
                      <User className="h-10 w-10 text-white" />
                    </div>
                  )}
                  <div>
                    <p className="font-bold text-gray-900 text-lg">{user?.displayName}</p>
                    <p className="text-sm text-gray-600">{user?.email}</p>
                  </div>
                </div>
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-gray-600">Member since</p>
                    <Calendar className="h-4 w-4 text-gray-400" />
                  </div>
                  <p className="text-sm font-semibold text-gray-900">
                    {userData?.createdAt?.toDate().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) || 'Recently'}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Modern Payment Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="lg:col-span-2"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <div className="bg-gradient-to-br from-green-500 to-emerald-500 p-2 rounded-lg mr-3">
                  <CreditCard className="h-5 w-5 text-white" />
                </div>
                Add Practice Time
              </h2>

              {/* Modern Pricing Card */}
              <div className="relative max-w-md mx-auto">
                {/* Special Offer Badge */}
                {isFirstTime && (
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                    className="absolute -top-4 -right-4 z-10"
                  >
                    <div className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white px-4 py-2 rounded-full shadow-2xl flex items-center space-x-2 animate-pulse">
                      <Sparkles className="h-4 w-4 animate-spin" />
                      <span className="font-bold text-xs">SPECIAL OFFER!</span>
                    </div>
                  </motion.div>
                )}

                <div className="relative overflow-hidden border-2 border-primary-200 rounded-2xl p-8 bg-gradient-to-br from-white via-blue-50 to-purple-50 shadow-xl hover:shadow-2xl transition-all duration-300 group">
                  {/* Animated Background */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary-200/30 to-blue-200/30 rounded-full -mr-32 -mt-32 group-hover:scale-150 transition-transform duration-700"></div>
                  
                  <div className="relative z-10">
                    {/* Header */}
                    <div className="text-center mb-6">
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">
                        {isFirstTime ? '🎉 First Time Special' : '⚡ Regular Price'}
                      </h3>
                      
                      <div className="flex items-center justify-center space-x-3 mb-4">
                        <div className="text-6xl font-black bg-gradient-to-r from-primary-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                          ₹{currentPrice}
                        </div>
                      </div>

                      {isFirstTime && (
                        <div className="inline-block bg-gradient-to-r from-orange-100 to-red-100 text-orange-700 px-4 py-2 rounded-full text-sm font-bold mb-3 shadow-md">
                          💰 Save ₹200 on your first purchase!
                        </div>
                      )}

                      <p className="text-gray-700 font-semibold text-lg">⏱️ 2 Hours Practice Time</p>
                      
                      {!isFirstTime && (
                        <p className="text-xs text-gray-500 mt-2">
                          Regular price for subsequent purchases
                        </p>
                      )}
                    </div>

                    {/* Features Grid */}
                    <div className="grid grid-cols-2 gap-3 mb-6">
                      {features.map((feature, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.6 + index * 0.05 }}
                          className="flex items-center space-x-2 bg-white/60 backdrop-blur-sm rounded-lg p-2"
                        >
                          <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center shadow-md">
                            <Check className="h-3 w-3 text-white" strokeWidth={3} />
                          </div>
                          <span className="text-xs text-gray-700 font-medium">{feature}</span>
                        </motion.div>
                      ))}
                    </div>

                    {/* CTA Button */}
                    <button
                      onClick={() => handleRazorpayPayment(currentPrice, isFirstTime ? 'First Time Special - 2 Hours' : 'Regular Package - 2 Hours')}
                      className="w-full bg-gradient-to-r from-primary-600 via-blue-600 to-purple-600 hover:from-primary-700 hover:via-blue-700 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-2xl flex items-center justify-center space-x-2 group"
                    >
                      <span className="text-lg">Buy Now - ₹{currentPrice}</span>
                      <Zap className="h-5 w-5 group-hover:animate-bounce" />
                    </button>

                    {/* Payment methods */}
                    <div className="mt-4 text-center">
                      <p className="text-xs text-gray-500 mb-2">🔒 Secure payment via Razorpay</p>
                      <div className="flex items-center justify-center space-x-4 text-xs text-gray-400">
                        <span className="flex items-center space-x-1">
                          <span>💳</span>
                          <span>Card</span>
                        </span>
                        <span>•</span>
                        <span className="flex items-center space-x-1">
                          <span>📱</span>
                          <span>UPI</span>
                        </span>
                        <span>•</span>
                        <span className="flex items-center space-x-1">
                          <span>👛</span>
                          <span>Wallet</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Info Boxes */}
              <div className="mt-6 space-y-4">
                <div className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl shadow-sm">
                  <p className="text-sm text-yellow-800 flex items-start">
                    <span className="text-lg mr-2">⚡</span>
                    <span><strong>Instant Activation:</strong> Your time will be added automatically within 2-5 seconds after payment.</span>
                  </p>
                </div>

                {/* Testing Button */}
                <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl shadow-sm">
                  <p className="text-sm text-blue-800 mb-3 flex items-start">
                    <span className="text-lg mr-2">🧪</span>
                    <span><strong>Testing Mode:</strong> Try with ₹1 payment (30 minutes)</span>
                  </p>
                  <button
                    onClick={() => handleRazorpayPayment(1, 'Testing Package - 30 Minutes')}
                    className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 text-sm shadow-md hover:shadow-lg"
                  >
                    Test Payment - ₹1 (30 minutes) 🚀
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Payment History - Mobile only (at the end) */}
        {userData?.payment_history && userData.payment_history.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="lg:hidden mt-8"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-gray-100">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <div className="bg-gradient-to-br from-indigo-500 to-purple-500 p-2 rounded-lg mr-3">
                  <Calendar className="h-4 w-4 text-white" />
                </div>
                Payment History
              </h2>
              <div className="space-y-3">
                {userData.payment_history.slice().reverse().map((payment, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex justify-between items-center p-3 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl hover:shadow-md transition-all duration-300 border border-gray-100"
                  >
                    <div className="flex items-center space-x-2">
                      <div className={`p-1.5 rounded-lg ${payment.amount === 0 ? 'bg-gradient-to-br from-green-400 to-emerald-500' : 'bg-gradient-to-br from-blue-400 to-indigo-500'}`}>
                        {payment.amount === 0 ? (
                          <Sparkles className="h-4 w-4 text-white" />
                        ) : (
                          <CreditCard className="h-4 w-4 text-white" />
                        )}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">{payment.package}</p>
                        <p className="text-xs text-gray-500">{new Date(payment.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900">₹{payment.amount}</p>
                      <p className="text-xs text-gray-600">{formatTime(payment.seconds)}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
