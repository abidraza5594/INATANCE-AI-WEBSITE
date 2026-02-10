import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Mic, Zap, Shield, Brain } from 'lucide-react';
import { useState, useEffect, useRef, memo } from 'react';

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

// Memoized floating icon component
const FloatingIcon = memo(({ Icon, color, index, delay }) => (
  <div
    className="absolute z-10 hidden lg:block animate-float"
    style={{
      top: `${20 + index * 25}%`,
      left: index % 2 === 0 ? '-10%' : 'auto',
      right: index % 2 === 1 ? '-5%' : 'auto',
      animationDelay: `${delay}s`
    }}
  >
    <div className={`${color} bg-white rounded-2xl shadow-2xl p-4 border border-gray-100`}>
      <Icon className="h-8 w-8" />
    </div>
  </div>
));

FloatingIcon.displayName = 'FloatingIcon';

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
    <div className="relative min-h-screen bg-slate-50 pt-28 pb-20 lg:pt-36 lg:pb-32 overflow-hidden">
      {/* Simplified gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 opacity-60"></div>

      {/* Simplified floating orbs - CSS only */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 lg:left-20 w-72 h-72 lg:w-96 lg:h-96 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute bottom-20 right-10 lg:right-20 w-72 h-72 lg:w-96 lg:h-96 bg-gradient-to-r from-pink-400 to-orange-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Text content */}
          <div className="text-center lg:text-left max-w-2xl mx-auto lg:mx-0">
            {/* FREE OFFER BADGE */}
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-full mb-6 shadow-2xl border-2 border-white animate-pulse">
              <span className="text-2xl">🎁</span>
              <span className="text-base font-black tracking-wide">2 HOURS FREE</span>
            </div>

            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary-100 to-purple-100 text-primary-700 px-6 py-3 rounded-full mb-8 border border-white shadow-lg">
              <Sparkles className="h-5 w-5 animate-pulse" />
              <span className="text-sm font-bold tracking-wide">AI-Powered Interview Assistant</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-gray-900 mb-6 leading-tight tracking-tight">
              Ace Every
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-600 via-purple-600 to-pink-600 pb-2">Interview</span>
              <span className="block">With AI Power</span>
            </h1>

            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed px-4 lg:px-0">
              Real-time AI assistance that's <span className="font-bold text-primary-600">100% invisible</span>.
              Get perfect answers in <span className="font-bold text-purple-600">less than 1 second</span>.
            </p>

            {/* FREE OFFER HIGHLIGHT BOX */}
            <div className="bg-white border border-green-200 rounded-2xl p-6 mb-10 shadow-xl max-w-lg mx-auto lg:mx-0 text-left">
              <div className="flex items-center space-x-3 mb-3">
                <span className="text-3xl">🆓</span>
                <h3 className="text-2xl font-black text-gray-900">Get Started FREE!</h3>
              </div>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center space-x-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span className="font-semibold">2 Hours Free Time (Worth ₹300)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span className="font-semibold">Complete 1 Full Interview</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span className="font-semibold">All Features Unlocked</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span className="font-semibold">No Credit Card Required</span>
                </li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-14 justify-center lg:justify-start px-4 sm:px-0">
              <Link to="/signup" className="btn-primary group inline-flex items-center justify-center space-x-1.5 text-sm px-4 py-2.5 sm:w-auto whitespace-nowrap">
                <span>Start Free Trial</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/download" className="inline-flex items-center justify-center space-x-1.5 px-4 py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg hover:from-green-600 hover:to-emerald-700 transition-colors duration-200 shadow-lg text-sm sm:w-auto whitespace-nowrap">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span>Download App</span>
              </Link>
              <a href="#how-it-works" className="btn-secondary inline-flex items-center justify-center text-sm group px-6 py-3.5 sm:w-auto whitespace-nowrap space-x-2">
                <Mic className="h-4 w-4 group-hover:scale-110 transition-transform" />
                <span>See How It Works</span>
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 max-w-lg mx-auto lg:mx-0 border-t border-gray-200 pt-8 lg:border-none lg:pt-0">
              {[
                { value: '<1s', label: 'Response Time' },
                { value: '100%', label: 'Invisible' },
                { value: '12+', label: 'Tech Stacks' }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-black gradient-text">{stat.value}</div>
                  <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right side - Optimized mockup */}
          <div className="relative px-2 sm:px-4 lg:px-0">
            <div className="relative">
              {/* Floating icons */}
              {floatingIcons.map((item, index) => (
                <FloatingIcon
                  key={index}
                  Icon={item.Icon}
                  color={item.color}
                  index={index}
                  delay={item.delay}
                />
              ))}

              {/* Main mockup */}
              <div className="relative glass-card p-2 sm:p-4">
                {/* Browser header */}
                <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-t-2xl p-3 sm:p-4 flex items-center space-x-2">
                  <div className="flex space-x-1.5 sm:space-x-2">
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500"></div>
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="flex-1 text-center">
                    <span className="text-gray-400 text-xs sm:text-sm font-bold tracking-widest opacity-50">INTERVIEW.AI</span>
                  </div>
                </div>

                {/* Content */}
                <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-b-2xl p-4 sm:p-6 lg:p-8 min-h-[450px] flex flex-col justify-between relative overflow-hidden">
                  <div className="space-y-4 sm:space-y-6 relative z-10">
                    {/* Question */}
                    <div className="glass-dark rounded-xl sm:rounded-2xl p-4 sm:p-6 border-l-4 border-blue-500">
                      <div className="flex items-center space-x-2 sm:space-x-3 mb-2 sm:mb-3">
                        <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-1.5 sm:p-2 rounded-lg sm:rounded-xl">
                          <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <span className="text-blue-400 font-bold text-xs sm:text-sm uppercase tracking-wider">Question</span>
                      </div>
                      <p className="text-white text-sm sm:text-base lg:text-lg font-medium leading-relaxed min-h-[28px]">
                        {displayedQuestion}
                        {isTypingQuestion && <span className="animate-pulse text-blue-400">|</span>}
                      </p>
                    </div>

                    {/* Answer */}
                    <div className="glass-dark rounded-xl sm:rounded-2xl p-4 sm:p-6 border-l-4 border-green-500">
                      <div className="flex items-center space-x-2 sm:space-x-3 mb-2 sm:mb-3">
                        <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-1.5 sm:p-2 rounded-lg sm:rounded-xl">
                          <Mic className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                        </div>
                        <span className="text-green-400 font-bold text-xs sm:text-sm uppercase tracking-wider">Your Answer</span>
                      </div>
                      <p className="text-gray-300 text-sm sm:text-base leading-relaxed min-h-[100px]">
                        {displayedAnswer}
                        {isTypingAnswer && <span className="animate-pulse text-green-400">|</span>}
                      </p>

                      {isTypingAnswer && (
                        <div className="mt-4 flex items-center space-x-2 text-sm text-gray-400">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                          <span className="font-medium">AI generating response...</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Progress */}
                  <div className="flex justify-center space-x-2 relative z-10">
                    {interviewQuestions.map((_, index) => (
                      <div
                        key={index}
                        className={`h-2 rounded-full transition-all duration-500 ${index === currentIndex
                          ? 'w-12 bg-gradient-to-r from-primary-500 to-purple-500'
                          : 'w-2 bg-gray-600'
                          }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
