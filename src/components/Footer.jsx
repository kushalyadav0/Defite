import React from 'react';
import { Heart, Code, Coffee } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 dark:bg-black text-white py-12 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-600/10 to-purple-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-br from-purple-600/10 to-pink-600/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          {/* Logo and Tagline */}
          <div className="mb-8">
            <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
              Zerolabs
            </h3>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Your trusted partner for innovative digital solutions. 
              Transforming ideas into exceptional digital experiences.
            </p>
          </div>

          {/* Services Links */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 max-w-2xl mx-auto">
            <div className="text-center">
              <h4 className="text-white font-semibold mb-2">Frontend</h4>
              <p className="text-gray-400 text-sm">React & Modern JS</p>
            </div>
            <div className="text-center">
              <h4 className="text-white font-semibold mb-2">Backend</h4>
              <p className="text-gray-400 text-sm">Python & Java</p>
            </div>
            <div className="text-center">
              <h4 className="text-white font-semibold mb-2">AI/ML</h4>
              <p className="text-gray-400 text-sm">Smart Solutions</p>
            </div>
            <div className="text-center">
              <h4 className="text-white font-semibold mb-2">Deployment</h4>
              <p className="text-gray-400 text-sm">Secure & Scalable</p>
            </div>
          </div>

          {/* Made with Love */}
          <div className="flex items-center justify-center space-x-2 mb-6 text-gray-400">
            <span>Made with</span>
            <Heart className="text-red-500 fill-current animate-pulse" size={16} />
            <span>and</span>
            <Code className="text-blue-400" size={16} />
            <span>and lots of</span>
            <Coffee className="text-yellow-600" size={16} />
          </div>

          {/* Copyright and Links */}
          <div className="border-t border-gray-800 pt-6">
            <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8 text-sm text-gray-400">
              <span>© {currentYear} Zerolabs. All rights reserved.</span>
              <div className="flex space-x-6">
                <button className="hover:text-white transition-colors duration-200 hover:underline">
                  Privacy Policy
                </button>
                <button className="hover:text-white transition-colors duration-200 hover:underline">
                  Terms of Service
                </button>
                <button className="hover:text-white transition-colors duration-200 hover:underline">
                  Cookie Policy
                </button>
              </div>
            </div>
          </div>

          {/* Contact CTA */}
          <div className="mt-8 p-6 bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-xl border border-gray-800">
            <h4 className="text-xl font-semibold text-white mb-2">
              Ready to Start Your Next Project?
            </h4>
            <p className="text-gray-300 mb-4">
              Let's discuss how we can help bring your vision to life.
            </p>
            <button 
              onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl font-semibold transform hover:scale-105"
            >
              Get Started Today
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;