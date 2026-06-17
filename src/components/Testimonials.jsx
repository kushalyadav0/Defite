import React, {
  useState,
  useEffect,
  useRef,
} from 'react';

import {
  ChevronLeft,
  ChevronRight,
  Star,
  Quote,
} from 'lucide-react';

import {
  getTestimonials,
} from '../services/testimonial.service';

const Testimonials = () => {
  const [testimonials, setTestimonials] =
    useState([]);

  const [
    currentTestimonial,
    setCurrentTestimonial,
  ] = useState(0);

  const testimonialsRef =
    useRef(null);

  const formatImageUrl = (url) => {
    if (!url) return '';

    if (
      url.startsWith('http://') ||
      url.startsWith('https://')
    ) {
      return url;
    }

    return `https://defite.cloud${
      url.startsWith('/')
        ? url
        : `/${url}`
    }`;
  };

  const fetchTestimonials =
    async () => {
      try {
        const data =
          await getTestimonials();

        setTestimonials(data || []);
      } catch (error) {
        console.log(
          error.response?.data ||
            error
        );
      }
    };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  useEffect(() => {
    if (!testimonials.length)
      return;

    const interval =
      setInterval(() => {
        setCurrentTestimonial(
          (prev) =>
            (prev + 1) %
            testimonials.length
        );
      }, 5000);

    return () =>
      clearInterval(interval);
  }, [testimonials]);

  if (!testimonials.length) {
    return null;
  }

  const active =
    testimonials[
      currentTestimonial
    ] || testimonials[0];

  const nextTestimonial = () => {
    setCurrentTestimonial(
      (prev) =>
        (prev + 1) %
        testimonials.length
    );
  };

  const prevTestimonial = () => {
    setCurrentTestimonial(
      (prev) =>
        (prev -
          1 +
          testimonials.length) %
        testimonials.length
    );
  };

  return (
    <section
      id="testimonials"
      className="py-20 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 -right-20 w-80 h-80 bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-full blur-3xl"></div>

        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-gradient-to-br from-purple-200/20 to-pink-200/20 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div
          ref={testimonialsRef}
          className="transform translate-y-10"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              What Our{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Clients Say
              </span>
            </h2>

            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-8 rounded-full"></div>

            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Don't just take our word for it.
              Here's what our satisfied
              clients have to say about
              working with Defite and the
              results we've delivered
              together.
            </p>

            <p className="text-base md:text-lg text-blue-700 dark:text-blue-300 font-semibold mt-6 max-w-4xl mx-auto">
              Trusted by businesses to
              build systems that work
            </p>
          </div>

          <div className="relative max-w-5xl mx-auto mb-12">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 md:p-12 border border-gray-200 dark:border-gray-700 relative overflow-hidden">
              <div className="absolute top-6 right-6 opacity-10">
                <Quote
                  size={80}
                  className="text-blue-600"
                />
              </div>

              <div className="flex justify-center mb-6">
                {[
                  ...Array(
                    active?.rating ||
                      5
                  ),
                ].map((_, i) => (
                  <Star
                    key={i}
                    className="text-yellow-400 fill-current mr-1"
                    size={24}
                  />
                ))}
              </div>

              <blockquote className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-8 italic text-center leading-relaxed relative z-10">
                "
                {active?.message}
                "
              </blockquote>

              <div className="flex items-center justify-center space-x-4">
                <img
                  src={
                    active?.image
                      ? formatImageUrl(
                          active.image
                        )
                      : '/fallback-project.png'
                  }
                  alt={active?.name}
                  onError={(e) => {
                    e.currentTarget.onerror =
                      null;

                    e.currentTarget.src =
                      '/fallback-project.png';
                  }}
                  className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg"
                />

                <div className="text-center">
                  <p className="text-lg font-bold text-gray-900 dark:text-white">
                    {active?.name}
                  </p>

                  <p className="text-gray-600 dark:text-gray-400">
                    {
                      active?.designation
                    }
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={
                prevTestimonial
              }
              className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-6 bg-white dark:bg-gray-800 rounded-full p-3 shadow-xl hover:shadow-2xl transition-all duration-200 border border-gray-200 dark:border-gray-700 hover:scale-110 group"
            >
              <ChevronLeft
                className="text-gray-600 dark:text-gray-300 group-hover:text-blue-600"
                size={24}
              />
            </button>

            <button
              onClick={
                nextTestimonial
              }
              className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-6 bg-white dark:bg-gray-800 rounded-full p-3 shadow-xl hover:shadow-2xl transition-all duration-200 border border-gray-200 dark:border-gray-700 hover:scale-110 group"
            >
              <ChevronRight
                className="text-gray-600 dark:text-gray-300 group-hover:text-blue-600"
                size={24}
              />
            </button>
          </div>

          <div className="flex justify-center space-x-3">
            {testimonials.map(
              (_, index) => (
                <button
                  key={index}
                  onClick={() =>
                    setCurrentTestimonial(
                      index
                    )
                  }
                  className={`w-3 h-3 rounded-full transition-all duration-300 hover:scale-125 ${
                    index ===
                    currentTestimonial
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg'
                      : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                />
              )
            )}
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

export default Testimonials;