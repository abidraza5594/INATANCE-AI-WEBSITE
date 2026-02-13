import { Crown, Check, Gift, Zap, ShieldCheck, Lock, Share2, Copy, MessageCircle, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { onAuthChange } from '../../firebase/auth';
import { useState, useEffect } from 'react';
import { initiatePayment } from '../../utils/razorpay';
import { addPurchasedTime, getUserTime } from '../../utils/timeSync';

export default function Pricing() {
    const [user, setUser] = useState(null);
    const [userData, setUserData] = useState(null);
    const [showReferralModal, setShowReferralModal] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthChange(async (currentUser) => {
            setUser(currentUser);
            if (currentUser) {
                const timeData = await getUserTime(currentUser.email);
                setUserData(timeData);
            }
        });
        return () => unsubscribe();
    }, []);

    const handleReferral = () => {
        if (!user) {
            navigate('/login');
            return;
        }
        setShowReferralModal(true);
    };

    const getReferralLink = () => {
        const referralCode = userData?.referral_code || user?.email.split('@')[0] || 'user';
        return `${window.location.origin}/?ref=${referralCode}`;
    };

    const copyReferralLink = () => {
        const link = getReferralLink();
        navigator.clipboard.writeText(link).then(() => {
            alert('✅ Referral link copied to clipboard!');
        });
    };

    const shareViaWhatsApp = () => {
        const link = getReferralLink();
        const message = `🚀 Join Interview.AI and ace your interviews with AI assistance!\n\nUse my referral link to get started:\n${link}\n\n✨ Get 2 hours FREE on signup!`;
        window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
    };

    const shareViaEmail = () => {
        const link = getReferralLink();
        const subject = 'Join Interview.AI - AI-Powered Interview Assistant';
        const body = `Hi,\n\nI've been using Interview.AI for my interviews and it's amazing! It provides real-time AI assistance during interviews.\n\nUse my referral link to get started:\n${link}\n\nYou'll get 2 hours FREE on signup!\n\nBest regards`;
        window.open(`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, '_blank');
    };

    const handlePayment = async (amount, hours, packageName) => {
        if (!user) {
            navigate('/login');
            return;
        }

        const seconds = hours * 3600;
        // Determine plan based on amount
        let plan = 'basic';
        if (amount === 100) plan = 'basic';
        else if (amount === 300) plan = 'standard';
        else if (amount === 500) plan = 'premium';
        
        await initiatePayment(
            amount,
            packageName,
            user.email,
            user.displayName || 'User',
            async (response) => {
                const paymentId = response.razorpay_payment_id || response.razorpay_signature || `payment_${Date.now()}`;
                
                const success = await addPurchasedTime(
                    user.email,
                    seconds,
                    amount,
                    packageName,
                    paymentId,
                    plan
                );
                
                if (success) {
                    alert(`Payment successful! ${hours} hours added to your account. Check your dashboard.`);
                    navigate('/dashboard');
                } else {
                    alert('Payment received but failed to update account. Please contact support.');
                }
            },
            (error) => {
                console.error('Payment error:', error);
                alert('Payment failed: ' + error);
            }
        );
    };
    return (
        <>
        <section id="pricing" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="w-full">

                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
                        <Crown className="w-4 h-4 text-blue-400" />
                        <span className="text-sm font-bold text-blue-300 uppercase tracking-widest">Choose Your Plan</span>
                    </div>
                    <h1 className="text-5xl font-extrabold tracking-tight mb-4">Flexible Pricing Options</h1>
                    <p className="text-gray-400 text-xl">Start with basics or unlock all features - you decide!</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                    {/* Basic Plan - ₹100 */}
                    <div className="glass p-6 rounded-2xl flex flex-col hover:bg-white/5 transition-all cursor-pointer group border border-white/5">
                        <div className="mb-4">
                            <h3 className="text-gray-400 font-bold uppercase tracking-wider text-xs mb-1">Basic</h3>
                            <div className="flex items-baseline gap-1">
                                <span className="text-2xl font-bold text-white">₹</span>
                                <span className="text-4xl font-black text-white">100</span>
                                <span className="text-gray-500 font-medium text-xs">/interview</span>
                            </div>
                            <p className="text-xs text-yellow-400 mt-2">⚡ Voice Only</p>
                        </div>
                        <ul className="space-y-3 mb-8 flex-grow">
                            <li className="flex items-center gap-2 text-xs text-gray-300">
                                <Check className="w-3 h-3 text-emerald-400" /> Voice Mode Only
                            </li>
                            <li className="flex items-center gap-2 text-xs text-gray-300">
                                <Check className="w-3 h-3 text-emerald-400" /> Real-time Answers
                            </li>
                            <li className="flex items-center gap-2 text-xs text-gray-500 line-through">
                                Caps Lock Input
                            </li>
                            <li className="flex items-center gap-2 text-xs text-gray-500 line-through">
                                Screenshot Mode
                            </li>
                            <li className="flex items-center gap-2 text-xs text-gray-500 line-through">
                                Resume Upload
                            </li>
                            <li className="flex items-center gap-2 text-xs text-yellow-400 font-semibold">
                                <Check className="w-3 h-3 text-yellow-400" /> Your API Keys
                            </li>
                        </ul>
                        <button onClick={() => handlePayment(100, 2, 'Basic Plan - Voice Only')} className="w-full py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-bold hover:bg-white/10 transition-all">Start (₹100)</button>
                    </div>

                    {/* Standard Plan - ₹300 */}
                    <div className="glass p-6 rounded-2xl flex flex-col hover:bg-white/5 transition-all cursor-pointer group border border-blue-500/30 relative">
                        <div className="absolute top-0 right-0 bg-blue-500 px-3 py-1 rounded-bl-xl text-[9px] font-black uppercase text-white">Popular</div>
                        <div className="mb-4">
                            <h3 className="text-blue-400 font-bold uppercase tracking-wider text-xs mb-1">Standard</h3>
                            <div className="flex items-baseline gap-1">
                                <span className="text-2xl font-bold text-white">₹</span>
                                <span className="text-4xl font-black text-white">300</span>
                                <span className="text-gray-500 font-medium text-xs">/interview</span>
                            </div>
                            <p className="text-xs text-blue-400 mt-2">🎯 All Features</p>
                        </div>
                        <ul className="space-y-3 mb-8 flex-grow">
                            <li className="flex items-center gap-2 text-xs text-white font-medium">
                                <Check className="w-3 h-3 text-emerald-400" /> Voice Mode
                            </li>
                            <li className="flex items-center gap-2 text-xs text-white font-medium">
                                <Check className="w-3 h-3 text-emerald-400" /> Caps Lock Input
                            </li>
                            <li className="flex items-center gap-2 text-xs text-white font-medium">
                                <Check className="w-3 h-3 text-emerald-400" /> Screenshot Mode
                            </li>
                            <li className="flex items-center gap-2 text-xs text-white font-medium">
                                <Check className="w-3 h-3 text-emerald-400" /> Resume Upload
                            </li>
                            <li className="flex items-center gap-2 text-xs text-white font-medium">
                                <Check className="w-3 h-3 text-emerald-400" /> All AI Features
                            </li>
                            <li className="flex items-center gap-2 text-xs text-yellow-400 font-semibold">
                                <Check className="w-3 h-3 text-yellow-400" /> Your API Keys
                            </li>
                        </ul>
                        <button onClick={() => handlePayment(300, 2, 'Standard Plan - All Features')} className="w-full py-3 rounded-xl bg-blue-600 text-white text-sm font-bold hover:bg-blue-500 transition-all shadow-lg shadow-blue-500/20">Get Started (₹300)</button>
                    </div>

                    {/* Premium Plan - ₹500 */}
                    <div className="glass-strong p-6 rounded-2xl flex flex-col gradient-border relative overflow-hidden group cursor-pointer">
                        <div className="absolute top-0 right-0 bg-gradient-to-l from-emerald-500 to-blue-500 px-3 py-1 rounded-bl-xl text-[9px] font-black uppercase text-white">Best Value</div>
                        <div className="mb-4">
                            <h3 className="text-emerald-400 font-bold uppercase tracking-wider text-xs mb-1">Premium</h3>
                            <div className="flex items-baseline gap-1">
                                <span className="text-2xl font-bold text-white">₹</span>
                                <span className="text-4xl font-black text-white">500</span>
                                <span className="text-gray-500 font-medium text-xs">/interview</span>
                            </div>
                            <p className="text-xs text-emerald-400 mt-2">🚀 Zero Setup</p>
                        </div>
                        <ul className="space-y-3 mb-8 flex-grow">
                            <li className="flex items-center gap-2 text-xs text-white font-medium">
                                <Check className="w-3 h-3 text-emerald-400" /> Voice Mode
                            </li>
                            <li className="flex items-center gap-2 text-xs text-white font-medium">
                                <Check className="w-3 h-3 text-emerald-400" /> Caps Lock Input
                            </li>
                            <li className="flex items-center gap-2 text-xs text-white font-medium">
                                <Check className="w-3 h-3 text-emerald-400" /> Screenshot Mode
                            </li>
                            <li className="flex items-center gap-2 text-xs text-white font-medium">
                                <Check className="w-3 h-3 text-emerald-400" /> Resume Upload
                            </li>
                            <li className="flex items-center gap-2 text-xs text-white font-medium">
                                <Check className="w-3 h-3 text-emerald-400" /> All AI Features
                            </li>
                            <li className="flex items-center gap-2 text-xs text-emerald-400 font-bold">
                                <Check className="w-3 h-3 text-emerald-400" /> API Keys Optional
                            </li>
                        </ul>
                        <button onClick={() => handlePayment(500, 2, 'Premium Plan - Zero Setup')} className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-blue-600 text-white text-sm font-bold hover:from-emerald-500 hover:to-blue-500 transition-all shadow-lg shadow-emerald-500/20">Upgrade (₹500)</button>
                    </div>

                    {/* Special Rewards - Same line as pricing cards */}
                    <div className="glass p-6 rounded-2xl border border-white/5 relative overflow-hidden">
                        <div className="absolute -right-8 -top-8 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl"></div>

                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                                <Gift className="w-5 h-5 text-emerald-400" />
                            </div>
                            <h3 className="text-lg font-bold">Special Rewards</h3>
                        </div>

                        <div className="mb-4">
                            <div className="flex justify-between items-end mb-3">
                                <div>
                                    <p className="text-emerald-400 font-black text-2xl mb-1">2 HOURS FREE</p>
                                    <p className="text-gray-400 text-xs font-medium">Premium Trial on Signup</p>
                                </div>
                                <div className="text-right">
                                    <span className="text-white font-bold text-base">100%</span>
                                </div>
                            </div>

                            <div className="h-3 w-full bg-gray-800 rounded-full overflow-hidden border border-white/5">
                                <div className="h-full w-full bg-gradient-to-r from-emerald-600 to-blue-500 relative">
                                    <div className="absolute top-0 right-0 h-full w-2 bg-white/20 blur-sm"></div>
                                </div>
                            </div>
                        </div>

                        <div 
                            onClick={handleReferral}
                            className="bg-white/5 p-4 rounded-xl border border-white/5 hover:bg-white/10 hover:border-yellow-500/30 transition-all cursor-pointer group"
                        >
                            <div className="flex items-start gap-3">
                                <div className="p-2 rounded-lg bg-yellow-500/10 group-hover:bg-yellow-500/20 transition-colors">
                                    <Zap className="w-4 h-4 text-yellow-400 group-hover:scale-110 transition-transform" />
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-bold text-white text-sm mb-1 group-hover:text-yellow-400 transition-colors">Refer a Colleague</h4>
                                    <p className="text-gray-400 text-xs leading-relaxed">Earn 30 minutes when your friend makes their first purchase.</p>
                                </div>
                                <div className="text-white/30 group-hover:text-yellow-400 transition-colors">
                                    <Share2 className="w-4 h-4" />
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between text-xs font-mono text-gray-500 pt-4 mt-4 border-t border-white/5">
                            <span>SECURE PAYMENT</span>
                            <div className="flex gap-2">
                                <ShieldCheck className="w-4 h-4" />
                                <Lock className="w-4 h-4" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-12 text-center">
                    <p className="text-gray-600 text-sm">All transactions are encrypted and secured. Taxes may apply based on your region.</p>
                </div>
            </div>
        </section>

            {/* Referral Modal */}
            {showReferralModal && (
                <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setShowReferralModal(false)}>
                    <div className="bg-slate-900 rounded-3xl p-8 max-w-md w-full border border-white/10 shadow-2xl" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-2xl font-bold text-white">Share & Earn</h3>
                            <button onClick={() => setShowReferralModal(false)} className="text-gray-400 hover:text-white transition-colors">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <p className="text-gray-400 mb-6">Share your referral link and earn 30 minutes of free AI assistance for every friend who joins!</p>

                        <div className="bg-white/5 p-4 rounded-xl mb-6 border border-white/10">
                            <p className="text-xs text-gray-500 mb-2">Your Referral Link</p>
                            <p className="text-sm text-white font-mono break-all">{getReferralLink()}</p>
                        </div>

                        <div className="space-y-3">
                            <button
                                onClick={copyReferralLink}
                                className="w-full flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold py-4 rounded-xl transition-all"
                            >
                                <Copy className="w-5 h-5" />
                                Copy Link
                            </button>

                            <button
                                onClick={shareViaWhatsApp}
                                className="w-full flex items-center justify-center gap-3 bg-green-600 hover:bg-green-500 text-white font-semibold py-4 rounded-xl transition-all"
                            >
                                <MessageCircle className="w-5 h-5" />
                                Share via WhatsApp
                            </button>

                            <button
                                onClick={shareViaEmail}
                                className="w-full flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 text-white font-semibold py-4 rounded-xl transition-all border border-white/10"
                            >
                                <Mail className="w-5 h-5" />
                                Share via Email
                            </button>
                        </div>

                        <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
                            <p className="text-xs text-yellow-400 text-center">
                                💡 Earn 30 minutes for each successful referral!
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
