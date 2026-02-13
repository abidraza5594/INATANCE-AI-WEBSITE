export default function Footer() {
    return (
        <footer className="bg-[#020408] py-12 border-t border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-gray-400"><path d="m12 8-9.04 9.06a2.82 2.82 0 1 0 3.98 3.98l9.06-9.06" /><path d="m22 2-9.04 9.06a2.82 2.82 0 1 0 3.98 3.98l9.06-9.06" /><path d="M7 17l9.3-9.3" /><path d="M13.2 13.3L10 10" /><path d="M12.2 10.3l-2.5 2.5" /></svg>
                        </div>
                        <span className="font-bold text-lg text-gray-200">Interview.AI</span>
                    </div>

                    <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-center text-sm text-gray-500">
                        <span>Version 1.0</span>
                        <span>Platform: Windows</span>
                        <span className="flex items-center gap-2 text-gray-400">Status: <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span> Production Ready</span>
                    </div>

                    <div>
                        <button className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-lg font-medium transition-colors shadow-lg shadow-blue-900/40">
                            Get Started
                        </button>
                    </div>
                </div>
                <div className="mt-8 pt-8 border-t border-white/5 text-center text-xs text-gray-700">
                    © 2024 Interview.AI. All rights reserved. Not affiliated with Zoom, Teams or Google Meet.
                </div>
            </div>
        </footer>
    );
}
