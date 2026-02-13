import { Download, PlayCircle } from 'lucide-react';

export default function Hero() {
    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = 'https://github.com/abidraza5594/INATANCE-AI-WEBSITE/releases/download/v1.0.0/InstantInterview.exe';
        link.download = 'InstantInterview.exe';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleWatchDemo = () => {
        const element = document.getElementById('demo-interface');
        if (element) element.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="relative pt-32 pb-20 sm:pt-40 sm:pb-24 overflow-hidden z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">

                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-sm animate-fade-in-up">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    <span className="text-sm text-gray-300 font-medium">Production Ready for Windows</span>
                </div>

                <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 max-w-4xl mx-auto leading-tight">
                    Ace Your Interview with <br />
                    <span className="gradient-text">Real-time AI Assistance</span>
                </h1>

                <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-gray-400 leading-relaxed">
                    The ultimate stealth assistant. It listens to your interview questions and generates accurate, personalized answers instantly.
                </p>

                <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center w-full">
                    <button
                        onClick={handleDownload}
                        className="w-full sm:w-auto bg-white text-slate-900 hover:bg-gray-100 px-8 py-4 rounded-xl text-lg font-bold transition-all shadow-xl shadow-white/10 flex items-center justify-center gap-2 hover:-translate-y-1"
                    >
                        <Download className="w-5 h-5" />
                        Download Now
                    </button>
                    <button
                        onClick={handleWatchDemo}
                        className="w-full sm:w-auto glass text-white hover:bg-white/10 px-8 py-4 rounded-xl text-lg font-bold transition-all flex items-center justify-center gap-2 hover:-translate-y-1 border border-white/10"
                    >
                        <PlayCircle className="w-5 h-5" />
                        Watch Demo
                    </button>
                </div>
            </div>
        </div>
    );
}
