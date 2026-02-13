import { useEffect } from 'react';
import Navbar from '../components/home/Navbar';
import Hero from '../components/home/Hero';
import DemoInterface from '../components/home/DemoInterface';
import Features from '../components/home/Features';
import HowItWorks from '../components/home/HowItWorks';
import TipsAndFaq from '../components/home/TipsAndFaq';
import Pricing from '../components/home/Pricing';
import Footer from '../components/home/Footer';

export default function HomePage() {
    // Store referral code in localStorage when user lands on homepage
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const ref = urlParams.get('ref');
        if (ref) {
            // Store referral code for 24 hours
            const expiryTime = Date.now() + (24 * 60 * 60 * 1000);
            localStorage.setItem('referralCode', ref);
            localStorage.setItem('referralExpiry', expiryTime.toString());
            console.log('[REFERRAL] Stored referral code:', ref);
        }
    }, []);

    return (
        <div className="relative overflow-hidden w-full">
            {/* Background Blobs */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="blob bg-blue-600 w-96 h-96 rounded-full top-0 left-0 -translate-x-1/2 -translate-y-1/2"></div>
                <div className="blob bg-purple-600 w-96 h-96 rounded-full bottom-0 right-0 translate-x-1/3 translate-y-1/3 animation-delay-2000"></div>
                <div className="blob bg-green-500 w-64 h-64 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20"></div>
            </div>

            <Navbar />
            <Hero />
            <DemoInterface />

            {/* Stats Divider */}
            <div className="border-y border-white/5 bg-white/[0.02]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-white/5">
                        <div className="p-4">
                            <div className="text-4xl font-bold text-white mb-2">3</div>
                            <div className="text-xs font-semibold text-blue-400 uppercase tracking-widest">AI Providers</div>
                            <div className="text-xs text-gray-500 mt-1">Mistral, Gemini, Ollama</div>
                        </div>
                        <div className="p-4">
                            <div className="text-4xl font-bold text-white mb-2">2</div>
                            <div className="text-xs font-semibold text-green-400 uppercase tracking-widest">Voice Engines</div>
                            <div className="text-xs text-gray-500 mt-1">Mistral & Google</div>
                        </div>
                        <div className="p-4">
                            <div className="text-4xl font-bold text-white mb-2">15+</div>
                            <div className="text-xs font-semibold text-purple-400 uppercase tracking-widest">Shortcuts</div>
                            <div className="text-xs text-gray-500 mt-1">For power users</div>
                        </div>
                        <div className="p-4">
                            <div className="text-4xl font-bold text-white mb-2">100%</div>
                            <div className="text-xs font-semibold text-red-400 uppercase tracking-widest">Stealth</div>
                            <div className="text-xs text-gray-500 mt-1">Hidden from capture</div>
                        </div>
                    </div>
                </div>
            </div>

            <Features />
            <HowItWorks />
            <TipsAndFaq />

            {/* Testimonial Divider */}
            <section className="py-20 bg-gradient-to-r from-blue-900/20 to-green-900/20 border-y border-white/5">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-8">Why Professionals Choose Interview.AI</h2>
                    <div className="flex flex-wrap justify-center gap-4 mb-10">
                        <span className="px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-sm font-medium">Real-time transcription</span>
                        <span className="px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-300 text-sm font-medium">Instant answers</span>
                        <span className="px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm font-medium">Screenshot analysis</span>
                        <span className="px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 text-red-300 text-sm font-medium">100% Stealth Mode</span>
                    </div>
                    <p className="text-gray-400 italic font-medium text-lg">"Use as backup, not replacement. Your skills matter most! 🚀"</p>
                </div>
            </section>

            <Pricing />

            <Footer />
        </div>
    );
}
