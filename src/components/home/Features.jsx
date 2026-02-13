import { Mic, Bot, Camera, Keyboard, Lock, User, Timer, Sliders } from 'lucide-react';

const FeatureCard = ({ icon: Icon, color, title, desc, tag }) => {
    const colorMap = {
        blue: "text-blue-400 bg-blue-500/10",
        green: "text-green-400 bg-green-500/10",
        purple: "text-purple-400 bg-purple-500/10",
        yellow: "text-yellow-400 bg-yellow-500/10",
        red: "text-red-400 bg-red-500/10",
        indigo: "text-indigo-400 bg-indigo-500/10",
        pink: "text-pink-400 bg-pink-500/10",
        teal: "text-teal-400 bg-teal-500/10"
    };

    const tagColorMap = {
        blue: "text-blue-300",
        green: "text-green-300",
        purple: "text-purple-300",
        yellow: "text-yellow-300",
        red: "text-red-300",
        indigo: "text-indigo-300",
        pink: "text-pink-300",
        teal: "text-teal-300"
    };

    return (
        <div className="glass p-6 rounded-2xl border border-white/5 hover:bg-white/5 transition-all group">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${colorMap[color]}`}>
                <Icon className={`w-6 h-6 ${colorMap[color].split(" ")[0]}`} />
            </div>
            <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">{desc}</p>
            <div className="pt-4 mt-auto border-t border-white/5">
                <span className={`text-xs font-mono px-2 py-1 rounded ${tagColorMap[color]} ${colorMap[color]}`}>
                    {tag}
                </span>
            </div>
        </div>
    );
};

export default function Features() {
    return (
        <section id="features" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-20">
                <h2 className="text-3xl md:text-5xl font-bold mb-6">Powerful Features</h2>
                <p className="text-gray-400 max-w-2xl mx-auto text-lg">Everything you need to confidently handle technical and behavioral interviews without breaking a sweat.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <FeatureCard
                    icon={Mic}
                    color="blue"
                    title="Voice Transcription"
                    desc="Automatically listens to interviewer's questions and converts speech to text in real-time. Supports English & Hindi even with background noise."
                    tag="Auto-detects"
                />
                <FeatureCard
                    icon={Bot}
                    color="green"
                    title="AI Answers"
                    desc="Generates accurate, complete 3-5 sentence answers in simple English. Uses Mistral -> Gemini -> Ollama fallback chain."
                    tag="Press DELETE"
                />
                <FeatureCard
                    icon={Camera}
                    color="purple"
                    title="Screenshot Mode"
                    desc="Capture screen areas to ask about code snippets or diagrams. Visual selection tool analyzes images instantly."
                    tag="Alt (2x)"
                />
                <FeatureCard
                    icon={Keyboard}
                    color="yellow"
                    title="Text Input"
                    desc="Type questions manually or paste from clipboard if voice isn't an option. Full manual control when you need it."
                    tag="CapsLock"
                />
                <FeatureCard
                    icon={Lock}
                    color="red"
                    title="Stealth Mode"
                    desc="Hidden from screen recording tools like Zoom, Teams, and Meet. Hidden from taskbar. Always on top overlay."
                    tag="100% Invisible"
                />
                <FeatureCard
                    icon={User}
                    color="indigo"
                    title="Profile Setup"
                    desc="Upload your resume and set your tech stack. AI customizes answers to match your specific profile and experience."
                    tag="Personalized"
                />
                <FeatureCard
                    icon={Timer}
                    color="pink"
                    title="Time Management"
                    desc="Tracks interview session time with a countdown timer. Stay aware of your schedule without leaving the app interface."
                    tag="Timer Display"
                />
                <FeatureCard
                    icon={Sliders}
                    color="teal"
                    title="Customization"
                    desc="Adjust window transparency (20-100%) and font size (10-24px) to suit your monitor and vision needs."
                    tag="Settings Tab"
                />
            </div>
        </section>
    );
}
