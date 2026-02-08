import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Mic, Zap, Shield, Brain } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

const interviewQuestions = [
  {
    question: "Tell me about yourself and your experience.",
    answer: "I'm a passionate software developer with 3 years of experience in building web applications. I specialize in React and Node.js, and have successfully delivered multiple projects for clients across various industries."
  },
  {
    question: "What is closure in JavaScript?",
    answer: "A closure is a function that has access to variables from its outer scope, even after the outer function has returned. It's a fundamental concept in JavaScript that enables data privacy and functional programming patterns."
  },
  {
    question: "Describe your biggest achievement.",
    answer: "My biggest achievement was leading a team of 5 developers to successfully deliver a complex e-commerce platform that handles over 10,000 daily transactions. We completed it 2 weeks ahead of schedule."
  },
  {
    question: "How do you handle tight deadlines?",
    answer: "I prioritize tasks based on impact, break them into smaller manageable chunks, and maintain clear communication with stakeholders. I also ensure code quality isn't compromised by following best practices."
  }
];

const floatingIcons = [
  { Icon: Zap, color: 'text-yellow-500', delay: 0 },
  { Icon: Shield, color: 'text-blue-500', delay: 0.5 },
  { Icon: Brain, color: 'text-purple-500', delay: 1 },
];

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedQuestion, setDisplayedQuestion] = useState('');
  const [displayedAnswer, setDisplayedAnswer] = useState('');
  const [isTypingQuestion, setIsTypingQuestion] = useState(true);
  const [isTypingAnswer, setIsTypingAnswer] = useState(false);
  const questionTimeoutRef = useRef(null);
  const answerTimeoutRef = useRef(null);
  const cycleTimeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (questionTimeoutRef.current) clearTimeout(questionTimeoutRef.current);
      if (answerTimeoutRef.current) clearTimeout(answerTimeoutRef.current);
      if (cycleTimeoutRef.current) clearTimeout(cycleTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    const currentQuestion = interviewQuestions[currentIndex].question;
    const currentAnswer = interviewQuestions[currentIndex].answer;
    
    setDisplayedQuestion('');
    setDisplayedAnswer('');
    setIsTypingQuestion(true);
    setIsTypingAnswer(false);

    let questionIndex = 0;
    const typeQuestion = () => {
      if (questionIndex < currentQuestion.length) {
        setDisplayedQuestion(currentQuestion.slice(0, questionIndex + 1));
        questionIndex++;
        questionTimeoutRef.current = setTimeout(typeQuestion, 30);
      } else {
        setIsTypingQuestion(false);
        questionTimeoutRef.current = setTimeout(() => {
          setIsTypingAnswer(true);
          
          let answerIndex = 0;
          const typeAnswer = () => {
            if (answerIndex < currentAnswer.length) {
              setDisplayedAnswer(currentAnswer.slice(0, answerIndex + 1));
              answerIndex++;
              answerTimeoutRef.current = setTimeout(typeAnswer, 20);
            } else {
              setIsTypingAnswer(false);
              cycleTimeoutRef.current = setTimeout(() => {
                setCurrentIndex((prev) => (prev + 1) % interviewQuestions.length);
              }, 3000);
            }
          };
          typeAnswer();
        }, 500);
      }
    };
    
    typeQuestion();
  }, [currentIndex]);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 pt-24 pb-16 overflow-hidden">
      {/* Animated mesh gradient background */}
      <div className="absolute inset-0 mesh-gradient opacity-30"></div>
      
      {/* Floating animated orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 100, 0],
            y: [0, -100, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -100, 0],
            y: [0, 100, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-pink-400 to-orange-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Text content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary-100 to-purple-100 text-primary-700 px-6 py-3 rounded-full mb-8 backdrop-blur-sm border border-white/20 shadow-lg"
            >
              <Sparkles className="h-5 w-5 animate-pulse" />
              <span className="text-sm font-bold tracking-wide">AI-Powered Interview Assistant</span>
            </motion.div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 mb-6 leading-tight">
              Ace Every
              <span className="block gradient-text animate-pulse">Interview</span>
              <span className="block">With AI Power</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-10 leading-relaxed">
              Real-time AI assistance that's <span className="font-bold text-primary-600">100% invisible</span>. 
              Get perfect answers in <span className="font-bold text-purple-600">less than 1 second</span>.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link to="/signup" className="btn-primary group inline-flex items-center justify-center space-x-2 text-lg">
                <span>Start Free Trial</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a href="#how-it-works" className="btn-secondary inline-flex items-center justify-center text-lg group">
                <Mic className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
                <span>See How It Works</span>
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              {[
                { value: '<1s', label: 'Response Time' },
                { value: '100%', label: 'Invisible' },
                { value: '12+', label: 'Tech Stacks' }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl font-black gradient-text">{stat.value}</div>
                  <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right side - Animated mockup */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative px-8 lg:px-0"
          >
            {/* Floating icons - Adjusted positioning */}
            {floatingIcons.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 + item.delay, duration: 0.5 }}
                className="absolute z-10 hidden sm:block"
                style={{
                  top: `${20 + index * 25}%`,
                  left: index % 2 === 0 ? '-8%' : 'auto',
                  right: index % 2 === 1 ? '0%' : 'auto',
                }}
              >
                <motion.div
                  animate={{ y: [0, -20, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: item.delay }}
                  className={`${item.color} bg-white/90 backdrop-blur-xl p-3 sm:p-4 rounded-2xl shadow-2xl border border-white/20`}
                >
                  <item.Icon className="h-6 w-6 sm:h-8 sm:w-8" />
                </motion.div>
              </motion.div>
            ))}

            {/* Main mockup */}
            <div className="relative glass-card p-4 animate-float">
              {/* Browser header */}
              <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-t-2xl p-4 flex items-center space-x-2">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                </div>
                <div className="flex-1 text-center">
                  <span className="text-gray-400 text-sm font-bold tracking-wider">INSTANT INTERVIEW AI</span>
                </div>
              </div>

              {/* Content */}
              <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-b-2xl p-8 min-h-[450px] flex flex-col justify-between relative overflow-hidden">
                {/* Animated background pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse"></div>
                </div>

                <div className="space-y-6 relative z-10">
                  {/* Question */}
                  <motion.div
                    key={`q-${currentIndex}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-dark rounded-2xl p-6 border-l-4 border-blue-500"
                  >
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-2 rounded-xl animate-pulse-glow">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <span className="text-blue-400 font-bold text-sm uppercase tracking-wider">Question</span>
                    </div>
                    <p className="text-white text-lg font-medium leading-relaxed min-h-[28px]">
                      {displayedQuestion}
                      {isTypingQuestion && <span className="animate-pulse text-blue-400">|</span>}
                    </p>
                  </motion.div>

                  {/* Answer */}
                  <motion.div
                    key={`a-${currentIndex}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="glass-dark rounded-2xl p-6 border-l-4 border-green-500"
                  >
                    <div className="flex items-center space-x-3 mb-3">
                      <div className={`bg-gradient-to-r from-green-500 to-emerald-500 p-2 rounded-xl ${isTypingAnswer ? 'animate-pulse-glow' : ''}`}>
                        <Mic className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-green-400 font-bold text-sm uppercase tracking-wider">Your Answer</span>
                    </div>
                    <p className="text-gray-300 text-base leading-relaxed min-h-[100px]">
                      {displayedAnswer}
                      {isTypingAnswer && <span className="animate-pulse text-green-400">|</span>}
                    </p>
                    
                    {isTypingAnswer && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-4 flex items-center space-x-2 text-sm text-gray-400"
                      >
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                        <span className="font-medium">AI generating response...</span>
                      </motion.div>
                    )}
                  </motion.div>
                </div>

                {/* Progress */}
                <div className="flex justify-center space-x-2 relative z-10">
                  {interviewQuestions.map((_, index) => (
                    <motion.div
                      key={index}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className={`h-2 rounded-full transition-all duration-500 ${
                        index === currentIndex 
                          ? 'w-12 bg-gradient-to-r from-primary-500 to-purple-500' 
                          : 'w-2 bg-gray-600'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
