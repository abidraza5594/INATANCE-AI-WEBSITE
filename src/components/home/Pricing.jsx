import { Crown, Check, Gift, Zap, ShieldCheck, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { onAuthChange } from '../../firebase/auth';
import { useState, useEffect } from 'react';
import { initiatePayment } from '../../utils/razorpay';
import { addPurchasedTime, getUserTime } from '../../utils/timeSync';

export default function Pricing() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthChange((currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    const handlePayment = async (amount, hours, packageName) => {
        if (!user) {
            navigate('/login');
            return;
        }

        const seconds = hours * 3600;
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
                    paymentId
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
        <section id="pricing" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="z-10 w-full">

                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
                        <Crown className="w-4 h-4 text-blue-400" />
                        <span className="text-sm font-bold text-blue-300 uppercase tracking-widest">Premium Subscription</span>
                    </div>
                    <h1 className="text-5xl font-extrabold tracking-tight mb-4">Choose Your Power-Up</h1>
                    <p className="text-gray-400 text-xl">Unlock advanced AI models and unlimited stealth assistance.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-8">

                    <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">

                        <div className="glass p-8 rounded-2xl flex flex-col hover:bg-white/5 transition-all cursor-pointer group border border-white/5">
                            <div className="mb-6">
                                <h3 className="text-gray-400 font-bold uppercase tracking-wider text-sm mb-1">Standard</h3>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-3xl font-bold text-white">₹</span>
                                    <span className="text-5xl font-black text-white">300</span>
                                    <span className="text-gray-500 font-medium">/mo</span>
                                </div>
                            </div>
                            <ul className="space-y-4 mb-10 flex-grow">
                                <li className="flex items-center gap-3 text-sm text-gray-300">
                                    <Check className="w-4 h-4 text-emerald-400" /> Mistral Large AI
                                </li>
                                <li className="flex items-center gap-3 text-sm text-gray-300">
                                    <Check className="w-4 h-4 text-emerald-400" /> Voice Transcription
                                </li>
                                <li className="flex items-center gap-3 text-sm text-gray-300">
                                    <Check className="w-4 h-4 text-emerald-400" /> Basic Profile Support
                                </li>
                            </ul>
                            <button onClick={() => handlePayment(300, 2, 'Standard - 2 Hours')} className="w-full py-4 rounded-xl bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 transition-all">Get Started (₹300)</button>
                        </div>


                        <div className="glass-strong p-8 rounded-2xl flex flex-col gradient-border relative overflow-hidden group cursor-pointer">
                            <div className="absolute top-0 right-0 bg-gradient-to-l from-emerald-500 to-blue-500 px-4 py-1 rounded-bl-xl text-[10px] font-black uppercase tracking-tighter text-white">Popular Choice</div>
                            <div className="mb-6">
                                <h3 className="text-blue-400 font-bold uppercase tracking-wider text-sm mb-1">Professional</h3>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-3xl font-bold text-white">₹</span>
                                    <span className="text-5xl font-black text-white">500</span>
                                    <span className="text-gray-500 font-medium">/mo</span>
                                </div>
                            </div>
                            <ul className="space-y-4 mb-10 flex-grow">
                                <li className="flex items-center gap-3 text-sm text-white font-medium">
                                    <Check className="w-4 h-4 text-emerald-400" /> Gemini Ultra Access
                                </li>
                                <li className="flex items-center gap-3 text-sm text-white font-medium">
                                    <Check className="w-4 h-4 text-emerald-400" /> Visual Screen Analysis
                                </li>
                                <li className="flex items-center gap-3 text-sm text-white font-medium">
                                    <Check className="w-4 h-4 text-emerald-400" /> Full Resume Sync
                                </li>
                                <li className="flex items-center gap-3 text-sm text-white font-medium">
                                    <Check className="w-4 h-4 text-emerald-400" /> Priority Latency
                                </li>
                            </ul>
                            <button onClick={() => handlePayment(500, 2, 'Professional - 2 Hours')} className="w-full py-4 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-500 transition-all shadow-lg shadow-blue-500/20">Upgrade Now (₹500)</button>
                        </div>
                    </div>


                    <div className="md:col-span-5 flex flex-col gap-6">
                        <div className="glass p-8 rounded-2xl border border-white/5 h-full relative overflow-hidden">
                            <div className="absolute -right-8 -top-8 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl"></div>

                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                                    <Gift className="w-6 h-6 text-emerald-400" />
                                </div>
                                <h2 className="text-2xl font-bold">Special Rewards</h2>
                            </div>

                            <div className="space-y-8">
                                <div>
                                    <div className="flex justify-between items-end mb-4">
                                        <div>
                                            <p className="text-emerald-400 font-black text-3xl mb-1">2 HOURS FREE</p>
                                            <p className="text-gray-400 text-sm font-medium">Incentive Unlock Progress</p>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-white font-bold text-lg">85%</span>
                                        </div>
                                    </div>

                                    <div className="h-4 w-full bg-gray-800 rounded-full overflow-hidden border border-white/5">
                                        <div className="h-full bg-gradient-to-r from-emerald-600 to-blue-500 animate-progress relative">
                                            <div className="absolute top-0 right-0 h-full w-2 bg-white/20 blur-sm"></div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white/5 p-6 rounded-xl border border-white/5">
                                    <div className="flex items-start gap-4">
                                        <div className="p-2 rounded-lg bg-yellow-500/10 mt-1">
                                            <Zap className="w-5 h-5 text-yellow-400" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-white mb-1">Refer a Colleague</h4>
                                            <p className="text-gray-400 text-xs leading-relaxed">Earn an additional 30 minutes of free AI assistance for every friend who joins Interview.AI.</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between text-xs font-mono text-gray-500 pt-4">
                                    <span>SECURE PAYMENT</span>
                                    <div className="flex gap-2">
                                        <ShieldCheck className="w-4 h-4" />
                                        <Lock className="w-4 h-4" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-12 text-center">
                    <p className="text-gray-600 text-sm">All transactions are encrypted and secured. Taxes may apply based on your region.</p>
                </div>
            </div>
        </section>
    );
}
