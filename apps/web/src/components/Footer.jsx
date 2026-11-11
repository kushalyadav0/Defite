import React from 'react';

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
        {/* Company Info */}
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
            Defite
          </h3>

          <p className="text-gray-400 text-lg max-w-3xl mx-auto leading-8">
            Defite is a software development company delivering custom software,
            enterprise applications, AI-powered solutions
            that help businesses innovate, automate, and scale with confidence.
          </p>
        </div>

        {/* Footer Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12 text-center">
          <div>
            <h4 className="text-white font-semibold text-lg mb-4">
              Solutions
            </h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>Custom Software</li>
              <li>Enterprise Applications</li>
              <li>AI & Automation</li>
              <li>Cloud Solutions</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-lg mb-4">
              Technologies
            </h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>React & Next.js</li>
              <li>Node.js & Python</li>
              <li>AWS & Docker</li>
              <li>PostgreSQL</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-lg mb-4">
              Company
            </h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>About Us</li>
              <li>Case Studies</li>
              <li>Careers</li>
              <li>Contact</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-lg mb-4">
              Support
            </h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>Consultation</li>
              <li>Maintenance</li>
              <li>Documentation</li>
              <li>Technical Support</li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-6">
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 text-sm text-gray-400">
            <span>© {currentYear} Defite. All rights reserved.</span>

            <div className="flex flex-wrap justify-center gap-6">
              <button className="hover:text-white transition-colors">
                Privacy Policy
              </button>

              <button className="hover:text-white transition-colors">
                Terms of Service
              </button>

              <button className="hover:text-white transition-colors">
                Cookie Policy
              </button>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-10 p-8 bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-2xl border border-gray-800 text-center">
          <h4 className="text-2xl font-bold text-white mb-3">
            Ready to Build Your Next Software Solution?
          </h4>

          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Let's discuss how custom software, AI, and cloud technologies can
            help your business innovate, automate, and scale.
          </p>

          <button
            onClick={() =>
              document
                .getElementById('contact')
                ?.scrollIntoView({ behavior: 'smooth' })
            }
            className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl font-semibold transform hover:scale-105"
          >
            Schedule a Consultation
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;