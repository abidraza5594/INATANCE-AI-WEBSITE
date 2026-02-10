import { Download, Play, Zap, CheckCircle, ArrowRight } from 'lucide-react';
import { memo } from 'react';

const steps = [
  {
    icon: Download,
    number: '1',
    title: 'Download & Install',
    description: 'Download the Windows app, create your account, and get 1 FREE interview (2 hours) instantly.',
    color: 'from-blue-500 to-blue-600',
    features: ['One-click installation', 'Email signup', '1 free interview', 'Instant activation']
  },
  {
    icon: Play,
    number: '2',
    title: 'Start Your Interview',
    description: 'Launch the app before your interview. It runs invisibly in the background.',
    color: 'from-purple-500 to-purple-600',
    features: ['100% invisible', 'Auto-detects questions', 'Works with any platform', 'Stealth mode enabled']
  },
  {
    icon: Zap,
    number: '3',
    title: 'Get Instant Answers',
    description: 'Press SPACE or DELETE when interviewer asks. AI generates perfect answer in <1 second.',
    color: 'from-orange-500 to-orange-600',
    features: ['<1s response time', 'Natural answers', 'Code examples', 'Conversation memory']
  },
  {
    icon: CheckCircle,
    number: '4',
    title: 'Ace Your Interview',
    description: 'Read the answer naturally and confidently. Switch between modes as needed.',
    color: 'from-green-500 to-green-600',
    features: ['3 input modes', '12+ tech stacks', 'Resume-based answers', 'Complete control']
  }
];

const inputModes = [
  {
    mode: 'Voice Mode',
    trigger: 'Caps Lock OFF',
    icon: '🎤',
    description: 'Automatically listens to interviewer via system audio',
    howTo: 'Interviewer asks → Press SPACE/DELETE → Get answer',
    bestFor: 'Normal interview questions',
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    mode: 'Text Input Mode',
    trigger: 'Caps Lock ON',
    icon: '⌨️',
    description: 'Type questions manually for specific queries',
    howTo: 'Type question → Press ENTER → Get answer',
    bestFor: 'Unclear audio or specific follow-ups',
    gradient: 'from-purple-500 to-pink-500'
  },
  {
    mode: 'Screenshot Mode',
    trigger: 'Alt × 2',
    icon: '📸',
    description: 'Capture and analyze code, diagrams, or errors',
    howTo: 'Alt → Resize box → Alt → Type question → ENTER',
    bestFor: 'Coding questions and visual problems',
    gradient: 'from-orange-500 to-red-500'
  }
];

// Memoized step card
const StepCard = memo(({ step, index }) => (
  <div className="relative h-full">
    <div className="glass-card h-full hover:shadow-2xl transition-shadow duration-300 border border-gray-100">
      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-6 mx-auto shadow-lg`}>
        <step.icon className="h-8 w-8 text-white" />
      </div>

      <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">{step.title}</h3>
      <p className="text-gray-600 mb-6 text-sm leading-relaxed text-center font-medium">{step.description}</p>

      <ul className="space-y-3">
        {step.features.map((feature, fIndex) => (
          <li key={fIndex} className="flex items-center text-sm text-gray-600 bg-gray-50 rounded-lg p-2">
            <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
            {feature}
          </li>
        ))}
      </ul>
    </div>

    {/* Arrow */}
    {index < steps.length - 1 && (
      <div className="hidden lg:flex absolute top-1/2 -right-4 transform -translate-y-1/2 z-20 items-center justify-center text-gray-300">
        <ArrowRight className="w-8 h-8 opacity-40" />
      </div>
    )}
  </div>
));

StepCard.displayName = 'StepCard';

// Memoized input mode card
const InputModeCard = memo(({ mode, index }) => (
  <div className="relative group h-full">
    <div className="glass-card h-full hover:shadow-2xl transition-shadow duration-300 border border-gray-100 overflow-hidden">
      <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${mode.gradient}`}></div>

      <div className="relative z-10 pt-4">
        <div className="text-center mb-8">
          <div className="text-7xl mb-6 transform group-hover:scale-110 transition-transform duration-300 drop-shadow-lg">{mode.icon}</div>
          <h4 className="text-2xl font-black text-gray-900 mb-3">{mode.mode}</h4>
          <div className={`inline-block bg-gradient-to-r ${mode.gradient} text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-md`}>
            {mode.trigger}
          </div>
        </div>

        <p className="text-gray-600 mb-8 text-center text-lg leading-relaxed">{mode.description}</p>

        <div className="bg-gray-50 rounded-xl p-5 mb-6 border border-gray-100">
          <p className="text-sm font-bold text-gray-700 text-center">{mode.howTo}</p>
        </div>

        <div className="flex items-center justify-center text-sm font-semibold text-green-700 bg-green-50 rounded-xl p-3 border border-green-100">
          <span>Best for: {mode.bestFor}</span>
        </div>
      </div>
    </div>
  </div>
));

InputModeCard.displayName = 'InputModeCard';

export default function HowItWorks() {
  return (
    <div id="how-it-works" className="py-24 relative overflow-hidden bg-slate-50">
      {/* Simplified background */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-b from-purple-50 to-transparent opacity-60"></div>
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-t from-blue-50 to-transparent opacity-60"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* Main Steps */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center space-x-2 bg-white border border-gray-200 text-primary-700 px-6 py-2 rounded-full mb-6 shadow-sm">
            <Zap className="h-4 w-4" />
            <span className="text-sm font-bold tracking-wide uppercase">Simple 4-Step Process</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6 tracking-tight">
            How It Works
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Get started in minutes and ace your next interview with AI assistance
          </p>
        </div>

        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
            {steps.map((step, index) => (
              <StepCard key={index} step={step} index={index} />
            ))}
          </div>
        </div>

        {/* Input Modes Section */}
        <div className="mt-20">
          <div className="text-center mb-16">
            <h3 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight">
              3 Powerful Input Modes
            </h3>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Switch between modes instantly based on your interview situation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {inputModes.map((mode, index) => (
              <InputModeCard key={index} mode={mode} index={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
