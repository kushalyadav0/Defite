import React, {
  useEffect,
  useRef,
} from 'react';

import {
  ArrowRight,
  Sparkles,
} from 'lucide-react';

import { useAppContext } from '../context/AppContext';

const Hero = () => {
  const heroRef = useRef(null);

  const { homepageCMS } =
    useAppContext();

  useEffect(() => {
    const observer =
      new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add(
                'animate-fade-in-up'
              );
            }
          });
        },
        { threshold: 0.1 }
      );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (
    sectionId
  ) => {
    document
      .getElementById(sectionId)
      .scrollIntoView({
        behavior: 'smooth',
      });
  };

  return (
    <section
      id="home"
      className="pt-16 min-h-screen flex items-center bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl"></div>

        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-600/20 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-50 relative z-10">
        <div
          ref={heroRef}
          className="text-center opacity-0 transform translate-y-10"
        >
          {/* Badge */}
          <div className="flex justify-center mb-6">
            <div className="flex items-center space-x-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200 dark:border-gray-700">
              <Sparkles
                className="text-blue-600 dark:text-blue-400"
                size={16}
              />

              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Build Systems. Scale
                Businesses.
              </span>
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            {homepageCMS?.content?.mainHeaing ? (
              homepageCMS.content.mainHeaing
            ) : (
              <>
                Engineering Scalable Software
                <br />
                for Modern Businesses
              </>
            )}
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            {homepageCMS?.content
              ?.heroSubtitle ||
              'We help businesses reduce manual work, automate operations, and build scalable digital systems — from idea to deployment.'}
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() =>
                scrollToSection(
                  'services'
                )
              }
              className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl text-lg font-semibold transform hover:scale-105 hover:-translate-y-1"
            >
              <span className="flex items-center justify-center">
                Our Solutions

                <ArrowRight
                  className="ml-2 group-hover:translate-x-1 transition-transform duration-200"
                  size={20}
                />
              </span>
            </button>

            <button
              onClick={() =>
                scrollToSection(
                  'projects'
                )
              }
              className="group px-8 py-4 border-2 border-blue-600 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 transition-all duration-300 text-lg font-semibold transform hover:scale-105 hover:-translate-y-1 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
            >
              <span className="flex items-center justify-center">
                View Projects

                <ArrowRight
                  className="ml-2 group-hover:translate-x-1 transition-transform duration-200"
                  size={20}
                />
              </span>
            </button>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {/* Projects */}
            <div className="text-center p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-white/80 dark:hover:bg-gray-800/80 transition-all duration-300 hover:scale-105">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                {homepageCMS?.content
                  ?.projectsDelivered ||
                  '50+'}
              </div>

              <div className="text-gray-600 dark:text-gray-300">
                Software Solutions
              </div>
            </div>

            {/* Satisfaction */}
            <div className="text-center p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-white/80 dark:hover:bg-gray-800/80 transition-all duration-300 hover:scale-105">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                100%
              </div>

              <div className="text-gray-600 dark:text-gray-300">
                Client Satisfaction
              </div>
            </div>

            {/* Support */}
            <div className="text-center p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-white/80 dark:hover:bg-gray-800/80 transition-all duration-300 hover:scale-105">
              <div className="text-3xl font-bold text-pink-600 dark:text-pink-400 mb-2">
                24/7
              </div>

              <div className="text-gray-600 dark:text-gray-300">
                Technical Support
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(40px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default Hero;