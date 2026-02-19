import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, X, AlertTriangle, Info, MousePointer2 } from 'lucide-react';

const DOWNLOAD_URL = 'https://github.com/abidraza5594/INATANCE-AI-WEBSITE/releases/download/v1.0.0/InstantInterview.exe';
const FILE_NAME = 'InstantInterview.exe';

export default function DownloadModal({ isOpen, onClose }) {
    const [progress, setProgress] = useState(0);
    const [totalSize, setTotalSize] = useState(0);
    const [downloadedSize, setDownloadedSize] = useState(0);
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        if (isOpen) {
            startDownload();
        } else {
            setProgress(0);
            setDownloadedSize(0);
            setIsComplete(false);
        }
    }, [isOpen]);

    const startDownload = async () => {
        // Direct download with realistic progress simulation
        const a = document.createElement('a');
        a.href = DOWNLOAD_URL;
        a.download = FILE_NAME;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        
        // Simulate realistic download progress (140MB file - typical desktop app size)
        const fileSize = 140000000; // ~140MB
        setTotalSize(fileSize);
        
        // Simulate download with varying speeds (faster at start, slower in middle)
        const simulateProgress = async () => {
            const steps = [
                { progress: 5, delay: 200 },
                { progress: 10, delay: 250 },
                { progress: 15, delay: 300 },
                { progress: 20, delay: 300 },
                { progress: 25, delay: 350 },
                { progress: 30, delay: 350 },
                { progress: 35, delay: 400 },
                { progress: 40, delay: 400 },
                { progress: 45, delay: 450 },
                { progress: 50, delay: 450 },
                { progress: 55, delay: 400 },
                { progress: 60, delay: 400 },
                { progress: 65, delay: 350 },
                { progress: 70, delay: 350 },
                { progress: 75, delay: 300 },
                { progress: 80, delay: 300 },
                { progress: 85, delay: 250 },
                { progress: 90, delay: 250 },
                { progress: 95, delay: 200 },
                { progress: 100, delay: 200 }
            ];
            
            for (const step of steps) {
                await new Promise(resolve => setTimeout(resolve, step.delay));
                setProgress(step.progress);
                setDownloadedSize(Math.round((step.progress / 100) * fileSize));
            }
            
            setIsComplete(true);
        };
        
        simulateProgress();
    };

    const formatBytes = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const dm = 1;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 min-h-screen">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-[#05080f]/90 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="relative w-full max-w-xs bg-[#0a0f1a] border border-white/10 rounded-lg shadow-2xl z-10"
                    >
                        {/* Header */}
                        <div className="border-b border-white/5 bg-white/[0.02] p-2">
                            <div className="flex justify-between items-center mb-1">
                                <div className="flex items-center gap-1.5">
                                    <div className="w-6 h-6 rounded-md bg-blue-600/20 flex items-center justify-center">
                                        <Download className="w-3 h-3 text-blue-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-[11px] font-bold text-white leading-none">
                                            {isComplete ? 'Complete!' : progress > 0 ? 'Downloading' : 'Starting'}
                                        </h3>
                                        <p className="text-[8px] text-slate-400 font-mono mt-0.5">
                                            {downloadedSize > 0 ? `${formatBytes(downloadedSize)} / ${formatBytes(totalSize)}` : 'Init...'}
                                        </p>
                                    </div>
                                </div>
                                <button onClick={onClose} className="p-1 hover:bg-white/5 rounded text-slate-500 hover:text-white">
                                    <X size={14} />
                                </button>
                            </div>
                            
                            <div className="flex justify-between items-center mb-0.5">
                                <span className="text-[8px] text-slate-500">Progress</span>
                                <span className="text-[10px] font-bold text-blue-400">{progress}%</span>
                            </div>
                            <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progress}%` }}
                                    className="h-full bg-gradient-to-r from-blue-600 to-emerald-400"
                                />
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-2">
                            <div className="mb-2">
                                <div className="flex items-center gap-1 text-[8px] font-bold uppercase text-emerald-400 bg-emerald-400/5 py-0.5 px-1.5 rounded-full border border-emerald-400/20 w-fit mb-1">
                                    <AlertTriangle size={9} />
                                    Guide
                                </div>
                                <p className="text-[9px] text-slate-300">Follow these steps:</p>
                            </div>

                            {/* Simulation */}
                            <div className="relative bg-[#05080f] rounded-md border border-white/5 py-4 mb-2 flex items-center justify-center">
                                <div className="relative w-[180px]">
                                    <div className="bg-[#1e2a45] border-2 border-white/20 rounded-md shadow-xl">
                                        <div className="bg-[#2a3654] px-1.5 py-0.5 border-b border-white/10 flex items-center gap-1">
                                            <div className="w-1.5 h-1.5 bg-blue-400 rounded-sm" />
                                            <span className="text-[7px] font-bold text-slate-300">Windows Security</span>
                                        </div>
                                        
                                        <div className="p-1.5">
                                            <h4 className="text-[8px] font-bold text-white mb-0.5">Windows protected your PC</h4>
                                            <p className="text-[7px] text-slate-400 mb-1.5 leading-tight">
                                                Microsoft Defender prevented an unrecognized app.
                                            </p>

                                            <div className="space-y-1">
                                                <div className="relative inline-block">
                                                    <div className="text-[7px] text-blue-400 font-semibold underline">More info</div>
                                                    <motion.div
                                                        className="absolute -inset-0.5 bg-blue-400/10 border border-blue-400/40 rounded pointer-events-none"
                                                        animate={{ opacity: [0, 0.6, 0] }}
                                                        transition={{ duration: 1, repeat: Infinity, repeatDelay: 5, delay: 1.5 }}
                                                    />
                                                </div>

                                                <div className="flex justify-end gap-1">
                                                    <button className="px-1.5 py-1 bg-white/5 border border-white/10 rounded text-[6px] font-semibold text-slate-400 uppercase w-[52px]">
                                                        Don't run
                                                    </button>
                                                    <div className="relative">
                                                        <button className="px-1.5 py-1 bg-blue-600 rounded text-[6px] font-semibold text-white uppercase w-[52px]">
                                                            Run anyway
                                                        </button>
                                                        <motion.div
                                                            className="absolute inset-0 border border-white/60 rounded pointer-events-none"
                                                            animate={{ opacity: [0, 1, 0] }}
                                                            transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 5.5, delay: 4.2 }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Cursor */}
                                    <motion.div
                                        className="absolute pointer-events-none z-50"
                                        style={{ 
                                            top: '50%',
                                            left: '50%',
                                            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.9))'
                                        }}
                                        animate={{
                                            x: [45, -65, -65, 25, 25, 45],
                                            y: [-20, 12, 12, 32, 32, -20],
                                        }}
                                        transition={{
                                            duration: 6,
                                            repeat: Infinity,
                                            ease: "easeInOut",
                                            times: [0, 0.25, 0.4, 0.7, 0.85, 1]
                                        }}
                                    >
                                        <MousePointer2 className="w-4 h-4 fill-white stroke-black stroke-[1.5]" />
                                        
                                        <motion.div
                                            className="absolute top-1/2 left-1/2 w-6 h-6 border-2 border-blue-400 rounded-full -translate-x-1/2 -translate-y-1/2"
                                            animate={{ scale: [0, 2, 0], opacity: [0, 0.8, 0] }}
                                            transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 5.4, delay: 1.5 }}
                                        />
                                        
                                        <motion.div
                                            className="absolute top-1/2 left-1/2 w-6 h-6 border-2 border-white rounded-full -translate-x-1/2 -translate-y-1/2"
                                            animate={{ scale: [0, 2, 0], opacity: [0, 0.8, 0] }}
                                            transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 5.4, delay: 4.2 }}
                                        />
                                    </motion.div>
                                </div>
                            </div>

                            {/* Steps */}
                            <div className="grid grid-cols-2 gap-1.5 mb-1.5">
                                <div className="p-1.5 rounded-md bg-white/[0.03] border border-white/5">
                                    <div className="flex items-center gap-1 mb-0.5">
                                        <div className="w-3 h-3 rounded bg-blue-500/20 flex items-center justify-center text-[7px] font-bold text-blue-400">1</div>
                                        <span className="text-[7px] font-bold text-slate-400">STEP 01</span>
                                    </div>
                                    <p className="text-[8px] text-slate-300">Click <span className="text-white font-semibold">More info</span></p>
                                </div>
                                <div className="p-1.5 rounded-md bg-white/[0.03] border border-white/5">
                                    <div className="flex items-center gap-1 mb-0.5">
                                        <div className="w-3 h-3 rounded bg-emerald-500/20 flex items-center justify-center text-[7px] font-bold text-emerald-400">2</div>
                                        <span className="text-[7px] font-bold text-slate-400">STEP 02</span>
                                    </div>
                                    <p className="text-[8px] text-slate-300">Click <span className="text-white font-semibold">Run anyway</span></p>
                                </div>
                            </div>

                            <div className="flex items-start gap-1 opacity-60">
                                <Info size={9} className="text-blue-400 mt-0.5 shrink-0" />
                                <p className="text-[7px] text-slate-400 leading-tight">
                                    This warning appears because our app isn't digitally signed yet. It's safe to install - just click "More info" then "Run anyway".
                                </p>
                            </div>
                        </div>

                        <div className="h-0.5 bg-gradient-to-r from-blue-600 via-emerald-500 to-blue-600" />
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
