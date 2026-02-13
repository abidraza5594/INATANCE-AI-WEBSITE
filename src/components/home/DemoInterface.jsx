import { useState, useEffect, useRef } from 'react';
import { HelpCircle, Bot, Mic, Cpu } from 'lucide-react';

const questions = [
    "Can you explain the difference between REST and GraphQL?",
    "How do you handle state management in large React apps?",
    "What is your experience with microservices architecture?"
];

const answers = [
    "REST is an architectural style using standard HTTP methods and multiple endpoints, while GraphQL is a query language allowing clients to request exactly the data they need from a single endpoint. GraphQL prevents over-fetching but adds complexity in caching.",
    "For large applications, I prefer using Redux Toolkit or Zustand for global state. I try to keep state as local as possible using Context API for feature-specific data to avoid unnecessary re-renders across the application tree.",
    "I've built several services using Node.js and Docker. Key challenges include inter-service communication via RabbitMQ, ensuring data consistency with distributed transactions, and centralized logging with ELK stack."
];

export default function DemoInterface() {
    const [currentQIndex, setCurrentQIndex] = useState(0);
    const [displayedQuestion, setDisplayedQuestion] = useState("");
    const [displayedAnswer, setDisplayedAnswer] = useState("");
    const [isTypingQuestion, setIsTypingQuestion] = useState(false);
    const [isTypingAnswer, setIsTypingAnswer] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);

    useEffect(() => {
        let mounted = true;

        const runDemo = async () => {
            while (mounted) {
                // Reset
                setDisplayedQuestion("");
                setDisplayedAnswer("");
                setIsGenerating(false);
                setIsTypingQuestion(false);
                setIsTypingAnswer(false);

                await new Promise(r => setTimeout(r, 1000));
                if (!mounted) break;

                // Type Question
                setIsTypingQuestion(true);
                const qText = questions[currentQIndex];
                for (let i = 0; i <= qText.length; i++) {
                    if (!mounted) break;
                    setDisplayedQuestion(qText.substring(0, i));
                    await new Promise(r => setTimeout(r, 40));
                }
                setIsTypingQuestion(false);

                await new Promise(r => setTimeout(r, 800));
                if (!mounted) break;

                // Generating State
                setIsGenerating(true);
                await new Promise(r => setTimeout(r, 1500));
                setIsGenerating(false);
                if (!mounted) break;

                // Type Answer
                setIsTypingAnswer(true);
                const aText = answers[currentQIndex];
                for (let i = 0; i <= aText.length; i++) {
                    if (!mounted) break;
                    setDisplayedAnswer(aText.substring(0, i));
                    await new Promise(r => setTimeout(r, 15));
                }
                setIsTypingAnswer(false);

                await new Promise(r => setTimeout(r, 4000));
                if (!mounted) break;

                setCurrentQIndex(prev => (prev + 1) % questions.length);
            }
        };

        runDemo();

        return () => { mounted = false; };
    }, [currentQIndex]);

    return (
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-32 z-20">
            <div className="glass-strong rounded-2xl overflow-hidden shadow-2xl shadow-blue-900/20 border border-gray-800/60 ring-1 ring-white/10 transform transition-all hover:scale-[1.01] duration-500">

                <div className="bg-[#0F1115] px-4 py-3 flex items-center justify-between border-b border-gray-800">
                    <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-[#FF5F57]"></div>
                        <div className="w-3 h-3 rounded-full bg-[#FEBC2E]"></div>
                        <div className="w-3 h-3 rounded-full bg-[#28C840]"></div>
                    </div>
                    <div className="text-gray-500 text-xs font-bold tracking-widest uppercase">Interview.AI - Live Session</div>
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-gray-800/50 border border-gray-700">
                            <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></div>
                            <span className="text-[10px] text-gray-400 font-mono">REC</span>
                        </div>
                    </div>
                </div>

                <div className="p-6 md:p-10 min-h-[400px] flex flex-col gap-6 relative bg-gradient-to-b from-[#0B0F17] to-[#05080f]" id="demo-interface">

                    <div className="bg-blue-900/10 border border-blue-500/20 rounded-2xl p-6 relative group transition-all duration-300 hover:border-blue-500/40">
                        <div className="absolute -left-3 -top-3 w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
                            <HelpCircle className="w-5 h-5 text-white" />
                        </div>
                        <div className="ml-4">
                            <h3 className="text-blue-400 text-xs font-bold tracking-wider uppercase mb-2">Interviewer Question</h3>
                            <p className={`text-xl md:text-2xl text-gray-100 font-medium leading-relaxed ${isTypingQuestion ? 'cursor' : ''}`}>
                                {displayedQuestion}
                            </p>
                        </div>
                    </div>

                    <div className="bg-green-900/10 border border-green-500/20 rounded-2xl p-6 relative group transition-all duration-300 hover:border-green-500/40 flex-grow">
                        <div className="absolute -left-3 -top-3 w-8 h-8 rounded-lg bg-green-600 flex items-center justify-center shadow-lg shadow-green-500/30">
                            <Bot className="w-5 h-5 text-white" />
                        </div>
                        <div className="ml-4">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="text-green-400 text-xs font-bold tracking-wider uppercase">AI Suggested Answer</h3>
                                {isGenerating && (
                                    <div className="flex items-center gap-2">
                                        <span className="flex gap-1">
                                            <span className="w-1 h-1 bg-green-400 rounded-full animate-bounce"></span>
                                            <span className="w-1 h-1 bg-green-400 rounded-full animate-bounce delay-100"></span>
                                            <span className="w-1 h-1 bg-green-400 rounded-full animate-bounce delay-200"></span>
                                        </span>
                                        <span className="text-xs text-green-500/70">Generating...</span>
                                    </div>
                                )}
                            </div>
                            <p className={`text-lg text-gray-300 leading-relaxed font-light ${isTypingAnswer ? 'cursor' : ''}`}>
                                {displayedAnswer}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-gray-500 mt-auto pt-4 border-t border-gray-800">
                        <div className="flex items-center gap-4">
                            <span className="flex items-center gap-1.5">
                                <Mic className="w-3 h-3 text-green-500" />
                                Listening
                            </span>
                            <span className="flex items-center gap-1.5">
                                <Cpu className="w-3 h-3 text-blue-500" />
                                Mistral Large
                            </span>
                        </div>
                        <div className="font-mono text-gray-600">Press <span className="text-gray-400">DELETE</span> to generate answer</div>
                    </div>
                </div>
            </div>

            <div className="absolute -bottom-20 -z-10 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-blue-500/20 blur-[120px] rounded-full"></div>
        </div>
    );
}
