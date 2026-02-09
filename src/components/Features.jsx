import { motion } from 'framer-motion';
import { Mic, BarChart3, Clock, Zap, FileText, Camera, Layers, Eye, Keyboard } from 'lucide-react';

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

export default function Features() {
  return (
    <div id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Powerful features designed to help you ace your next interview
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="card hover:scale-105 transition-transform duration-300"
            >
              <div className="bg-primary-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
