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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="bg-primary-600 p-2 rounded-lg">
                <Mic className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900">InterviewAI</span>
            </Link>
            <div className="flex items-center space-x-4">
              {/* App Status Indicator */}
              {appStatus === 'active' && (
                <div className="flex items-center space-x-2 text-sm">
                  <div className="relative">
                    <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse"></div>
                    <div className="absolute inset-0 h-3 w-3 rounded-full bg-green-500 animate-ping"></div>
                  </div>
                  <span className="text-green-600 font-medium">🎯 App Active</span>
                </div>
              )}
              {appStatus === 'idle' && (
                <div className="flex items-center space-x-2 text-sm">
                  <div className="h-3 w-3 rounded-full bg-yellow-500 animate-pulse"></div>
                  <span className="text-yellow-600 font-medium">⏸️ App Idle</span>
                </div>
              )}
              {appStatus === 'offline' && (
                <div className="flex items-center space-x-2 text-sm">
                  <div className="h-3 w-3 rounded-full bg-gray-400"></div>
                  <span className="text-gray-500 font-medium">⚪ App Offline</span>
                </div>
              )}
              
              {/* Sync Indicator */}
              {syncing && (
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-600"></div>
                  <span>Syncing...</span>
                </div>
              )}
              
              <button onClick={handleLogout} className="btn-secondary flex items-center space-x-2">
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.displayName || 'User'}!
          </h1>
          <p className="text-gray-600">Ready to practice your interview skills?</p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="card"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Remaining Time</p>
                <p className="text-3xl font-bold text-gray-900">{formatTime(remainingTime)}</p>
              </div>
              <div className="bg-primary-100 p-3 rounded-lg">
                <Clock className="h-8 w-8 text-primary-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="card"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Purchased</p>
                <p className="text-3xl font-bold text-gray-900">{formatTime(totalPurchased)}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="card"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Sessions</p>
                <p className="text-3xl font-bold text-gray-900">{userData?.payment_history?.length || 0}</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-lg">
                <Award className="h-8 w-8 text-purple-600" />
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-1"
          >
            <div className="card">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <User className="h-5 w-5 mr-2" />
                Profile
              </h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  {user?.photoURL ? (
                    <img 
                      src={user.photoURL} 
                      alt="Profile" 
                      className="h-16 w-16 rounded-full"
                    />
                  ) : (
                    <div className="h-16 w-16 rounded-full bg-primary-100 flex items-center justify-center">
                      <User className="h-8 w-8 text-primary-600" />
                    </div>
                  )}
                  <div>
                    <p className="font-semibold text-gray-900">{user?.displayName}</p>
                    <p className="text-sm text-gray-600">{user?.email}</p>
                  </div>
                </div>
                <div className="pt-4 border-t">
                  <p className="text-sm text-gray-600 mb-2">Member since</p>
                  <p className="text-sm font-semibold text-gray-900">
                    {userData?.createdAt?.toDate().toLocaleDateString() || 'Recently'}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Payment Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="lg:col-span-2"
          >
            <div className="card">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <CreditCard className="h-5 w-5 mr-2" />
                Add Practice Time
              </h2>

              {/* Single Smart Pricing Card */}
              <div className="relative max-w-md mx-auto">
                {/* Special Offer Badge - Only for first time */}
                {isFirstTime && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, type: "spring" }}
                    className="absolute -top-4 -right-4 z-10"
                  >
                    <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-full shadow-lg flex items-center space-x-2 animate-pulse">
                      <Sparkles className="h-4 w-4" />
                      <span className="font-bold text-xs">SPECIAL OFFER!</span>
                    </div>
                  </motion.div>
                )}

                <div className="border-2 border-primary-200 rounded-xl p-6 bg-gradient-to-br from-white to-blue-50 shadow-lg hover:shadow-xl transition-all duration-300">
                  {/* Header */}
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {isFirstTime ? 'First Time Special' : 'Regular Price'}
                    </h3>
                    
                    <div className="flex items-center justify-center space-x-2 mb-3">
                      <div className="text-5xl font-black bg-gradient-to-r from-primary-600 to-blue-600 bg-clip-text text-transparent">
                        ₹{currentPrice}
                      </div>
                    </div>

                    {isFirstTime && (
                      <div className="inline-block bg-gradient-to-r from-orange-100 to-red-100 text-orange-700 px-3 py-1 rounded-full text-xs font-bold mb-2">
                        Save ₹200 on your first purchase!
                      </div>
                    )}

                    <p className="text-gray-600 font-medium">2 Hours Practice Time</p>
                    
                    {!isFirstTime && (
                      <p className="text-xs text-gray-500 mt-1">
                        Regular price for subsequent purchases
                      </p>
                    )}
                  </div>

                  {/* Features */}
                  <div className="space-y-2 mb-6">
                    {features.map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-2"
                      >
                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center">
                          <Check className="h-3 w-3 text-white" strokeWidth={3} />
                        </div>
                        <span className="text-sm text-gray-700 font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <button
                    onClick={() => handleRazorpayPayment(currentPrice, isFirstTime ? 'First Time Special - 2 Hours' : 'Regular Package - 2 Hours')}
                    className="w-full bg-gradient-to-r from-primary-600 to-blue-600 hover:from-primary-700 hover:to-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center space-x-2"
                  >
                    <span>Buy Now - ₹{currentPrice}</span>
                    <Zap className="h-4 w-4" />
                  </button>

                  {/* Payment methods */}
                  <div className="mt-4 text-center">
                    <p className="text-xs text-gray-500 mb-1">Secure payment via Razorpay</p>
                    <div className="flex items-center justify-center space-x-3 text-xs text-gray-400">
                      <span>💳 Card</span>
                      <span>•</span>
                      <span>📱 UPI</span>
                      <span>•</span>
                      <span>👛 Wallet</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-800">
                  ⚠️ <strong>Important:</strong> After payment, your time will be added automatically within 2-5 seconds. 
                  Keep this page open during payment.
                </p>
              </div>

              {/* Testing Button - Remove after testing */}
              <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800 mb-3">
                  🧪 <strong>Testing Mode:</strong> Use ₹1 payment for testing (30 minutes)
                </p>
                <button
                  onClick={() => handleRazorpayPayment(1, 'Testing Package - 30 Minutes')}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 text-sm"
                >
                  Test Payment - ₹1 (30 minutes)
                </button>
              </div>
            </div>

            {/* Payment History */}
            {userData?.payment_history && userData.payment_history.length > 0 && (
              <div className="card mt-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  Payment History
                </h2>
                <div className="space-y-3">
                  {userData.payment_history.map((payment, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-semibold text-gray-900">{payment.package}</p>
                        <p className="text-sm text-gray-600">{payment.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">₹{payment.amount}</p>
                        <p className="text-sm text-gray-600">{formatTime(payment.seconds)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
