import { useState, useEffect } from 'react';
import { Mail, Lock, User, Check, Gift, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { signUpWithEmail, signInWithEmail, resetPassword, onAuthChange } from '../firebase/auth';
import Navbar from '../components/home/Navbar';

export default function AuthPage() {
    const [activeTab, setActiveTab] = useState('login');
    const [loading, setLoading] = useState(false);
    const [checkingAuth, setCheckingAuth] = useState(true);
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [resetEmail, setResetEmail] = useState('');
    const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        referralCode: ''
    });
    const navigate = useNavigate();

    // Check if user is already logged in
    useEffect(() => {
        const unsubscribe = onAuthChange((user) => {
            if (user) {
                navigate('/dashboard', { replace: true });
            } else {
                setCheckingAuth(false);
            }
        });
        return () => unsubscribe();
    }, [navigate]);

    useEffect(() => {
        // Get referral code from URL or localStorage
        const urlParams = new URLSearchParams(window.location.search);
        const urlRef = urlParams.get('ref');
        
        let referralCode = '';
        
        if (urlRef) {
            // URL has priority
            referralCode = urlRef;
        } else {
            // Check localStorage
            const storedRef = localStorage.getItem('referralCode');
            const storedExpiry = localStorage.getItem('referralExpiry');
            
            if (storedRef && storedExpiry) {
                const expiryTime = parseInt(storedExpiry);
                if (Date.now() < expiryTime) {
                    // Referral code is still valid
                    referralCode = storedRef;
                } else {
                    // Expired, clear it
                    localStorage.removeItem('referralCode');
                    localStorage.removeItem('referralExpiry');
                }
            }
        }
        
        if (referralCode) {
            setFormData(prev => ({ ...prev, referralCode: referralCode }));
            showToast(`🎁 Using referral code: ${referralCode.toUpperCase()}`, 'success');
        } else {
            showToast('Welcome back!', 'success');
        }
    }, []);

    const showToast = (message, type = 'success', duration = null) => {
        // Auto-calculate duration based on message length for errors
        let finalDuration = duration;
        if (!finalDuration) {
            if (type === 'error') {
                // For errors: 15 seconds minimum, or 50ms per character (whichever is longer)
                finalDuration = Math.max(15000, message.length * 50);
            } else {
                // For success: 4 seconds
                finalDuration = 4000;
            }
        }
        
        setToast({ show: true, message, type });
        setTimeout(() => setToast({ show: false, message: '', type: 'success' }), finalDuration);
    };

    const handleTabSwitch = (tab) => {
        setActiveTab(tab);
        showToast(tab === 'login' ? 'Welcome back!' : 'Start your journey!', 'success');
        setFormData({ name: '', email: '', password: '', referralCode: formData.referralCode });
    };

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        if (!resetEmail) {
            showToast('Please enter your email address', 'error');
            return;
        }
        
        setLoading(true);
        const result = await resetPassword(resetEmail);
        setLoading(false);
        
        if (result.success) {
            showToast('✅ Password reset email sent! Check your inbox.', 'success');
            setShowForgotPassword(false);
            setResetEmail('');
        } else {
            showToast('❌ ' + result.error, 'error');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            let result;
            if (activeTab === 'login') {
                result = await signInWithEmail(formData.email, formData.password);
            } else {
                result = await signUpWithEmail(formData.email, formData.password, formData.name, formData.referralCode);
            }

            if (result.success) {
                showToast('✅ Success! Redirecting...', 'success');
                
                // Clear referral code from localStorage after successful signup
                if (activeTab === 'signup') {
                    localStorage.removeItem('referralCode');
                    localStorage.removeItem('referralExpiry');
                    
                    // Wait a bit longer for Firestore to save user data after signup
                    setTimeout(() => navigate('/dashboard'), 2000);
                } else {
                    // Login - redirect faster
                    setTimeout(() => navigate('/dashboard'), 1000);
                }
            } else {
                // Show user-friendly error messages
                let errorMessage = result.error || 'Authentication failed';
                
                // Handle specific error cases
                if (errorMessage.includes('device') || errorMessage.includes('network')) {
                    errorMessage = '⚠️ ' + errorMessage + '\n\nIf you forgot your password, use "Forgot Password" to reset it.';
                } else if (errorMessage.includes('email-already-in-use')) {
                    errorMessage = '⚠️ This email is already registered. Please login or use "Forgot Password" if you forgot your credentials.';
                } else if (errorMessage.includes('wrong-password') || errorMessage.includes('user-not-found')) {
                    errorMessage = '❌ Invalid email or password. Please try again or use "Forgot Password".';
                } else if (errorMessage.includes('weak-password')) {
                    errorMessage = '⚠️ Password should be at least 6 characters long.';
                }
                
                showToast(errorMessage, 'error');
            }
        } catch (error) {
            showToast('❌ ' + (error.message || 'An error occurred'), 'error');
        } finally {
            setLoading(false);
        }
    };

    // Show loading while checking auth state
    if (checkingAuth) {
        return (
            <div className="min-h-screen bg-[#05080f] flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="relative min-h-screen w-full flex flex-col overflow-hidden bg-[#05080f] text-white font-sans selection:bg-blue-500/30">

            {/* Navbar */}
            <Navbar />

            {/* Main Content */}
            <div className="flex-1 flex items-center justify-center pt-20 pb-8 px-4">
                {/* Background Blobs (Matches HomePage) */}
                <div className="fixed inset-0 overflow-hidden pointer-events-none">
                    <div className="blob bg-blue-600/40 w-[600px] h-[600px] rounded-full -top-40 -left-20 mix-blend-screen filter blur-[80px] animate-pulse"></div>
                    <div className="blob bg-emerald-500/30 w-[500px] h-[500px] rounded-full -bottom-20 -right-20 mix-blend-screen filter blur-[80px] animation-delay-2000"></div>
                </div>

            {/* Toast Notification - Success (Top) */}
            <div className={`fixed top-24 left-1/2 -translate-x-1/2 z-[300] transition-all duration-300 transform max-w-[90vw] sm:max-w-md ${toast.show && toast.type === 'success' ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0 pointer-events-none'}`}>
                <div className="backdrop-blur-md px-6 py-3 rounded-full shadow-lg font-semibold text-sm flex items-center gap-2 bg-white/90 text-slate-900">
                    <div className="w-2 h-2 rounded-full animate-pulse bg-emerald-500"></div>
                    <span className="whitespace-pre-line">{toast.message}</span>
                </div>
            </div>

            {/* Error Notification (Bottom) */}
            <div className={`fixed bottom-8 left-4 right-4 z-[300] transition-all duration-300 transform ${toast.show && toast.type === 'error' ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0 pointer-events-none'}`}>
                <div className="backdrop-blur-md px-5 py-4 rounded-2xl shadow-2xl font-medium text-sm flex items-start gap-3 max-w-md mx-auto bg-red-500/95 text-white border-2 border-red-400">
                    <button
                        onClick={() => setToast({ show: false, message: '', type: 'success' })}
                        className="flex-shrink-0 w-6 h-6 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center mt-0.5 transition-colors cursor-pointer"
                    >
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <span className="whitespace-pre-line text-left flex-1 leading-relaxed">{toast.message}</span>
                </div>
            </div>

            {/* Main Card */}
            <div className="relative z-10 w-full max-w-[420px] p-6 mx-4">
                <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-3xl rounded-[28px] border border-white/10 shadow-2xl"></div>
                <div className="relative flex flex-col gap-5">

                    {/* Header */}
                    <Link to="/" className="flex flex-col items-center gap-3 mb-2 hover:opacity-80 transition-opacity">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/20 relative group overflow-hidden">
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                            <div className="w-6 h-6 border-r-4 border-b-4 border-white/90 rounded-br-xl transform -rotate-45 -mt-1 -ml-1"></div>
                        </div>
                        <div className="text-center">
                            <h1 className="text-xl font-bold tracking-tight mb-1">Interview.AI</h1>
                            <p className="text-slate-400 text-xs">Crack any interview with AI assistance.</p>
                        </div>
                    </Link>

                    {/* Toggle */}
                    <div className="relative bg-slate-950/50 p-1 rounded-xl flex">
                        <div className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-slate-800/80 rounded-lg border border-white/5 shadow-sm transition-all duration-300 ease-out ${activeTab === 'login' ? 'left-1' : 'left-[calc(50%+2px)]'}`}></div>
                        <button
                            onClick={() => handleTabSwitch('login')}
                            className={`flex-1 py-2 text-sm font-semibold rounded-lg relative z-10 transition-colors duration-300 ${activeTab === 'login' ? 'text-white' : 'text-slate-500 hover:text-slate-300'}`}
                        >
                            Log In
                        </button>
                        <button
                            onClick={() => handleTabSwitch('signup')}
                            className={`flex-1 py-2 text-sm font-semibold rounded-lg relative z-10 transition-colors duration-300 ${activeTab === 'signup' ? 'text-white' : 'text-slate-500 hover:text-slate-300'}`}
                        >
                            Sign Up
                        </button>
                    </div>

                    {/* Forms Container */}
                    <div className="relative min-h-[380px] overflow-hidden">

                        {/* Login Form */}
                        <div className={`absolute inset-0 w-full transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] transform ${activeTab === 'login' ? 'opacity-100 translate-x-0 pointer-events-auto' : 'opacity-0 -translate-x-[20%] pointer-events-none'}`}>
                            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                                <div className="space-y-4">
                                    <div className="group relative">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 transition-colors group-focus-within:text-blue-400">
                                            <Mail size={20} />
                                        </div>
                                        <input
                                            type="email"
                                            placeholder="Email address"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full bg-slate-950/50 border border-transparent focus:border-blue-500/50 focus:bg-slate-900/80 rounded-2xl py-4 pl-12 pr-4 text-sm font-medium placeholder:text-slate-600 outline-none transition-all duration-300"
                                            required
                                        />
                                    </div>
                                    <div className="group relative">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 transition-colors group-focus-within:text-blue-400">
                                            <Lock size={20} />
                                        </div>
                                        <input
                                            type="password"
                                            placeholder="Password"
                                            value={formData.password}
                                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                            className="w-full bg-slate-950/50 border border-transparent focus:border-blue-500/50 focus:bg-slate-900/80 rounded-2xl py-4 pl-12 pr-4 text-sm font-medium placeholder:text-slate-600 outline-none transition-all duration-300"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center justify-between text-xs text-slate-400 mt-1">
                                    <label className="flex items-center gap-2 cursor-pointer group">
                                        <div className="w-5 h-5 rounded-md bg-slate-950/50 border border-white/10 flex items-center justify-center transition-colors group-hover:border-blue-500/50">
                                            <input type="checkbox" className="peer hidden" />
                                            <Check size={12} className="text-blue-400 opacity-0 peer-checked:opacity-100 transition-opacity" strokeWidth={3} />
                                        </div>
                                        <span className="group-hover:text-slate-300 transition-colors">Remember me</span>
                                    </label>
                                    <button 
                                        type="button"
                                        onClick={() => setShowForgotPassword(true)}
                                        className="hover:text-blue-400 transition-colors"
                                    >
                                        Forgot password?
                                    </button>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white font-semibold py-3 rounded-xl transition-all duration-300 transform active:scale-[0.98] shadow-lg shadow-blue-500/25 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2"
                                >
                                    {loading ? (
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    ) : (
                                        'Log In'
                                    )}
                                </button>
                            </form>
                        </div>

                        {/* Sign Up Form */}
                        <div className={`absolute inset-0 w-full transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] transform ${activeTab === 'signup' ? 'opacity-100 translate-x-0 pointer-events-auto' : 'opacity-0 translate-x-[20%] pointer-events-none'}`}>
                            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                                <div className="space-y-4">
                                    <div className="group relative">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 transition-colors group-focus-within:text-emerald-400">
                                            <User size={20} />
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="Full Name"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full bg-slate-950/50 border border-transparent focus:border-emerald-500/50 focus:bg-slate-900/80 rounded-2xl py-4 pl-12 pr-4 text-sm font-medium placeholder:text-slate-600 outline-none transition-all duration-300"
                                            required
                                        />
                                    </div>
                                    <div className="group relative">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 transition-colors group-focus-within:text-emerald-400">
                                            <Mail size={20} />
                                        </div>
                                        <input
                                            type="email"
                                            placeholder="Email address"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full bg-slate-950/50 border border-transparent focus:border-emerald-500/50 focus:bg-slate-900/80 rounded-2xl py-4 pl-12 pr-4 text-sm font-medium placeholder:text-slate-600 outline-none transition-all duration-300"
                                            required
                                        />
                                    </div>
                                    <div className="group relative">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 transition-colors group-focus-within:text-emerald-400">
                                            <Lock size={20} />
                                        </div>
                                        <input
                                            type="password"
                                            placeholder="Create Password"
                                            value={formData.password}
                                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                            className="w-full bg-slate-950/50 border border-transparent focus:border-emerald-500/50 focus:bg-slate-900/80 rounded-2xl py-4 pl-12 pr-4 text-sm font-medium placeholder:text-slate-600 outline-none transition-all duration-300"
                                            required
                                        />
                                    </div>
                                    <div className="group relative">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 transition-colors group-focus-within:text-emerald-400">
                                            <Gift size={20} />
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="Referral Code (Optional)"
                                            value={formData.referralCode}
                                            onChange={(e) => setFormData({ ...formData, referralCode: e.target.value.toUpperCase() })}
                                            className="w-full bg-slate-950/50 border border-transparent focus:border-emerald-500/50 focus:bg-slate-900/80 rounded-2xl py-4 pl-12 pr-4 text-sm font-medium placeholder:text-slate-600 outline-none transition-all duration-300 uppercase"
                                        />
                                        {formData.referralCode && (
                                            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-400 text-xs font-bold">
                                                ✓ Applied
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white font-semibold py-3 rounded-xl transition-all duration-300 transform active:scale-[0.98] shadow-lg shadow-emerald-500/25 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2"
                                >
                                    {loading ? (
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    ) : (
                                        'Create Account'
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
            </div>

            {/* Forgot Password Modal */}
            {showForgotPassword && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setShowForgotPassword(false)}>
                    <div className="bg-slate-900 rounded-3xl p-8 max-w-md w-full border border-white/10 shadow-2xl relative" onClick={(e) => e.stopPropagation()}>
                        <button 
                            onClick={() => setShowForgotPassword(false)}
                            className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                                <Lock className="w-6 h-6 text-blue-400" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-white">Reset Password</h3>
                                <p className="text-xs text-gray-400">We'll send you a reset link</p>
                            </div>
                        </div>

                        <form onSubmit={handleForgotPassword} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                                    Email Address
                                </label>
                                <div className="group relative">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 transition-colors group-focus-within:text-blue-400">
                                        <Mail size={20} />
                                    </div>
                                    <input
                                        type="email"
                                        placeholder="Enter your email"
                                        value={resetEmail}
                                        onChange={(e) => setResetEmail(e.target.value)}
                                        className="w-full bg-slate-950/50 border border-white/10 focus:border-blue-500/50 focus:bg-slate-900/80 rounded-xl py-3 pl-12 pr-4 text-sm font-medium placeholder:text-slate-600 outline-none transition-all"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
                                <p className="text-xs text-blue-300">
                                    💡 Enter your email address and we'll send you a link to reset your password.
                                </p>
                            </div>

                            <div className="flex gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setShowForgotPassword(false)}
                                    className="flex-1 bg-white/5 hover:bg-white/10 text-white font-semibold py-3 rounded-xl transition-all border border-white/10"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {loading ? (
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    ) : (
                                        'Send Reset Link'
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
