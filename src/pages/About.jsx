import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import { Target, Users, Award, Zap } from 'lucide-react';

export default function About({ user }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar user={user} />
      
      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              About <span className="text-primary-600">InterviewAI</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're on a mission to help job seekers ace their interviews with AI-powered practice and feedback.
            </p>
          </motion.div>

          {/* Mission Section */}
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="card"
            >
              <Target className="h-12 w-12 text-primary-600 mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-gray-600 leading-relaxed">
                To democratize interview preparation by providing AI-powered tools that help everyone, 
                regardless of background or experience, practice and improve their interview skills.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="card"
            >
              <Zap className="h-12 w-12 text-primary-600 mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h2>
              <p className="text-gray-600 leading-relaxed">
                To become the world's leading AI interview coach, helping millions of people 
                land their dream jobs through personalized, intelligent practice sessions.
              </p>
            </motion.div>
          </div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-primary-600 rounded-2xl p-12 text-white mb-16"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold mb-2">10K+</div>
                <div className="text-primary-100">Practice Sessions</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">95%</div>
                <div className="text-primary-100">Success Rate</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">12+</div>
                <div className="text-primary-100">Tech Stacks</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">24/7</div>
                <div className="text-primary-100">Available</div>
              </div>
            </div>
          </motion.div>

          {/* Values Section */}
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="card text-center"
            >
              <Users className="h-12 w-12 text-primary-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">User-Centric</h3>
              <p className="text-gray-600">
                Every feature is designed with your success in mind. Your feedback shapes our product.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="card text-center"
            >
              <Award className="h-12 w-12 text-primary-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Excellence</h3>
              <p className="text-gray-600">
                We strive for excellence in everything we do, from AI accuracy to user experience.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="card text-center"
            >
              <Zap className="h-12 w-12 text-primary-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Innovation</h3>
              <p className="text-gray-600">
                Constantly improving with the latest AI technology to give you the best experience.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
