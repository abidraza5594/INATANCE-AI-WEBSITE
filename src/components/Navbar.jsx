import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Mic } from 'lucide-react';
import { useState } from 'react';
import { logOut } from '../firebase/auth';

export default function Navbar({ user }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logOut();
    navigate('/');
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    } else {
      // If not on home page, navigate to home first
      navigate('/', { state: { scrollTo: sectionId } });
    }
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-100 fixed w-full top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="bg-gradient-to-br from-primary-600 to-purple-600 p-2.5 rounded-xl shadow-lg group-hover:shadow-primary-500/30 transition-all duration-300 group-hover:scale-105">
                <Mic className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 group-hover:from-primary-600 group-hover:to-purple-600 transition-all duration-300">InterviewAI</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            <button onClick={() => scrollToSection('features')} className="px-4 py-2 text-sm font-semibold text-gray-600 hover:text-primary-600 hover:bg-gray-50 rounded-lg transition-all">Features</button>
            <button onClick={() => scrollToSection('how-it-works')} className="px-4 py-2 text-sm font-semibold text-gray-600 hover:text-primary-600 hover:bg-gray-50 rounded-lg transition-all">How It Works</button>
            <button onClick={() => scrollToSection('tech-stacks')} className="px-4 py-2 text-sm font-semibold text-gray-600 hover:text-primary-600 hover:bg-gray-50 rounded-lg transition-all">Tech Stacks</button>
            <button onClick={() => scrollToSection('pricing')} className="px-4 py-2 text-sm font-semibold text-gray-600 hover:text-primary-600 hover:bg-gray-50 rounded-lg transition-all">Pricing</button>

            <div className="h-6 w-px bg-gray-200 mx-4"></div>

            <Link to="/download" className="px-5 py-2.5 bg-gray-900 text-white text-sm font-bold rounded-xl hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5">Download App</Link>
            {user ? (
              <>
                <Link to="/dashboard" className="ml-4 px-4 py-2 text-sm font-semibold text-primary-600 hover:bg-primary-50 rounded-lg transition-all">Dashboard</Link>
                <button onClick={handleLogout} className="ml-2 px-4 py-2 text-sm font-semibold text-gray-500 hover:text-red-600 transition-all">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="ml-2 px-4 py-2 text-sm font-semibold text-gray-600 hover:text-primary-600 hover:bg-gray-50 rounded-lg transition-all">Login</Link>
                <Link to="/signup" className="ml-2 px-5 py-2.5 bg-gradient-to-r from-primary-600 to-blue-600 text-white text-sm font-bold rounded-xl hover:shadow-lg hover:shadow-primary-500/30 transition-all duration-300 hover:-translate-y-0.5">Get Started</Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-lg border-t border-gray-100 shadow-lg absolute w-full left-0">
          <div className="px-4 pt-4 pb-6 space-y-2">
            <button onClick={() => scrollToSection('features')} className="block w-full text-left px-4 py-3 text-gray-700 font-medium hover:bg-primary-50 hover:text-primary-600 rounded-xl transition-colors">Features</button>
            <button onClick={() => scrollToSection('how-it-works')} className="block w-full text-left px-4 py-3 text-gray-700 font-medium hover:bg-primary-50 hover:text-primary-600 rounded-xl transition-colors">How It Works</button>
            <button onClick={() => scrollToSection('tech-stacks')} className="block w-full text-left px-4 py-3 text-gray-700 font-medium hover:bg-primary-50 hover:text-primary-600 rounded-xl transition-colors">Tech Stacks</button>
            <button onClick={() => scrollToSection('shortcuts')} className="block w-full text-left px-4 py-3 text-gray-700 font-medium hover:bg-primary-50 hover:text-primary-600 rounded-xl transition-colors">Shortcuts</button>
            <button onClick={() => scrollToSection('pricing')} className="block w-full text-left px-4 py-3 text-gray-700 font-medium hover:bg-primary-50 hover:text-primary-600 rounded-xl transition-colors">Pricing</button>
            <div className="pt-4">
              <Link to="/download" onClick={() => setIsOpen(false)} className="block w-full px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-xl text-center shadow-lg hover:shadow-green-500/30 transition-all">Download App</Link>
            </div>
            {user ? (
              <>
                <Link to="/dashboard" onClick={() => setIsOpen(false)} className="block px-4 py-3 text-gray-700 font-medium hover:bg-gray-100 rounded-xl">Dashboard</Link>
                <button onClick={handleLogout} className="block w-full text-left px-4 py-3 text-red-600 font-medium hover:bg-red-50 rounded-xl">Logout</button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-4 mt-4">
                <Link to="/login" onClick={() => setIsOpen(false)} className="block px-4 py-3 text-gray-700 font-bold text-center border border-gray-200 rounded-xl hover:bg-gray-50">Login</Link>
                <Link to="/signup" onClick={() => setIsOpen(false)} className="block px-4 py-3 bg-primary-600 text-white font-bold text-center rounded-xl hover:bg-primary-700 shadow-lg">Get Started</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
