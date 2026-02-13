import { useRef, useState } from 'react';
import { Lightbulb, Check, Mic, MessageSquare, Smile, Wrench, ChevronDown } from 'lucide-react';

const QuickTip = ({ icon: Icon, title, desc }) => (
    <div className="flex gap-4 items-start bg-green-900/10 p-5 rounded-2xl border border-green-500/10 hover:bg-green-900/20 transition-colors">
        <div className="mt-1 w-6 h-6 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center flex-shrink-0">
            <Icon className="w-3.5 h-3.5" />
        </div>
        <div>
            <h4 className="font-bold text-white text-base">{title}</h4>
            <p className="text-sm text-gray-400 mt-1">{desc}</p>
        </div>
    </div>
);

const FaqItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div
            className="group border border-white/5 rounded-xl p-6 bg-gray-900/30 hover:bg-gray-800/50 transition-colors cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
        >
            <h4 className="font-bold text-white text-sm mb-2 flex justify-between items-center">
                {question}
                <ChevronDown className={`w-4 h-4 text-gray-500 group-hover:text-white transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </h4>
            {isOpen && (
                <p className="text-sm text-gray-400 pl-4 border-l-2 border-red-500/30 animate-fade-in">
                    {answer}
                </p>
            )}
            {!isOpen && (
                <p className="text-sm text-gray-400 pl-4 border-l-2 border-red-500/30 hidden">
                    {answer}
                </p>
            )}
        </div>
    );
};

export default function TipsAndFaq() {
    return (
        <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 relative">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                <div>
                    <h3 className="text-2xl font-bold mb-8 flex items-center gap-2">
                        <Lightbulb className="text-yellow-400" />
                        Quick Tips for Success
                    </h3>
                    <div className="space-y-4">
                        <QuickTip icon={Check} title="Setup profile first" desc="Better AI answers depend on your tech stack info." />
                        <QuickTip icon={Mic} title="Use a good microphone" desc="Clear audio ensures perfect transcription." />
                        <QuickTip icon={MessageSquare} title="Read naturally" desc="Don't memorize; use the text as a guide." />
                        <QuickTip icon={Smile} title="Stay calm" desc="The app is a backup, your skills matter most!" />
                    </div>
                </div>

                <div id="faq">
                    <h3 className="text-2xl font-bold mb-8 flex items-center gap-2">
                        <Wrench className="text-blue-400" />
                        Common Issues
                    </h3>
                    <div className="space-y-4">
                        <FaqItem
                            question="No transcription appearing?"
                            answer="Check your microphone permissions in Windows settings and restart the app."
                        />
                        <FaqItem
                            question="Pressed DELETE but no answer?"
                            answer="Check internet connection. Wait 2-3 seconds for API latency, then retry pressing DELETE."
                        />
                        <FaqItem
                            question="App seems frozen?"
                            answer="Press ESC to reset the interface instantly. This clears any pending requests."
                        />
                        <FaqItem
                            question="Screenshot mode not capturing?"
                            answer="Try using the other Alt key on your keyboard, or switch to manual Text Input mode via CapsLock."
                        />
                    </div>
                </div>

            </div>
        </section>
    );
}
