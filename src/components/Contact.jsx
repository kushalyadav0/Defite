import React, { useState, useEffect, useRef } from 'react';
import {
  Send,
  Mail,
  Phone,
  MapPin,
  Clock,
  CheckCircle,
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';

import { sendContactMessage } from '../services/contact.service';

const Contact = () => {
  const { settings } = useAppContext();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [isSubmitted, setIsSubmitted] =
    useState(false);

  const [loading, setLoading] = useState(false);

  const contactRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
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

    if (contactRef.current) {
      observer.observe(contactRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await sendContactMessage(formData);

      setIsSubmitted(true);

      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });

      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
  {
    icon: Mail,

    title: 'Email',

    value:
      settings?.email ||
      'hello@deite.in',

    description: 'Reach out anytime',

    gradient:
      'from-blue-500 to-purple-600',
  },

  {
    icon: Phone,

    title: 'Phone',

    value:
      settings?.phone ||
      '+91 7023526817',

    description:
      'Available daily, 8 AM – 11:59 PM',

    gradient:
      'from-green-500 to-teal-600',
  },

  {
    icon: MapPin,

    title: 'Office',

    value:
      settings?.address ||
      'Chandigarh',

    description: 'Welcome to Defite',

    gradient:
      'from-orange-500 to-red-600',
  },

  {
    icon: Clock,

    title: 'Response Time',

    value:
      settings?.responseTime ||
      '< 24 Hours',

    description:
      'Fast and reliable communication',

    gradient:
      'from-purple-500 to-pink-600',
  },
];

  return (
    <section
      id="contact"
      className="py-20 bg-white dark:bg-gray-800 relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-10 w-72 h-72 bg-gradient-to-br from-blue-100/30 to-purple-100/30 dark:from-blue-900/20 dark:to-purple-900/20 rounded-full blur-3xl"></div>

        <div className="absolute bottom-20 left-10 w-72 h-72 bg-gradient-to-br from-purple-100/30 to-pink-100/30 dark:from-purple-900/20 dark:to-pink-900/20 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div
          ref={contactRef}
          className="opacity-0 transform translate-y-10"
        >
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Get In{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Touch
              </span>
            </h2>

            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-8 rounded-full"></div>

            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Ready to bring your project to
              life? Let&apos;s discuss how we can
              help you achieve your goals and
              transform your vision into reality.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-600 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-purple-600"></div>

              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Send us a Message
              </h3>

              {isSubmitted ? (
                <div className="text-center py-12">
                  <CheckCircle
                    className="mx-auto text-green-500 mb-4"
                    size={64}
                  />

                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Message Sent Successfully!
                  </h4>

                  <p className="text-gray-600 dark:text-gray-300">
                    Thank you for reaching out.
                    We&apos;ll get back to you
                    within 24 hours.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Full Name *
                    </label>

                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="Your full name"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email Address *
                    </label>

                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Subject *
                    </label>

                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="Project discussion"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Project Details *
                    </label>

                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                      placeholder="Tell us about your project..."
                    ></textarea>
                  </div>

                  {/* Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl font-semibold text-lg transform hover:scale-105 hover:-translate-y-1 disabled:opacity-70"
                  >
                    <Send
                      className="mr-2"
                      size={20}
                    />

                    {loading
                      ? 'Sending...'
                      : 'Send Message'}
                  </button>
                </form>
              )}
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Let’s Build Something That
                  Works
                </h3>

                <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                  Tell us about your business,
                  current challenges, or idea —
                  we’ll help you identify what
                  to build and how to move
                  forward.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {contactInfo.map(
                  (info, index) => (
                    <div
                      key={index}
                      className="group flex items-start space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-white dark:hover:bg-gray-600 transition-all duration-300 border border-gray-200 dark:border-gray-600 hover:shadow-lg hover:scale-105"
                    >
                      <div
                        className={`w-12 h-12 bg-gradient-to-br ${info.gradient} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                      >
                        <info.icon
                          className="text-white"
                          size={20}
                        />
                      </div>

                      <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                          {info.title}
                        </p>

                        <p className="text-gray-900 dark:text-white font-semibold mb-1">
                          {info.value}
                        </p>

                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          {info.description}
                        </p>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;