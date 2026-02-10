import { Code2 } from 'lucide-react';
import { memo } from 'react';

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

// Memoized tech card
const TechCard = memo(({ tech, index }) => (
  <div className="relative group">
    <div className="glass-card h-full p-6 text-center hover:shadow-xl transition-shadow duration-300 border border-gray-100">
      <div className="text-6xl mb-4 transform group-hover:scale-110 transition-transform duration-300 drop-shadow-md">{tech.icon}</div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{tech.name}</h3>
      <p className="text-sm text-gray-500 font-medium">{tech.description}</p>

      {/* Hover Glow */}
      <div className={`absolute inset-0 bg-gradient-to-br ${tech.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300 pointer-events-none`}></div>
    </div>
  </div>
));

TechCard.displayName = 'TechCard';

export default function TechStacks() {
  return (
    <div id="tech-stacks" className="py-24 relative overflow-hidden bg-slate-50">
      {/* Simplified background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 opacity-50"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center space-x-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full mb-6 border border-blue-100 shadow-sm">
            <Code2 className="h-4 w-4" />
            <span className="text-sm font-bold uppercase tracking-wider">12+ Technologies</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6 tracking-tight">
            Every Tech Stack <span className="text-primary-600">Covered</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Switch between technology profiles instantly with Caps Lock double-tap. AI answers from that technology's perspective.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-16">
          {techStacks.map((tech, index) => (
            <TechCard key={index} tech={tech} index={index} />
          ))}
        </div>

        <div className="glass-card p-10 border border-primary-100 bg-white">
          <div className="grid md:grid-cols-3 gap-10 text-center divide-y md:divide-y-0 md:divide-x divide-gray-200">
            <div className="p-4">
              <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-blue-600 mb-2">12+</div>
              <div className="text-gray-600 font-bold uppercase tracking-wide">Tech Stacks</div>
            </div>
            <div className="p-4">
              <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-2">Instant</div>
              <div className="text-gray-600 font-bold uppercase tracking-wide">Profile Switching</div>
            </div>
            <div className="p-4">
              <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500 mb-2">Smart</div>
              <div className="text-gray-600 font-bold uppercase tracking-wide">Cross-Tech Awareness</div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-center text-gray-600 text-lg">
              <span className="font-bold text-primary-600">Pro Tip:</span> React developers know JavaScript, Full-Stack knows both frontend and backend.
              AI understands technology relationships and answers accordingly!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
