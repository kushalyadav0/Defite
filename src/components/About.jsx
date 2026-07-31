import React, {
  useEffect,
  useRef,
} from 'react';

import {
  Users,
  Award,
  Zap,
} from 'lucide-react';

import { useAppContext } from '../context/AppContext';

const About = () => {
  const aboutRef = useRef(null);

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

    if (aboutRef.current) {
      observer.observe(
        aboutRef.current
      );
    }

    return () =>
      observer.disconnect();
  }, []);

  const values = [
    {
      icon: Award,

      title:
        'Enterprise Software',

      description:
        'Custom software engineered for reliability, scalability, and long-term growth.',

      gradient:
        'from-blue-500 to-purple-600',
    },

    {
      icon: Zap,

      title:
        'Digital Transformation',

      description:
        'Modernizing business operations with cloud-native applications and automation.',

      gradient:
        'from-purple-500 to-pink-600',
    },

    {
      icon: Users,

      title:
        'Long-Term Partnership',

      description:
        'Continuous maintenance, enhancements, and technical support beyond delivery.',

      gradient:
        'from-green-500 to-teal-600',
    },
  ];

  return (
    <section
      id="about"
      className="py-20 bg-white dark:bg-gray-800 relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-10 w-64 h-64 bg-gradient-to-br from-blue-100/50 to-purple-100/50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-full blur-3xl"></div>

        <div className="absolute bottom-20 left-10 w-64 h-64 bg-gradient-to-br from-purple-100/50 to-pink-100/50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div
          ref={aboutRef}
          className="opacity-0 transform translate-y-10"
        >
          {/* Heading */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              About{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Defite
              </span>
            </h2>

            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-8 rounded-full"></div>

         <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
  {homepageCMS?.content
    ?.aboutText ||
    'Defite is a technology partner focused on building systems that help businesses operate efficiently and scale with confidence.'}
</p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {values.map(
              (value, index) => (
                <div
                  key={index}
                  className="group text-center p-8 rounded-2xl bg-gray-50 dark:bg-gray-700 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 border border-gray-200 dark:border-gray-600"
                >
                  <div
                    className={`w-20 h-20 bg-gradient-to-br ${value.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                  >
                    <value.icon
                      className="text-white"
                      size={32}
                    />
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    {value.title}
                  </h3>

                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              )
            )}
          </div>

          {/* Mission */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-600 rounded-2xl p-8 md:p-12 text-center shadow-xl border border-gray-200 dark:border-gray-600">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Our Mission
            </h3>

            <p className="text-lg text-gray-700 dark:text-gray-200 max-w-3xl mx-auto leading-relaxed">
              {homepageCMS?.content
                ?.missionText ||
                'To help businesses leverage technology to simplify operations, improve efficiency, and build scalable systems for long-term growth.'}
            </p>
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

export default About;