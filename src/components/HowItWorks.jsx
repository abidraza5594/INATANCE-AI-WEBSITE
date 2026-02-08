import { motion } from 'framer-motion';
import { Download, Play, Zap, CheckCircle, ArrowRight } from 'lucide-react';

const steps = [
  {
    icon: Download,
    number: '1',
    title: 'Download & Install',
    description: 'Download the Windows app, create your account, and get 10 minutes free trial instantly.',
    color: 'from-blue-500 to-blue-600',
    features: ['One-click installation', 'Email signup', '10 min free trial', 'Instant activation']
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

export default function HowItWorks() {
  return (
    <div id="how-it-works" className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Steps */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center space-x-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full mb-4">
              <Zap className="h-4 w-4" />
              <span className="text-sm font-semibold">Simple 4-Step Process</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get started in minutes and ace your next interview with AI assistance
            </p>
          </motion.div>
        </div>

        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group"
                >
                  <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 h-full">
                    {/* Icon */}
                    <div className={`w-16 h-16 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform`}>
                      <step.icon className="h-8 w-8 text-white" />
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">{step.title}</h3>
                    <p className="text-gray-600 mb-4 text-sm leading-relaxed text-center">{step.description}</p>
                    
                    <ul className="space-y-2">
                      {step.features.map((feature, fIndex) => (
                        <li key={fIndex} className="flex items-start text-sm text-gray-700">
                          <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
                
                {/* Arrow - Between cards in the gap */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:flex absolute top-1/2 -right-6 transform -translate-y-1/2 z-20 items-center justify-center">
                    <div className="bg-white rounded-full p-2 shadow-md">
                      <ArrowRight className="w-6 h-6 text-primary-500" strokeWidth={3} />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Input Modes Section */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                3 Powerful Input Modes
              </h3>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Switch between modes instantly based on your interview situation
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {inputModes.map((mode, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="relative group"
              >
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 h-full">
                  {/* Gradient Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${mode.gradient} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity`}></div>
                  
                  <div className="relative z-10">
                    <div className="text-center mb-6">
                      <div className="text-6xl mb-4">{mode.icon}</div>
                      <h4 className="text-2xl font-bold text-gray-900 mb-2">{mode.mode}</h4>
                      <div className={`inline-block bg-gradient-to-r ${mode.gradient} text-white px-4 py-2 rounded-full text-sm font-semibold shadow-md`}>
                        {mode.trigger}
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-6 text-center leading-relaxed">{mode.description}</p>
                    
                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 mb-4">
                      <p className="text-sm font-mono text-gray-800 text-center leading-relaxed">{mode.howTo}</p>
                    </div>
                    
                    <div className="flex items-center justify-center text-sm text-gray-600 bg-green-50 rounded-lg p-3">
                      <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="font-medium">Best for: {mode.bestFor}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
