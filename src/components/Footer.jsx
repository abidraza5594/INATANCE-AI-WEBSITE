import { Link, useNavigate } from 'react-router-dom';
import { Mic, Mail, MapPin, Instagram, Send } from 'lucide-react';

export default function Footer() {
  const navigate = useNavigate();

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/', { state: { scrollTo: sectionId } });
    }
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-primary-600 p-2 rounded-lg">
                <Mic className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold">InterviewAI</span>
            </div>
            <p className="text-gray-400 mb-4">
              AI-powered interview practice platform. Master your skills and land your dream job with real-time AI assistance.
            </p>
            <div className="flex space-x-4">
              <a href="https://instagram.com/ansariabid5594" target="_blank" rel="noopener noreferrer" 
                 className="text-gray-400 hover:text-white transition">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="https://t.me/dark_hacker_abid" target="_blank" rel="noopener noreferrer"
                 className="text-gray-400 hover:text-white transition">
                <Send className="h-6 w-6" />
              </a>
              <a href="mailto:abid810418@gmail.com" className="text-gray-400 hover:text-white transition">
                <Mail className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-white transition">Home</Link></li>
              <li><button onClick={() => scrollToSection('features')} className="text-gray-400 hover:text-white transition">Features</button></li>
              <li><button onClick={() => scrollToSection('pricing')} className="text-gray-400 hover:text-white transition">Pricing</button></li>
              <li><Link to="/about" className="text-gray-400 hover:text-white transition">About</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white transition">Contact</Link></li>
              <li><Link to="/login" className="text-gray-400 hover:text-white transition">Login</Link></li>
              <li><Link to="/signup" className="text-gray-400 hover:text-white transition">Sign Up</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Mail className="h-5 w-5 text-gray-400 mr-2 mt-0.5 flex-shrink-0" />
                <a href="mailto:abid810418@gmail.com" className="text-gray-400 hover:text-white transition">
                  abid810418@gmail.com
                </a>
              </li>
              <li className="flex items-start">
                <Instagram className="h-5 w-5 text-gray-400 mr-2 mt-0.5 flex-shrink-0" />
                <a href="https://instagram.com/ansariabid5594" target="_blank" rel="noopener noreferrer"
                   className="text-gray-400 hover:text-white transition">
                  @ansariabid5594
                </a>
              </li>
              <li className="flex items-start">
                <Send className="h-5 w-5 text-gray-400 mr-2 mt-0.5 flex-shrink-0" />
                <a href="https://t.me/dark_hacker_abid" target="_blank" rel="noopener noreferrer"
                   className="text-gray-400 hover:text-white transition">
                  @dark_hacker_abid
                </a>
              </li>
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-gray-400 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-gray-400">India</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} InterviewAI. All rights reserved. Made with ❤️ for developers.</p>
        </div>
      </div>
    </footer>
  );
}
