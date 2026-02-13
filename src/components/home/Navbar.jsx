import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mic, Download, LogOut } from 'lucide-react';
import { useState, useEffect } from 'react';
import { onAuthChange, logOut } from '../../firebase/auth';

export default function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthChange((currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    const handleLogout = async () => {
        await logOut();
        navigate('/');
    };

    const handleNavigation = (sectionId) => {
        // If already on homepage, just scroll
        if (location.pathname === '/') {
            const element = document.getElementById(sectionId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            // Navigate to homepage with hash
            navigate(`/#${sectionId}`);
            // After navigation, scroll to section
            setTimeout(() => {
                const element = document.getElementById(sectionId);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
        }
    };

    return (
        <nav className="fixed w-full z-[100] top-0 border-b border-white/5 bg-[#05080f]/80 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity cursor-pointer flex-shrink-0">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-emerald-400 flex items-center justify-center shadow-lg shadow-blue-500/20">
                            <Mic className="w-6 h-6 text-white" />
                        </div>
                        <span className="font-bold text-xl tracking-tight text-white hidden sm:block">Interview.AI</span>
                    </Link>

                    <div className="hidden md:flex items-center space-x-8">
                        <button
                            onClick={() => handleNavigation('features')}
                            className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
                        >
                            Features
                        </button>
                        <button
                            onClick={() => handleNavigation('how-it-works')}
                            className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
                        >
                            How it Works
                        </button>
                        <button
                            onClick={() => handleNavigation('shortcuts')}
                            className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
                        >
                            Shortcuts
                        </button>
                        <button
                            onClick={() => handleNavigation('pricing')}
                            className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
                        >
                            Pricing
                        </button>
                        <button
                            onClick={() => handleNavigation('faq')}
                            className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
                        >
                            FAQ
                        </button>
                    </div>

                    <div className="flex items-center gap-3 sm:gap-6 flex-shrink-0">
                        {user ? (
                            <>
                                <Link to="/dashboard" className="text-sm font-medium text-gray-300 hover:text-white transition-colors hidden sm:block">
                                    Dashboard
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-2 text-sm font-medium text-gray-300 hover:text-white transition-colors"
                                >
                                    <LogOut className="w-4 h-4" />
                                    <span className="hidden sm:inline">Logout</span>
                                </button>
                            </>
                        ) : (
                            <Link to="/login" className="text-sm font-medium text-gray-300 hover:text-white transition-colors whitespace-nowrap">
                                Log In
                            </Link>
                        )}
                        <a
                            href="https://github.com/abidraza5594/INATANCE-AI-WEBSITE/releases/download/v1.0.0/InstantInterview.exe"
                            download="InstantInterview.exe"
                            className="group relative inline-flex h-10 items-center justify-center gap-2 overflow-hidden rounded-full bg-blue-600 px-4 sm:px-6 font-medium text-white transition-all duration-300 hover:bg-blue-500 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/40 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-900"
                        >
                            <span className="hidden sm:inline">Download v1.0</span>
                            <span className="sm:hidden">Download</span>
                            <Download className="w-4 h-4 transition-transform group-hover:translate-y-1" />
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    );
}
