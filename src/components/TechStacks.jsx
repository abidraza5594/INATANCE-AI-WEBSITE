import { motion } from 'framer-motion';
import { Code2 } from 'lucide-react';

const techStacks = [
  { name: 'JavaScript', icon: '🟡', color: 'from-yellow-400 to-yellow-600', description: 'ES6+, DOM, Async/Await' },
  { name: 'React', icon: '⚛️', color: 'from-blue-400 to-blue-600', description: 'Hooks, Components, State' },
  { name: 'Angular', icon: '🔴', color: 'from-red-400 to-red-600', description: 'TypeScript, Services, RxJS' },
  { name: 'Vue.js', icon: '🟢', color: 'from-green-400 to-green-600', description: 'Composition API, Vuex' },
  { name: 'Node.js', icon: '🟩', color: 'from-green-500 to-green-700', description: 'Express, REST APIs, MongoDB' },
  { name: 'TypeScript', icon: '🔵', color: 'from-blue-500 to-blue-700', description: 'Types, Interfaces, Generics' },
  { name: 'Python', icon: '🐍', color: 'from-blue-600 to-yellow-500', description: 'Django, Flask, Data Science' },
  { name: 'HTML/CSS', icon: '🟠', color: 'from-orange-400 to-orange-600', description: 'Flexbox, Grid, Responsive' },
  { name: 'Next.js', icon: '⬛', color: 'from-gray-700 to-gray-900', description: 'SSR, SSG, App Router' },
  { name: 'Express.js', icon: '⚫', color: 'from-gray-600 to-gray-800', description: 'Middleware, Routing, APIs' },
  { name: 'Full-Stack', icon: '🌐', color: 'from-purple-500 to-pink-600', description: 'MERN/MEAN, Frontend+Backend' },
  { name: 'QA Tester', icon: '🧪', color: 'from-teal-400 to-teal-600', description: 'Selenium, Cypress, Testing' }
];

export default function TechStacks() {
  return (
    <div id="tech-stacks" className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
              <Code2 className="h-4 w-4" />
              <span className="text-sm font-semibold">12+ Technologies Supported</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Every Tech Stack Covered
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Switch between technology profiles instantly with Caps Lock double-tap. AI answers from that technology's perspective.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
          {techStacks.map((tech, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="relative group"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-white/40 transition-all">
                <div className={`absolute inset-0 bg-gradient-to-br ${tech.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity`}></div>
                <div className="text-center relative z-10">
                  <div className="text-5xl mb-3">{tech.icon}</div>
                  <h3 className="text-lg font-bold mb-2">{tech.name}</h3>
                  <p className="text-sm text-gray-400">{tech.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
        >
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary-400 mb-2">12+</div>
              <div className="text-gray-300">Tech Stacks</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-400 mb-2">Instant</div>
              <div className="text-gray-300">Profile Switching</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-400 mb-2">Smart</div>
              <div className="text-gray-300">Cross-Tech Awareness</div>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-white/20">
            <p className="text-center text-gray-300">
              <span className="font-semibold text-white">Pro Tip:</span> React developers know JavaScript, Full-Stack knows both frontend and backend. 
              AI understands technology relationships and answers accordingly!
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
