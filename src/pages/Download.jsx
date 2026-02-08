import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Download, Mic, CheckCircle, Monitor, Zap, Shield, Clock } from 'lucide-react';

export default function DownloadPage() {
  // Update this URL after uploading to GitHub Releases
  const DOWNLOAD_URL = 'https://github.com/abidraza5594/INATANCE-AI-WEBSITE/releases/download/v1.0.0/InterviewAI.exe';
  
  const features = [
    { icon: Zap, text: 'Real-time AI Answers', color: 'from-yellow-400 to-orange-500' },
    { icon: Shield, text: '100% Stealth Mode', color: 'from-green-400 to-emerald-500' },
    { icon: Clock, text: 'Voice Recognition', color: 'from-blue-400 to-indigo-500' },
    { icon: Monitor, text: 'Screenshot Analysis', color: 'from-purple-400 to-pink-500' },
  ];

  const systemRequirements = [
    'Windows 10 or later',
    'Minimum 4GB RAM',
    '500MB free disk space',
    'Internet connection required',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg shadow-sm border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="bg-gradient-to-br from-primary-600 to-blue-600 p-2.5 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <Mic className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-blue-600 bg-clip-text text-transparent">InterviewAI</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Link to="/login" className="text-gray-600 hover:text-gray-900 font-medium">Login</Link>
              <Link to="/signup" className="btn-primary">Get Started</Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-block bg-gradient-to-r from-primary-500 to-blue-500 p-4 rounded-2xl shadow-2xl mb-6">
            <Download className="h-16 w-16 text-white" />
          </div>
          <h1 className="text-5xl font-black bg-gradient-to-r from-gray-900 via-primary-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Download InterviewAI
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Desktop application for Windows - Your AI interview assistant
          </p>
          
          {/* Download Button */}
          <motion.a
            href={DOWNLOAD_URL}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center space-x-3 bg-gradient-to-r from-primary-600 via-blue-600 to-purple-600 hover:from-primary-700 hover:via-blue-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 text-lg"
          >
            <Download className="h-6 w-6" />
            <span>Download for Windows</span>
          </motion.a>
          
          <p className="text-sm text-gray-500 mt-4">
            Version 1.0.0 • Free Download • ~50MB
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center space-x-4">
                <div className={`bg-gradient-to-br ${feature.color} p-3 rounded-xl shadow-lg`}>
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <span className="text-lg font-semibold text-gray-900">{feature.text}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* System Requirements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-gray-100 mb-12"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Monitor className="h-6 w-6 mr-3 text-primary-600" />
            System Requirements
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {systemRequirements.map((req, index) => (
              <div key={index} className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                <span className="text-gray-700">{req}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Installation Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl shadow-lg p-8 border border-blue-100"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            📦 Installation Steps
          </h2>
          <ol className="space-y-4">
            <li className="flex items-start space-x-3">
              <span className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-primary-500 to-blue-500 text-white rounded-full flex items-center justify-center font-bold">1</span>
              <div>
                <p className="font-semibold text-gray-900">Download the application</p>
                <p className="text-sm text-gray-600">Click the download button above to get InterviewAI.exe</p>
              </div>
            </li>
            <li className="flex items-start space-x-3">
              <span className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-primary-500 to-blue-500 text-white rounded-full flex items-center justify-center font-bold">2</span>
              <div>
                <p className="font-semibold text-gray-900">Run the installer</p>
                <p className="text-sm text-gray-600">Double-click the downloaded file and follow the installation wizard</p>
              </div>
            </li>
            <li className="flex items-start space-x-3">
              <span className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-primary-500 to-blue-500 text-white rounded-full flex items-center justify-center font-bold">3</span>
              <div>
                <p className="font-semibold text-gray-900">Login with your account</p>
                <p className="text-sm text-gray-600">Use your email to login (no password needed!)</p>
              </div>
            </li>
            <li className="flex items-start space-x-3">
              <span className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-primary-500 to-blue-500 text-white rounded-full flex items-center justify-center font-bold">4</span>
              <div>
                <p className="font-semibold text-gray-900">Start practicing!</p>
                <p className="text-sm text-gray-600">Your 10 minutes free time is ready to use</p>
              </div>
            </li>
          </ol>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="text-center mt-12"
        >
          <p className="text-gray-600 mb-4">
            Don't have an account yet?
          </p>
          <Link to="/signup" className="btn-primary inline-block">
            Create Free Account
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
