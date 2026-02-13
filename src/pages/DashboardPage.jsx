import { useState, useEffect } from 'react';
import {
    Clock,
    ExternalLink,
    Copy,
    Plus,
    CheckCircle2,
    LogOut,
    Download,
    Mic2,
    Gift,
    Check,
    Key,
    Save,
    Eye,
    EyeOff
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { onAuthChange, logOut } from '../firebase/auth';
import { getUserTime, formatTime, addPurchasedTime } from '../utils/timeSync';
import { initiatePayment } from '../utils/razorpay';
import { saveUserAPIKeys, validateAPIKeys } from '../utils/apiKeyManager';

export default function DashboardPage() {
    const [user, setUser] = useState(null);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [copied, setCopied] = useState(false);
    const [mistralKey, setMistralKey] = useState('');
    const [geminiKey, setGeminiKey] = useState('');
    const [showMistralKey, setShowMistralKey] = useState(false);
    const [showGeminiKey, setShowGeminiKey] = useState(false);
    const [savingKeys, setSavingKeys] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthChange(async (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                const timeData = await getUserTime(currentUser.email);
                setUserData(timeData);
                
                // Load existing API keys if available
                if (timeData?.api_keys) {
                    setMistralKey(timeData.api_keys.mistral || '');
                    setGeminiKey(timeData.api_keys.gemini || '');
                }
            } else {
                navigate('/login');
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, [navigate]);

    const handleLogout = async () => {
        await logOut();
        navigate('/login');
    };

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = 'https://github.com/abidraza5594/INATANCE-AI-WEBSITE/releases/download/v1.0.0/InstantInterview.exe';
        link.download = 'InstantInterview.exe';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const copyReferralCode = () => {
        if (userData?.referral_code) {
            navigator.clipboard.writeText(userData.referral_code);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const handlePayment = async (amount, hours, packageName) => {
        if (!user) return;

        const seconds = hours * 3600;
        const plan = amount === 300 ? 'basic' : 'premium';
        
        await initiatePayment(
            amount,
            packageName,
            user.email,
            user.displayName || 'User',
            async (response) => {
                // Payment successful - save to database
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
                    const updatedData = await getUserTime(user.email);
                    setUserData(updatedData);
                    alert(`Payment successful! ${hours} hours added to your account.`);
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

    const handleSaveAPIKeys = async () => {
        if (!user) return;

        // Validate keys
        const validation = validateAPIKeys(mistralKey, geminiKey);
        if (!validation.valid) {
            alert('❌ ' + validation.errors.join('\n'));
            return;
        }

        setSavingKeys(true);
        const result = await saveUserAPIKeys(user.email, mistralKey, geminiKey);
        setSavingKeys(false);

        if (result.success) {
            alert('✅ API keys saved successfully!');
            // Refresh user data
            const updatedData = await getUserTime(user.email);
            setUserData(updatedData);
        } else {
            alert('❌ Failed to save API keys: ' + result.error);
        }
    };

    const handleExportHistory = () => {
        if (!userData?.payment_history || userData.payment_history.length === 0) {
            alert('No payment history to export');
            return;
        }

        // Create CSV content
        const headers = ['Date', 'Plan/Package', 'Amount (₹)', 'Status', 'Payment ID'];
        const rows = userData.payment_history.map(row => [
            new Date(row.date).toLocaleDateString(),
            row.package,
            row.amount,
            'Success',
            row.payment_id || 'N/A'
        ]);

        const csvContent = [
            headers.join(','),
            ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
        ].join('\n');

        // Create and download file
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `payment_history_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#05080f] flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
            </div>
        );
    }

    const history = userData?.payment_history || [];
    const referrals = userData?.referrals || [];

    return (
        <div className="min-h-screen bg-[#05080f] text-white font-sans selection:bg-blue-500/30">
            {/* Background Blobs (Global Theme) */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="blob bg-blue-600/10 w-[800px] h-[800px] rounded-full -top-[400px] -left-[200px] mix-blend-screen filter blur-[120px]"></div>
                <div className="blob bg-emerald-500/5 w-[600px] h-[600px] rounded-full top-[20%] -right-[100px] mix-blend-screen filter blur-[100px]"></div>
            </div>

            {/* Top Navbar */}
            <nav className="relative z-20 border-b border-white/5 bg-[#05080f]/80 backdrop-blur-md">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-3 group">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-emerald-400 flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
                            <Mic2 className="w-6 h-6 text-white" />
                        </div>
                        <span className="font-bold text-xl tracking-tight hidden sm:block">Interview.AI</span>
                    </Link>

                    <div className="flex items-center gap-4">
                        <button onClick={handleDownload} className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl transition-all shadow-lg shadow-blue-500/20">
                            <Download size={14} />
                            <span className="hidden md:inline">Download App</span>
                        </button>

                        <div className="h-8 w-px bg-white/10 mx-2"></div>

                        <div className="flex items-center gap-3 bg-white/[0.03] border border-white/5 px-3 py-1.5 rounded-2xl">
                            {user?.photoURL ? (
                                <img src={user.photoURL} alt="Profile" className="w-8 h-8 rounded-full" />
                            ) : (
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-xs font-bold shadow-inner">
                                    {user?.displayName?.charAt(0) || 'U'}
                                </div>
                            )}
                            <div className="hidden lg:block">
                                <h4 className="text-[11px] font-bold text-slate-300 truncate max-w-[100px]">{user?.displayName || 'User'}</h4>
                                <p className="text-[9px] text-emerald-400 font-bold uppercase tracking-wider">Active</p>
                            </div>
                            <button onClick={handleLogout} className="p-1.5 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white transition-colors">
                                <LogOut size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="relative z-10 max-w-7xl mx-auto px-6 py-10">

                {/* Header */}
                <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-b from-white to-white/70 bg-clip-text text-transparent">
                            User Dashboard
                        </h1>
                        <p className="text-slate-500 text-sm mt-1 uppercase tracking-tight font-bold">Welcome back, {user?.displayName?.split(' ')[0] || 'User'}!</p>
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                    {/* API Key Settings - For Basic and Standard Plans */}
                    {(userData?.subscription_plan === 'basic' || userData?.subscription_plan === 'standard') && (
                        <div className="md:col-span-2 lg:col-span-3 bg-gradient-to-br from-yellow-500/5 to-orange-500/5 border border-yellow-500/20 rounded-[32px] p-8 glass">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 rounded-xl bg-yellow-500/20 flex items-center justify-center">
                                    <Key className="w-6 h-6 text-yellow-400" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white">API Key Configuration</h3>
                                    <p className="text-xs text-yellow-400 font-semibold">Basic & Standard Plans - Your API Keys Required</p>
                                </div>
                            </div>

                            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-2xl p-4 mb-6">
                                <p className="text-sm text-yellow-200">
                                    ⚠️ <span className="font-bold">Important:</span> You're on the {userData?.subscription_plan === 'basic' ? 'Basic' : 'Standard'} Plan. Please provide your own Mistral and Gemini API keys to use the desktop application.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Mistral API Key */}
                                <div>
                                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                                        Mistral API Key <span className="text-red-400">*</span>
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={showMistralKey ? 'text' : 'password'}
                                            value={mistralKey}
                                            onChange={(e) => setMistralKey(e.target.value)}
                                            placeholder="Enter your Mistral API key"
                                            className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-4 py-3 text-white text-sm font-mono focus:outline-none focus:border-yellow-500/50 transition-colors pr-12"
                                        />
                                        <button
                                            onClick={() => setShowMistralKey(!showMistralKey)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
                                        >
                                            {showMistralKey ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    </div>
                                    <p className="text-xs text-slate-500 mt-2">
                                        Get your key from <a href="https://console.mistral.ai/" target="_blank" rel="noopener noreferrer" className="text-yellow-400 hover:underline">Mistral Console</a>
                                    </p>
                                </div>

                                {/* Gemini API Key */}
                                <div>
                                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                                        Gemini API Key <span className="text-red-400">*</span>
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={showGeminiKey ? 'text' : 'password'}
                                            value={geminiKey}
                                            onChange={(e) => setGeminiKey(e.target.value)}
                                            placeholder="Enter your Gemini API key"
                                            className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-4 py-3 text-white text-sm font-mono focus:outline-none focus:border-yellow-500/50 transition-colors pr-12"
                                        />
                                        <button
                                            onClick={() => setShowGeminiKey(!showGeminiKey)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
                                        >
                                            {showGeminiKey ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    </div>
                                    <p className="text-xs text-slate-500 mt-2">
                                        Get your key from <a href="https://makersuite.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-yellow-400 hover:underline">Google AI Studio</a>
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center justify-between mt-6 pt-6 border-t border-white/5">
                                <p className="text-xs text-slate-500">
                                    {userData?.api_keys?.mistral && userData?.api_keys?.gemini ? (
                                        <span className="text-emerald-400 flex items-center gap-2">
                                            <Check size={14} /> API keys configured
                                        </span>
                                    ) : (
                                        <span className="text-yellow-400">⚠️ API keys not configured - app won't work</span>
                                    )}
                                </p>
                                <button
                                    onClick={handleSaveAPIKeys}
                                    disabled={savingKeys}
                                    className="flex items-center gap-2 bg-yellow-600 hover:bg-yellow-500 disabled:bg-slate-700 text-white font-bold px-6 py-3 rounded-xl transition-all disabled:cursor-not-allowed"
                                >
                                    {savingKeys ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                            Saving...
                                        </>
                                    ) : (
                                        <>
                                            <Save size={18} />
                                            Save API Keys
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Premium Plan Badge */}
                    {userData?.subscription_plan === 'premium' && (
                        <div className="md:col-span-2 lg:col-span-3 bg-gradient-to-br from-emerald-500/5 to-blue-500/5 border border-emerald-500/20 rounded-[32px] p-6 glass">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-white">Premium Plan Active</h3>
                                        <p className="text-xs text-emerald-400 font-semibold">Pre-configured API keys - No setup needed!</p>
                                    </div>
                                </div>
                                <div className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                                    <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">All Set ✓</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Time Balance */}
                    <div className="bg-white/[0.02] border border-white/5 rounded-[32px] p-8 glass hover:border-white/10 transition-colors relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-[60px] -mr-16 -mt-16"></div>
                        <div className="flex justify-between items-start mb-6">
                            <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Time Balance</p>
                            <div className="relative w-14 h-14 flex items-center justify-center">
                                {(() => {
                                    const totalSeconds = (userData?.total_purchased || 0) + 7200; // Include free 2 hours
                                    const remainingSeconds = userData?.remaining_seconds || 0;
                                    const percentage = totalSeconds > 0 ? (remainingSeconds / totalSeconds) : 0;
                                    const circumference = 2 * Math.PI * 24; // 2πr where r=24
                                    const offset = circumference - (circumference * percentage);
                                    
                                    return (
                                        <svg className="w-full h-full -rotate-90">
                                            <circle cx="28" cy="28" r="24" className="stroke-white/5 fill-none" strokeWidth="4" />
                                            <circle 
                                                cx="28" 
                                                cy="28" 
                                                r="24" 
                                                className="stroke-blue-500 fill-none transition-all duration-500" 
                                                strokeWidth="4" 
                                                strokeDasharray={circumference}
                                                strokeDashoffset={offset}
                                                strokeLinecap="round" 
                                            />
                                        </svg>
                                    );
                                })()}
                                <Clock size={16} className="absolute text-blue-400" />
                            </div>
                        </div>
                        <div className="mb-8">
                            <h3 className="text-4xl font-bold tracking-tight">{formatTime(userData?.remaining_seconds || 0)}</h3>
                            <p className="text-slate-500 text-sm mt-1">
                                {(() => {
                                    const totalSeconds = (userData?.total_purchased || 0) + 7200;
                                    const percentage = totalSeconds > 0 ? Math.round((userData?.remaining_seconds || 0) / totalSeconds * 100) : 0;
                                    return `${percentage}% of ${formatTime(totalSeconds)} remaining`;
                                })()}
                            </p>
                            
                            {/* Show trial mode badge */}
                            {userData?.trial_mode && (
                                <div className="mt-3 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                                    <p className="text-xs text-emerald-400 font-semibold">
                                        🎉 Premium Trial Active (2 Hours)
                                    </p>
                                    <p className="text-[10px] text-emerald-300 mt-1">
                                        Purchase any plan to continue after trial
                                    </p>
                                </div>
                            )}
                            
                            {/* Show if user was referred */}
                            {userData?.referred_by && userData?.total_purchased === 0 && (
                                <div className="mt-3 p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                                    <p className="text-xs text-blue-400 font-semibold flex items-center gap-2">
                                        <Gift size={14} />
                                        � Referred User Bonus
                                    </p>
                                    <p className="text-[10px] text-blue-300 mt-1">
                                        Your referrer will get 30 min when you make your first purchase!
                                    </p>
                                </div>
                            )}
                        </div>
                        <button onClick={() => handlePayment(300, 2, 'First Time - 2 Hours')} className="w-full bg-white text-slate-900 font-bold py-3.5 rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg">
                            <Plus size={18} />
                            Add Time (₹300)
                        </button>
                    </div>

                    {/* Referrals Section */}
                    <div className="bg-white/[0.02] border border-white/5 rounded-[32px] p-8 glass hover:border-white/10 transition-colors flex flex-col relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-[60px] -mr-16 -mt-16"></div>
                        <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-6">Referrals & Rewards</p>

                        {referrals.length > 0 ? (
                            <div className="flex-1 flex flex-col">
                                <div className="bg-emerald-500/5 p-5 rounded-2xl mb-6 border border-emerald-500/10">
                                    <h3 className="text-3xl font-bold text-emerald-400">{referrals.length}</h3>
                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Successful referrals</p>
                                </div>

                                <div className="flex justify-between items-center mb-6">
                                    <span className="text-xs text-slate-400 font-bold">Recent Signups</span>
                                    <div className="flex -space-x-2">
                                        {referrals.slice(0, 3).map((ref, i) => (
                                            <div key={i} title={ref.email} className="w-8 h-8 rounded-full bg-slate-800 border-2 border-[#05080f] flex items-center justify-center text-[10px] font-bold ring-2 ring-white/5">
                                                {ref.name?.charAt(0) || ref.email?.charAt(0).toUpperCase()}
                                            </div>
                                        ))}
                                        {referrals.length > 3 && (
                                            <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 border-2 border-[#05080f] flex items-center justify-center text-[10px] font-bold ring-2 ring-white/5">
                                                +{referrals.length - 3}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="flex-1 flex flex-col items-center justify-center text-center py-6 mb-6">
                                <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mb-4">
                                    <Gift className="text-slate-500" size={24} />
                                </div>
                                <h4 className="text-sm font-bold text-slate-300">No referrals yet</h4>
                                <p className="text-xs text-slate-500 mt-2 max-w-[200px]">Invite friends and earn bonus interview time for each sign-up!</p>
                            </div>
                        )}

                        <div className="mt-auto pt-6 border-t border-white/5">
                            <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-3">Copy Your Code</p>
                            <div
                                onClick={copyReferralCode}
                                className={`flex items-center justify-between p-3.5 bg-slate-950/50 rounded-2xl border border-dashed group cursor-pointer transition-all ${copied ? 'border-emerald-500/50 bg-emerald-500/5' : 'border-white/10 hover:border-blue-500/50'}`}
                            >
                                <code className={`font-mono font-bold tracking-[0.2em] ${copied ? 'text-emerald-400' : 'text-blue-400'}`}>
                                    {userData?.referral_code || 'LOADING...'}
                                </code>
                                {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} className="text-slate-500 group-hover:text-blue-400 transition-colors" />}
                            </div>
                        </div>
                    </div>

                    {/* Weekly Usage (Integrated) */}
                    <div className="bg-white/[0.02] border border-white/5 rounded-[32px] p-8 glass hover:border-white/10 transition-colors flex flex-col">
                        <div className="flex justify-between mb-8">
                            <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Usage Stats</p>
                            <p className="text-[10px] text-slate-500">Weekly Activity</p>
                        </div>
                        <div className="flex-1 flex items-end justify-between gap-1.5 h-32 mb-4">
                            {[40, 70, 55, 90, 30, 60, 45].map((val, i) => (
                                <div key={i} className="flex-1 group relative">
                                    <div
                                        className={`w-full rounded-t-lg transition-all duration-500 ${i === 3 ? 'bg-white' : 'bg-gradient-to-t from-blue-600/40 to-blue-400/80'}`}
                                        style={{ height: `${val}%` }}
                                    ></div>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-between text-[10px] text-slate-500 font-bold uppercase">
                            <span>Mon</span>
                            <span>Sun</span>
                        </div>
                    </div>

                    {/* Purchase History */}
                    <div className="md:col-span-2 lg:col-span-3 bg-white/[0.02] border border-white/5 rounded-[32px] p-8 glass hover:border-white/10 transition-colors">
                        <div className="flex justify-between items-center mb-8">
                            <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Recent Billing</p>
                            <button 
                                onClick={handleExportHistory}
                                className="text-[10px] uppercase tracking-widest text-white/50 hover:text-white font-bold px-3 py-1.5 rounded-lg border border-white/5 hover:bg-white/5 flex items-center gap-1.5 transition-all"
                            >
                                <ExternalLink size={12} />
                                Export
                            </button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="border-b border-white/5">
                                        <th className="pb-4 text-[10px] uppercase tracking-widest text-slate-500 font-bold">Date</th>
                                        <th className="pb-4 text-[10px] uppercase tracking-widest text-slate-500 font-bold">Plan / Package</th>
                                        <th className="pb-4 text-[10px] uppercase tracking-widest text-slate-500 font-bold">Amount</th>
                                        <th className="pb-4 text-[10px] uppercase tracking-widest text-slate-500 font-bold">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {history.length > 0 ? history.slice().reverse().map((row, i) => (
                                        <tr key={i} className="group transition-colors hover:bg-white/[0.01]">
                                            <td className="py-5 text-sm text-slate-400 font-medium">{new Date(row.date).toLocaleDateString()}</td>
                                            <td className="py-5 text-sm font-bold text-slate-200">{row.package}</td>
                                            <td className="py-5 text-sm font-bold text-white">₹{row.amount}</td>
                                            <td className="py-5">
                                                <span className="flex items-center gap-1.5 text-xs text-white/70 font-bold uppercase tracking-wider">
                                                    <CheckCircle2 size={14} className="text-emerald-400" />
                                                    Success
                                                </span>
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan="4" className="py-12 text-center text-slate-500 italic text-sm">No transaction history found.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
