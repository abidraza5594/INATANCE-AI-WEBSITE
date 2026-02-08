import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import HowItWorks from '../components/HowItWorks';
import TechStacks from '../components/TechStacks';
import KeyboardShortcuts from '../components/KeyboardShortcuts';
import Pricing from '../components/Pricing';
import Footer from '../components/Footer';

export default function Home({ user }) {
  const location = useLocation();

  useEffect(() => {
    // Handle scroll to section if coming from another page
    if (location.state?.scrollTo) {
      const element = document.getElementById(location.state.scrollTo);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);

  return (
    <div className="min-h-screen">
      <Navbar user={user} />
      <Hero />
      <Features />
      <HowItWorks />
      <TechStacks />
      <KeyboardShortcuts />
      <Pricing />
      <Footer />
    </div>
  );
}
