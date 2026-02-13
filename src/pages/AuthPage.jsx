import { useState, useEffect } from 'react';
import { Mail, Lock, User, Check, AlertCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function AuthPage() {
    const [activeTab, setActiveTab] = useState('login');
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState({ show: false, message: '' });
    const navigate = useNavigate();

    useEffect(() => {
        // Show welcome toast on mount
        showToast('Welcome back!');
    }, []);

    const showToast = (message) => {
        setToast({ show: true, message });
        setTimeout(() => setToast({ show: false, message: '' }), 3000);
    };

    const handleTabSwitch = (tab) => {
        setActiveTab(tab);
        showToast(tab === 'login' ? 'Welcome back!' : 'Join the team!');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        setLoading(false);
        showToast('Success! Redirecting...');
        // In a real app, handle auth here
        setTimeout(() => navigate('/'), 1000);
    };

    return (
        <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#05080f] text-white font-sans selection:bg-blue-500/30">

            {/* Background Blobs (Matches HomePage) */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="blob bg-blue-600/40 w-[600px] h-[600px] rounded-full -top-40 -left-20 mix-blend-screen filter blur-[80px] animate-pulse"></div>
                <div className="blob bg-emerald-500/30 w-[500px] h-[500px] rounded-full -bottom-20 -right-20 mix-blend-screen filter blur-[80px] animation-delay-2000"></div>
            </div>

            {/* Toast Notification */}
            <div className={`fixed top-8 right-8 z-50 transition-all duration-300 transform ${toast.show ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'}`}>
                <div className="bg-white/90 backdrop-blur-md text-slate-900 px-6 py-3 rounded-full shadow-lg font-semibold text-sm flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                    {toast.message}
                </div>
            </div>

            {/* Main Card */}
            <div className="relative z-10 w-full max-w-[440px] p-8 mx-4">
                <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-3xl rounded-[32px] border border-white/10 shadow-2xl"></div>
                <div className="relative flex flex-col gap-6">

                    {/* Header */}
                    <Link to="/" className="flex flex-col items-center gap-4 mb-2 hover:opacity-80 transition-opacity">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/20 relative group overflow-hidden">
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                            <div className="w-8 h-8 border-r-4 border-b-4 border-white/90 rounded-br-xl transform -rotate-45 -mt-1 -ml-1"></div>
                        </div>
                        <div className="text-center">
                            <h1 className="text-2xl font-bold tracking-tight mb-1">Interview.AI</h1>
                            <p className="text-slate-400 text-sm">Your AI co-pilot for hiring.</p>
                        </div>
                    </Link>

                    {/* Toggle */}
                    <div className="relative bg-slate-950/50 p-1 rounded-2xl flex">
                        <div className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-slate-800/80 rounded-xl border border-white/5 shadow-sm transition-all duration-300 ease-out ${activeTab === 'login' ? 'left-1' : 'left-[calc(50%+2px)]'}`}></div>
                        <button
                            onClick={() => handleTabSwitch('login')}
                            className={`flex-1 py-2.5 text-sm font-semibold rounded-xl relative z-10 transition-colors duration-300 ${activeTab === 'login' ? 'text-white' : 'text-slate-500 hover:text-slate-300'}`}
                        >
                            Log In
                        </button>
                        <button
                            onClick={() => handleTabSwitch('signup')}
                            className={`flex-1 py-2.5 text-sm font-semibold rounded-xl relative z-10 transition-colors duration-300 ${activeTab === 'signup' ? 'text-white' : 'text-slate-500 hover:text-slate-300'}`}
                        >
                            Sign Up
                        </button>
                    </div>

                    {/* Forms Container */}
                    <div className="relative min-h-[320px] overflow-hidden">

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
                                    <a href="#" className="hover:text-blue-400 transition-colors">Forgot password?</a>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white font-semibold py-4 rounded-2xl transition-all duration-300 transform active:scale-[0.98] shadow-lg shadow-blue-500/25 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2"
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
                                            className="w-full bg-slate-950/50 border border-transparent focus:border-emerald-500/50 focus:bg-slate-900/80 rounded-2xl py-4 pl-12 pr-4 text-sm font-medium placeholder:text-slate-600 outline-none transition-all duration-300"
                                            required
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white font-semibold py-4 rounded-2xl transition-all duration-300 transform active:scale-[0.98] shadow-lg shadow-emerald-500/25 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2"
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

                    <button className="w-full bg-slate-950/50 hover:bg-slate-900 border border-transparent hover:border-white/5 text-white text-sm font-medium py-3.5 rounded-2xl transition-all duration-200 flex items-center justify-center gap-3 group">
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
    );
}
