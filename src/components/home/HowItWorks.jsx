import { Zap, Camera, Move, Keyboard } from 'lucide-react';

export default function HowItWorks() {
    return (
        <section className="py-24 bg-[#0F1115]" id="how-it-works">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col xl:flex-row gap-20">

                    <div className="xl:w-1/2">
                        <h2 className="text-3xl font-bold mb-10 flex items-center gap-3">
                            <span className="w-10 h-10 rounded-lg bg-yellow-500/10 flex items-center justify-center">
                                <Zap className="text-yellow-400 w-6 h-6" />
                            </span>
                            How It Works
                        </h2>

                        <div className="space-y-0 relative">
                            <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-gray-800"></div>

                            <div className="relative pl-20 pb-12 group">
                                <div className="absolute left-2 top-0 w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-sm font-bold border-4 border-[#0F1115] shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">1</div>
                                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">Setup Profile</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">Login, upload your resume, and set your tech stack in settings. This ensures the AI knows your background and context.</p>
                            </div>

                            <div className="relative pl-20 pb-12 group">
                                <div className="absolute left-2 top-0 w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-sm font-bold border-4 border-[#0F1115] shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">2</div>
                                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">Join Interview</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">Start the app and join your call. The app listens in the background. When a question is asked, it transcribes it automatically.</p>
                            </div>

                            <div className="relative pl-20 pb-12 group">
                                <div className="absolute left-2 top-0 w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-sm font-bold border-4 border-[#0F1115] shadow-lg shadow-green-500/20 group-hover:scale-110 transition-transform">3</div>
                                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-green-400 transition-colors">Get Answers</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">
                                    Press <kbd className="bg-gray-800 px-2 py-0.5 rounded text-xs border border-gray-700 text-gray-300">DELETE</kbd> to generate an answer. Read it naturally. Press <kbd className="bg-gray-800 px-2 py-0.5 rounded text-xs border border-gray-700 text-gray-300">ESC</kbd> to clear for the next question.
                                </p>
                            </div>

                            <div className="bg-gray-800/20 p-6 rounded-2xl border border-gray-800 mt-4 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl"></div>
                                <h4 className="font-bold text-white mb-4 flex items-center gap-2">
                                    <Camera className="w-4 h-4 text-purple-400" /> Visual Questions?
                                </h4>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="bg-black/20 p-3 rounded-lg border border-white/5">
                                        <div className="text-xs text-purple-400 font-bold mb-1">STEP 1</div>
                                        <div className="text-sm text-gray-300">Press <strong className="text-white">Alt (2x)</strong> to enter screenshot mode</div>
                                    </div>
                                    <div className="bg-black/20 p-3 rounded-lg border border-white/5">
                                        <div className="text-xs text-purple-400 font-bold mb-1">STEP 2</div>
                                        <div className="text-sm text-gray-300">Select area & Press <strong className="text-white">Alt</strong> to capture</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <ShortcutsTable />

                </div>
            </div>
        </section>
    );
}

function ShortcutsTable() {
    return (
        <div className="xl:w-1/2" id="shortcuts">
            <h2 className="text-3xl font-bold mb-10 flex items-center gap-3">
                <span className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                    <Keyboard className="text-purple-400 w-6 h-6" />
                </span>
                Essential Shortcuts
            </h2>

            <div className="glass rounded-2xl overflow-hidden border border-white/5">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-800/40 text-xs uppercase text-gray-400 border-b border-white/5">
                            <th className="px-6 py-4 font-semibold">Key</th>
                            <th className="px-6 py-4 font-semibold">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-sm">
                        <ShortcutRow keys={['DELETE']} action="Get AI Answer" isSpecial={true} />
                        <ShortcutRow keys={['CapsLock']} action="Text input mode" />
                        <ShortcutRow keys={['Alt (2x)']} action="Screenshot mode" />
                        <ShortcutRow keys={['ESC']} action="Clear question / Reset" />
                        <ShortcutRow keys={['Ctrl', '+', 'Space']} action="Hide/Show window" />
                        <ShortcutRow keys={['Ctrl', '+', 'MOVE_ICON']} action="Move window position" />
                    </tbody>
                </table>
            </div>
        </div>
    )
}

function ShortcutRow({ keys, action, isSpecial }) {
    return (
        <tr className="hover:bg-white/5 transition-colors group cursor-default">
            <td className="px-6 py-4">
                {keys.map((k, i) => {
                    if (k === '+') return <span key={i} className="mx-1 text-gray-500">+</span>;
                    if (k === 'MOVE_ICON') return <Move key={i} className="inline w-4 h-4 text-gray-400" />;
                    return (
                        <kbd key={i} className={`kbd-key ${isSpecial ? 'bg-blue-500/20 text-blue-300 border-blue-500/30 group-hover:bg-blue-500 group-hover:text-white' : 'bg-gray-800 text-gray-300 border-gray-600 group-hover:border-gray-500'} px-3 py-1.5 rounded-lg border font-mono text-xs font-bold inline-block min-w-[60px] text-center transition-colors`}>
                            {k}
                        </kbd>
                    );
                })}
            </td>
            <td className={`px-6 py-4 text-gray-300 ${isSpecial ? 'font-medium' : ''}`}>{action}</td>
        </tr>
    );
}
