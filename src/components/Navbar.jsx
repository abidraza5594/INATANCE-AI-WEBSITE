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
    <nav className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="bg-primary-600 p-2 rounded-lg">
                <Mic className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900">InterviewAI</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => scrollToSection('features')} className="text-gray-700 hover:text-primary-600 transition">Features</button>
            <button onClick={() => scrollToSection('how-it-works')} className="text-gray-700 hover:text-primary-600 transition">How It Works</button>
            <button onClick={() => scrollToSection('tech-stacks')} className="text-gray-700 hover:text-primary-600 transition">Tech Stacks</button>
            <button onClick={() => scrollToSection('shortcuts')} className="text-gray-700 hover:text-primary-600 transition">Shortcuts</button>
            <button onClick={() => scrollToSection('pricing')} className="text-gray-700 hover:text-primary-600 transition">Pricing</button>
            <Link to="/download" className="text-gray-700 hover:text-primary-600 transition">Download App</Link>
            {user ? (
              <>
                <Link to="/dashboard" className="text-gray-700 hover:text-primary-600 transition">Dashboard</Link>
                <button onClick={handleLogout} className="btn-secondary">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-700 hover:text-primary-600 transition">Login</Link>
                <Link to="/signup" className="btn-primary">Get Started</Link>
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
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <button onClick={() => scrollToSection('features')} className="block w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-100 rounded">Features</button>
            <button onClick={() => scrollToSection('how-it-works')} className="block w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-100 rounded">How It Works</button>
            <button onClick={() => scrollToSection('tech-stacks')} className="block w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-100 rounded">Tech Stacks</button>
            <button onClick={() => scrollToSection('shortcuts')} className="block w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-100 rounded">Shortcuts</button>
            <button onClick={() => scrollToSection('pricing')} className="block w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-100 rounded">Pricing</button>
            <Link to="/download" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded">Download App</Link>
            {user ? (
              <>
                <Link to="/dashboard" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded">Dashboard</Link>
                <button onClick={handleLogout} className="block w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-100 rounded">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded">Login</Link>
                <Link to="/signup" onClick={() => setIsOpen(false)} className="block px-3 py-2 bg-primary-600 text-white rounded">Get Started</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
