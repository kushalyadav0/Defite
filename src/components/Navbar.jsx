import React, { useState } from 'react';

import {
  Moon,
  Sun,
  ArrowRight,
  Menu,
  X,
} from 'lucide-react';

import { useAppContext } from '../context/AppContext';

const Navbar = ({
  darkMode,
  setDarkMode,
}) => {
  const [isMenuOpen, setIsMenuOpen] =
    useState(false);

  const { settings } = useAppContext();

  const formatImageUrl = (url) => {
    if (!url) return '';

    if (
      url.startsWith('http://') ||
      url.startsWith('https://')
    ) {
      return url;
    }

    return `https://defite.cloud${url}`;
  };

  const scrollToSection = (
    sectionId
  ) => {
    document
      .getElementById(sectionId)
      ?.scrollIntoView({
        behavior: 'smooth',
      });

    setIsMenuOpen(false);
  };

  const navItems = [
    'Home',
    'About',
    'Services',
    'Projects',
    'Testimonials',
    'Contact',
  ];
  

  return (
    <nav className="fixed top-0 w-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div
            className="flex-shrink-0 cursor-pointer"
            onClick={() =>
              scrollToSection('home')
            }
          >
    <img
  src={
    settings?.logo
      ? formatImageUrl(settings.logo)
      : '/fallback-logo.png'
  }
  alt="Defite logo"
  onError={(e) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src =
      '/fallback-logo.png';
  }}
  className="h-16 w-auto object-contain"
/>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item) => (
                <button
                  key={item}
                  onClick={() =>
                    scrollToSection(
                      item.toLowerCase()
                    )
                  }
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 text-sm font-medium transition-all duration-200 hover:scale-105 relative group"
                >
                  {item}

                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
                </button>
              ))}
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {/* Dark Mode */}
            <button
              onClick={() =>
                setDarkMode(!darkMode)
              }
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 hover:scale-110 hover:shadow-lg"
            >
              {darkMode ? (
                <Sun size={20} />
              ) : (
                <Moon size={20} />
              )}
            </button>

            {/* CTA */}
            <button
              onClick={() =>
                scrollToSection('contact')
              }
              className="hidden md:inline-flex items-center px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 transform"
            >
              Get Started

              <ArrowRight
                className="ml-2"
                size={16}
              />
            </button>

            {/* Mobile Menu */}
            <button
              onClick={() =>
                setIsMenuOpen(!isMenuOpen)
              }
              className="md:hidden p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
            >
              {isMenuOpen ? (
                <X size={24} />
              ) : (
                <Menu size={24} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() =>
                  scrollToSection(
                    item.toLowerCase()
                  )
                }
                className="block w-full text-left px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-all duration-200"
              >
                {item}
              </button>
            ))}

            <button
              onClick={() =>
                scrollToSection('contact')
              }
              className="w-full mt-4 flex items-center justify-center px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg"
            >
              Get Started

              <ArrowRight
                className="ml-2"
                size={16}
              />
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;