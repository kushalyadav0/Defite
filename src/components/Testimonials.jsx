import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

const Testimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const testimonialsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (testimonialsRef.current) {
      observer.observe(testimonialsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const testimonials = [
    {
      quote: "Zerolabs transformed our vision into a stunning reality. Their attention to detail and technical expertise is unmatched. The team delivered beyond our expectations and provided ongoing support that made all the difference.",
      author: "Sarah Chen",
      position: "Tech Startup CEO",
      company: "InnovateTech Solutions",
      avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150",
      rating: 5,
      project: "E-Commerce Platform"
    },
    {
      quote: "Working with Zerolabs was a game-changer for our business. They delivered a complex AI solution on time and within budget. Their professionalism and expertise in machine learning helped us gain a competitive edge.",
      author: "Michael Rodriguez",
      position: "E-commerce Director",
      company: "RetailMax Corp",
      avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150",
      rating: 5,
      project: "AI Analytics Dashboard"
    },
    {
      quote: "The AI solution they built for us increased our efficiency by 300%. The team's deep understanding of both technology and business needs resulted in a solution that exceeded all our expectations. Absolutely incredible work!",
      author: "Dr. Emma Watson",
      position: "Research Director",
      company: "MedTech Innovations",
      avatar: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150",
      rating: 5,
      project: "Healthcare Management System"
    },
    {
      quote: "Zerolabs delivered a secure, scalable banking application that our customers love. Their expertise in security and user experience design created a product that stands out in the competitive fintech market.",
      author: "James Thompson",
      position: "CTO",
      company: "SecureBank Digital",
      avatar: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150",
      rating: 5,
      project: "Banking Application"
    },
    {
      quote: "The IoT dashboard they created revolutionized how we monitor our smart city infrastructure. Real-time insights and predictive analytics have helped us optimize operations and reduce costs significantly.",
      author: "Lisa Park",
      position: "Smart City Manager",
      company: "Urban Solutions Inc",
      avatar: "https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=150",
      rating: 5,
      project: "IoT Management Platform"
    }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="py-20 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 -right-20 w-80 h-80 bg-gradient-to-br from-blue-200/20 to-purple-200/20 dark:from-blue-800/10 dark:to-purple-800/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-gradient-to-br from-purple-200/20 to-pink-200/20 dark:from-purple-800/10 dark:to-pink-800/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div ref={testimonialsRef} className="opacity-0 transform translate-y-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              What Our{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Clients Say
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-8 rounded-full"></div>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Don't just take our word for it. Here's what our satisfied clients have to say about 
              working with Zerolabs and the results we've delivered together.
            </p>
          </div>

          {/* Main Testimonial Display */}
          <div className="relative max-w-5xl mx-auto mb-12">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 md:p-12 border border-gray-200 dark:border-gray-700 relative overflow-hidden">
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 opacity-10">
                <Quote size={80} className="text-blue-600" />
              </div>

              {/* Stars */}
              <div className="flex justify-center mb-6">
                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                  <Star key={i} className="text-yellow-400 fill-current mr-1" size={24} />
                ))}
              </div>

              {/* Testimonial Content */}
              <blockquote className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-8 italic text-center leading-relaxed relative z-10">
                "{testimonials[currentTestimonial].quote}"
              </blockquote>

              {/* Author Info */}
              <div className="flex items-center justify-center space-x-4">
                <img
                  src={testimonials[currentTestimonial].avatar}
                  alt={testimonials[currentTestimonial].author}
                  className="w-16 h-16 rounded-full object-cover border-4 border-white dark:border-gray-700 shadow-lg"
                />
                <div className="text-center">
                  <p className="text-lg font-bold text-gray-900 dark:text-white">
                    {testimonials[currentTestimonial].author}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    {testimonials[currentTestimonial].position}
                  </p>
                  <p className="text-sm text-blue-600 dark:text-blue-400 font-semibold">
                    {testimonials[currentTestimonial].company}
                  </p>
                </div>
              </div>

              {/* Project Badge */}
              <div className="text-center mt-4">
                <span className="inline-block bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50 text-blue-800 dark:text-blue-200 text-sm px-4 py-2 rounded-full border border-blue-200 dark:border-blue-800">
                  Project: {testimonials[currentTestimonial].project}
                </span>
              </div>
            </div>
            
            {/* Navigation buttons */}
            <button
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-6 bg-white dark:bg-gray-800 rounded-full p-3 shadow-xl hover:shadow-2xl transition-all duration-200 border border-gray-200 dark:border-gray-700 hover:scale-110 group"
            >
              <ChevronLeft className="text-gray-600 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200" size={24} />
            </button>
            <button
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-6 bg-white dark:bg-gray-800 rounded-full p-3 shadow-xl hover:shadow-2xl transition-all duration-200 border border-gray-200 dark:border-gray-700 hover:scale-110 group"
            >
              <ChevronRight className="text-gray-600 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200" size={24} />
            </button>
          </div>

          {/* Dots indicator */}
          <div className="flex justify-center space-x-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 hover:scale-125 ${
                  index === currentTestimonial 
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg' 
                    : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                }`}
              />
            ))}
          </div>

          {/* Client Logos Section */}
          <div className="mt-16 text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg">
              Trusted by innovative companies worldwide
            </p>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center opacity-60 hover:opacity-80 transition-opacity duration-300">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl font-bold text-gray-400 dark:text-gray-500">
                    {testimonial.company.split(' ')[0]}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
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