import { useState, useEffect } from 'react';
import { Mail, Lock, User, Check, AlertCircle, Gift, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { signUpWithEmail, signInWithEmail, signInWithGoogle, resetPassword, onAuthChange, handleGoogleRedirect } from '../firebase/auth';
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

    // Check for stored auth error FIRST (before anything else)
    useEffect(() => {
        const storedError = localStorage.getItem('authError');
        if (storedError) {
            console.log('[AUTH PAGE] Found stored error:', storedError);
            localStorage.removeItem('authError');
            
            // Show error immediately
            const errorMessage = '⚠️ ' + storedError + '\n\n💡 Tip: If you already have an account, please login with your original email and password.';
            showToast(errorMessage, 'error', 12000);
        }
    }, []);

    // Check if user is already logged in
    useEffect(() => {
        const unsubscribe = onAuthChange((user) => {
            if (user) {
                // User is already logged in, redirect to dashboard
                navigate('/dashboard', { replace: true });
            } else {
                setCheckingAuth(false);
            }
        });
        return () => unsubscribe();
    }, [navigate]);

    // Handle Google redirect result on page load
    useEffect(() => {
        const checkRedirect = async () => {
            console.log('[AUTH PAGE] Checking Google redirect...');
            
            try {
                const result = await handleGoogleRedirect();
                console.log('[AUTH PAGE] Redirect result:', result);
                
                if (result) {
                    if (result.success) {
                        console.log('[AUTH PAGE] Success, redirecting to dashboard');
                        showToast('✅ Success! Redirecting to dashboard...', 'success', 2000);
                        setTimeout(() => navigate('/dashboard'), 1000);
                    } else if (result.error) {
                        console.log('[AUTH PAGE] Error from redirect:', result.error);
                        // Error already stored in localStorage and shown by first useEffect
                    }
                } else {
                    console.log('[AUTH PAGE] No redirect result');
                }
            } catch (error) {
                console.error('[AUTH PAGE] Error checking redirect:', error);
                showToast('❌ An error occurred: ' + error.message, 'error', 8000);
            }
        };
        checkRedirect();
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

    const showToast = (message, type = 'success', duration = 6000) => {
        setToast({ show: true, message, type });
        setTimeout(() => setToast({ show: false, message: '', type: 'success' }), duration);
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
                }
                
                setTimeout(() => navigate('/dashboard'), 1000);
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

    const handleGoogleLogin = async () => {
        console.log('[AUTH PAGE] Google login clicked');
        
        // Clear any previous errors
        localStorage.removeItem('authError');
        setLoading(true);
        
        try {
            const result = await signInWithGoogle();
            console.log('[AUTH PAGE] Google login result:', result);
            
            if (result.redirecting) {
                // Mobile redirect in progress
                console.log('[AUTH PAGE] Redirecting to Google...');
                showToast('🔄 Redirecting to Google...', 'success', 2000);
                // Keep loading true during redirect
                return;
            }
            if (result.success) {
                console.log('[AUTH PAGE] Google login success');
                showToast('✅ Success! Redirecting to dashboard...', 'success', 2000);
                setTimeout(() => navigate('/dashboard'), 1000);
            } else {
                console.log('[AUTH PAGE] Google login failed:', result.error);
                let errorMessage = '⚠️ ' + result.error + '\n\n💡 Tip: If you already have an account, please login with your original email and password.';
                showToast(errorMessage, 'error', 12000);
                setLoading(false);
            }
        } catch (error) {
            console.error('[AUTH PAGE] Google login error:', error);
            showToast('❌ ' + (error.message || 'An error occurred'), 'error', 8000);
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

            {/* Toast Notification */}
            <div className={`fixed top-24 left-1/2 -translate-x-1/2 z-[300] transition-all duration-300 transform max-w-[90vw] sm:max-w-md ${toast.show ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0 pointer-events-none'}`}>
                <div className={`backdrop-blur-md px-6 py-4 rounded-2xl shadow-2xl font-semibold text-sm flex items-start gap-3 ${
                    toast.type === 'error' 
                        ? 'bg-red-500/95 text-white border-2 border-red-300' 
                        : 'bg-white/95 text-slate-900 border-2 border-white'
                }`}>
                    <div className={`w-3 h-3 rounded-full animate-pulse flex-shrink-0 mt-0.5 ${
                        toast.type === 'error' ? 'bg-white' : 'bg-emerald-500'
                    }`}></div>
                    <span className="whitespace-pre-line text-left flex-1">{toast.message}</span>
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

                    {/* Social Login */}
                    <div className="flex items-center gap-4 my-2">
                        <div className="h-px bg-white/10 flex-1"></div>
                        <span className="text-xs uppercase text-slate-500 font-medium tracking-wider">or continue with</span>
                        <div className="h-px bg-white/10 flex-1"></div>
                    </div>

                    <button onClick={handleGoogleLogin} disabled={loading} className="w-full bg-slate-950/50 hover:bg-slate-900 border border-transparent hover:border-white/5 text-white text-sm font-medium py-3 rounded-xl transition-all duration-200 flex items-center justify-center gap-3 group disabled:opacity-50 disabled:cursor-not-allowed">
                        <svg className="w-5 h-5 grayscale group-hover:grayscale-0 transition-all duration-300" viewBox="0 0 24 24">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.84z" fill="#FBBC05"></path>
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
                        </svg>
                        Google Account
                    </button>
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
