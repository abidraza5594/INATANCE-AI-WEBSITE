import { motion } from 'framer-motion';
import { Check, Sparkles, Zap } from 'lucide-react';
import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAuth } from '../hooks/useAuth';

export default function Pricing() {
  const [isFirstTime, setIsFirstTime] = useState(true);
  const [loading, setLoading] = useState(true);
  const user = useAuth();

  useEffect(() => {
    const checkPurchaseHistory = async () => {
      if (user) {
        try {
          const docId = user.email.replace('@', '_at_').replace(/\./g, '_');
          const userDoc = await getDoc(doc(db, 'users', docId));

          if (userDoc.exists()) {
            const userData = userDoc.data();
            // Check if user has made any purchase
            setIsFirstTime(!userData.total_purchased || userData.total_purchased === 0);
          }
        } catch (error) {
          console.error('Error checking purchase history:', error);
        }
      }
      setLoading(false);
    };

    checkPurchaseHistory();
  }, [user]);

  const currentPrice = isFirstTime ? 300 : 500;
  const paymentLink = isFirstTime
    ? 'https://rzp.io/rzp/7Q42vVa'  // First time ₹300
    : 'https://rzp.io/rzp/GrVtHchT'; // Regular ₹500

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
    <div id="pricing" className="py-24 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 mesh-gradient-light opacity-60"></div>
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob opacity-50"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000 opacity-50"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center space-x-2 bg-white/60 backdrop-blur-sm border border-gray-200 px-6 py-2 rounded-full mb-6 shadow-sm">
              <Zap className="h-4 w-4 text-amber-500" />
              <span className="text-sm font-bold tracking-wide uppercase text-gray-700">Pay Per Interview</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6 tracking-tight">
              Simple, Transparent <span className="text-primary-600">Pricing</span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              2 hours per purchase - enough for one complete interview
            </p>
          </motion.div>
        </div>

        {/* Single Smart Pricing Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-lg mx-auto"
        >
          <div className="relative">
            {/* Special Offer Badge - Only for first time */}
            {isFirstTime && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring" }}
                className="absolute -top-4 -right-4 z-10"
              >
                <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2 rounded-full shadow-2xl flex items-center space-x-2 animate-pulse">
                  <Sparkles className="h-5 w-5" />
                  <span className="font-bold text-sm">SPECIAL OFFER!</span>
                </div>
              </motion.div>
            )}

            <div className="glass-card hover:shadow-2xl transition-all duration-500 border-2 border-primary-200 relative overflow-hidden">
              {/* Shimmer effect */}
              <div className="absolute inset-0 shimmer"></div>

              <div className="relative z-10">
                {/* Header */}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {isFirstTime ? 'First Time Special' : 'Regular Price'}
                  </h3>

                  <div className="flex items-center justify-center space-x-2 mb-4">
                    <div className="text-6xl font-black gradient-text">
                      ₹{currentPrice}
                    </div>
                  </div>

                  {isFirstTime && (
                    <div className="inline-block bg-gradient-to-r from-orange-100 to-red-100 text-orange-700 px-4 py-2 rounded-full text-sm font-bold mb-2">
                      Save ₹200 on your first purchase!
                    </div>
                  )}

                  <p className="text-gray-600 font-medium">2 Hours Practice Time</p>

                  {!isFirstTime && (
                    <p className="text-sm text-gray-500 mt-2">
                      Regular price for subsequent purchases
                    </p>
                  )}
                </div>

                {/* Features */}
                <div className="space-y-3 mb-8">
                  {features.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-center space-x-3 group"
                    >
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Check className="h-4 w-4 text-white" strokeWidth={3} />
                      </div>
                      <span className="text-gray-700 font-medium">{feature}</span>
                    </motion.div>
                  ))}
                </div>

                {/* CTA Button */}
                <a
                  href={paymentLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full"
                >
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-primary-600 to-blue-600 hover:from-primary-700 hover:to-blue-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-2xl flex items-center justify-center space-x-2"
                  >
                    <span className="text-lg">Buy Now - ₹{currentPrice}</span>
                    <Zap className="h-5 w-5" />
                  </motion.button>
                </a>

                {/* Payment methods */}
                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-500 mb-2">Secure payment via Razorpay</p>
                  <div className="flex items-center justify-center space-x-4 text-xs text-gray-400">
                    <span>💳 Card</span>
                    <span>•</span>
                    <span>📱 UPI</span>
                    <span>•</span>
                    <span>👛 Wallet</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 max-w-3xl mx-auto"
        >
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-200">
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-black gradient-text mb-2">2 Hours</div>
                <div className="text-sm text-gray-600">Per Purchase</div>
              </div>
              <div>
                <div className="text-3xl font-black gradient-text mb-2">Instant</div>
                <div className="text-sm text-gray-600">Activation</div>
              </div>
              <div>
                <div className="text-3xl font-black gradient-text mb-2">2 Hours</div>
                <div className="text-sm text-gray-600">Free Trial</div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-blue-200 text-center">
              <p className="text-gray-700 font-medium mb-2">
                💡 How it works:
              </p>
              <p className="text-sm text-gray-600 leading-relaxed">
                After payment, the time will be automatically added to your account.
                {isFirstTime && <span className="font-bold text-orange-600"> First-time users get special ₹300 pricing!</span>}
                {!isFirstTime && <span> Regular price applies for subsequent purchases.</span>}
              </p>
            </div>
          </div>
        </motion.div>
      </div>

    </div>
  );
}
