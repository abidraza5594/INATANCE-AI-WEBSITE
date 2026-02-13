import { Link } from 'react-router-dom';
import { Mic, Download } from 'lucide-react';

export default function Navbar() {
    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <nav className="fixed w-full z-50 top-0 border-b border-white/5 bg-[#05080f]/80 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-emerald-400 flex items-center justify-center shadow-lg shadow-blue-500/20">
                            <Mic className="w-6 h-6 text-white" />
                        </div>
                        <span className="font-bold text-xl tracking-tight text-white">Interview.AI</span>
                    </div>

                    <div className="hidden md:flex items-center space-x-8">
                        <button
                            onClick={() => scrollToSection('features')}
                            className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
                        >
                            Features
                        </button>
                        <button
                            onClick={() => scrollToSection('how-it-works')}
                            className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
                        >
                            How it Works
                        </button>
                        <button
                            onClick={() => scrollToSection('shortcuts')}
                            className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
                        >
                            Shortcuts
                        </button>
                        <button
                            onClick={() => scrollToSection('pricing')}
                            className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
                        >
                            Pricing
                        </button>
                        <button
                            onClick={() => scrollToSection('faq')}
                            className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
                        >
                            FAQ
                        </button>
                    </div>

                    <div className="flex items-center gap-6">
                        <Link to="/login" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                            Log In
                        </Link>
                        <a
                            href="https://github.com/abidraza5594/INATANCE-AI-WEBSITE/releases/download/v1.0.0/InstantInterview.exe"
                            download="InstantInterview.exe"
                            className="group relative inline-flex h-10 items-center justify-center overflow-hidden rounded-full bg-blue-600 px-6 font-medium text-white transition-all duration-300 hover:bg-blue-500 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/40 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-900"
                        >
                            <span className="mr-2">Download v1.0</span>
                            <Download className="w-4 h-4 transition-transform group-hover:translate-y-1" />
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    );
}
