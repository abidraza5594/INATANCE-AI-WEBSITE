import { Mic, BarChart3, Clock, Zap, FileText, Camera, Layers, Eye, Keyboard } from 'lucide-react';
import { memo } from 'react';

const features = [
  {
    icon: Mic,
    title: 'Real-Time Voice Recognition',
    description: 'Dual engine voice detection with Mistral Voxtral & Google Speech. Captures audio from any source - Bluetooth, speakers, or headphones.'
  },
  {
    icon: Eye,
    title: '100% Stealth Mode',
    description: 'Completely invisible in screen recordings, hidden from taskbar, transparent background. Undetectable during interviews.'
  },
  {
    icon: FileText,
    title: 'Resume Upload',
    description: 'Upload your resume (PDF/DOCX/TXT) and AI uses YOUR actual experience, skills, and projects for personalized answers.'
  },
  {
    icon: Keyboard,
    title: '3 Input Modes',
    description: 'Voice Mode (Caps Lock OFF), Text Input Mode (Caps Lock ON), and Screenshot Mode (Alt key). Complete keyboard control.'
  },
  {
    icon: Camera,
    title: 'Screenshot Analysis',
    description: 'Press Alt twice to capture screen. AI analyzes code, diagrams, and errors with Vision models. Perfect for coding questions.'
  },
  {
    icon: Layers,
    title: '12+ Tech Stacks',
    description: 'JavaScript, React, Angular, Vue, Node.js, TypeScript, Python, HTML/CSS, Next.js, Express, Full-Stack, QA Tester. Switch instantly.'
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Less than 1 second response time. Instant transcription and answer generation. Background threading for smooth UI.'
  },
  {
    icon: BarChart3,
    title: 'Smart Answer Format',
    description: 'Theory explanation (8-10 sentences) followed by code examples. Natural, professional answers with conversation memory.'
  },
  {
    icon: Clock,
    title: 'Flexible Time System',
    description: 'Pay per interview - 2 hours each. First time ₹300, regular ₹500. Get 1 FREE interview (2 hours) to test all features!'
  }
];

// Memoized feature card
const FeatureCard = memo(({ feature, index }) => (
  <div className="glass-card hover:shadow-2xl hover:bg-white transition-shadow duration-300 group">
    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-inner">
      <feature.icon className="h-7 w-7 text-primary-600" />
    </div>
    <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">{feature.title}</h3>
    <p className="text-gray-600 leading-relaxed text-lg">{feature.description}</p>
  </div>
));

FeatureCard.displayName = 'FeatureCard';

export default function Features() {
  return (
    <div id="features" className="py-24 relative overflow-hidden bg-slate-50">
      {/* Simplified gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 opacity-60"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6 tracking-tight">
            Power <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-purple-600">Unleashed</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Every tool you need to dominate your interview, packed into one invisible assistant.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
