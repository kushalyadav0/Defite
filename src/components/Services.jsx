import React, { useEffect, useRef } from 'react';
import { Code, Server, Brain, Shield, ArrowRight, Layers } from 'lucide-react';

const Services = () => {
  const servicesRef = useRef(null);

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

    if (servicesRef.current) {
      observer.observe(servicesRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const services = [
    {
      title: 'Web & Product Development',
      icon: Code,
      description: [
        'Corporate websites',
        'Customer portals',
        'SaaS platforms',
        'Ecommerce Solutions'
      ],
      technologies: ['React.js', 'Tailwind CSS', 'HTML5', 'CSS3', 'JavaScript', 'Next.js', 'Vue.js'],
      gradient: 'from-blue-500 to-cyan-600',
      bgGradient: 'from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20'
    },
    {
      title: 'Enterprise Solutions',
      icon: Server,
      description: [
        'CRM Systems',
        'ERP Solutions',
        'Internal Dashboards',
        'Workflow Automation'
      ],
      technologies: ['Python', 'Django', 'Flask', 'PostgreSQL', 'Node.js', 'GraphQL'],
      gradient: 'from-green-500 to-emerald-600',
      bgGradient: 'from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20'
    },
    {
      title: 'Automation & AI',
      icon: Brain,
      description: [
        'WhatsApp & email automation',
        'Lead tracking & follow-ups',
        'AI chatbots & support systems'
      ],
      technologies: ['RAG Pipelines', 'AI Agents', 'LangChain', 'TensorFlow', 'PyTorch', 'OpenAI'],
      gradient: 'from-purple-500 to-violet-600',
      bgGradient: 'from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20'
    },
    {
      title: 'Product & MVP Development',
      icon: Layers,
      description: [
        'Build and launch new ideas',
        'Rapid prototyping',
        'Scalable product architecture'
      ],
      technologies: ['Figma', 'Next.js', 'React.js', 'Node.js', 'FastAPI', 'Docker'],
      gradient: 'from-indigo-500 to-sky-600',
      bgGradient: 'from-indigo-50 to-sky-50 dark:from-indigo-900/20 dark:to-sky-900/20'
    },
    {
      title: 'Data & Analytics',
      icon: Shield,
      description: [
        'BI Dashboards',
        'Reporting',
        'Data Warehousing',
        'ETL Pipelines'
      ],
      technologies: ['Monitoring', 'CI/CD', 'Cloud Security', 'AWS', 'Kubernetes', 'Logging'],
      gradient: 'from-orange-500 to-red-600',
      bgGradient: 'from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20'
    }
  ];

  return (
    <section id="services" className="py-20 bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-40 -right-20 w-80 h-80 bg-gradient-to-br from-blue-200/30 to-purple-200/30 dark:from-blue-800/20 dark:to-purple-800/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-gradient-to-br from-purple-200/30 to-pink-200/30 dark:from-purple-800/20 dark:to-pink-800/20 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div ref={servicesRef} className="opacity-0 transform translate-y-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Our{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Solutions
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-8 rounded-full"></div>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
            We deliver end-to-end software solutions tailored to business needs, from enterprise applications and cloud platforms to AI-driven automation and digital products.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div 
                key={index} 
                className={`group bg-gradient-to-br ${service.bgGradient} rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 p-8 border border-gray-200 dark:border-gray-700 transform hover:scale-105 hover:-translate-y-2 relative overflow-hidden`}
              >
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-white/5 dark:bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                
                <div className="relative z-10">
                  <div className={`w-16 h-16 bg-gradient-to-br ${service.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg`}>
                    <service.icon className="text-white" size={28} />
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                    {service.title}
                  </h3>

                  <div className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    <ul className="list-disc list-inside space-y-3">
                      {service.description.map((item, index) =>
                        typeof item === 'string' ? (
                          <li key={index}>{item}</li>
                        ) : (
                          <li key={index} className="list-none space-y-2">
                            <p className="font-semibold text-gray-900 dark:text-white">
                              {item.heading}
                            </p>
                            <ul className="list-disc list-inside ml-6 space-y-1 text-sm text-gray-700 dark:text-gray-300">
                              {item.items.map((subItem, subIndex) => (
                                <li key={subIndex}>{subItem}</li>
                              ))}
                            </ul>
                          </li>
                        )
                      )}
                    </ul>
                  </div>

                  <button className="group/btn flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 font-semibold transition-all duration-200 hover:translate-x-2">
                    Learn More
                    <ArrowRight className="ml-2 group-hover/btn:translate-x-1 transition-transform duration-200" size={16} />
                  </button>

                  <div className="mt-6">
                    <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-3 uppercase tracking-wide">
                      Technologies & Tools
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {service.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="inline-block bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 text-sm px-3 py-1 rounded-full border border-gray-200 dark:border-gray-600 hover:bg-white dark:hover:bg-gray-700 transition-all duration-200 hover:scale-105 shadow-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-700 max-w-3xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Ready to Start Your Project?
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Let's discuss how our services can help bring your vision to life.
              </p>
              <button 
                onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl font-semibold transform hover:scale-105"
              >
                Get Started Today
                <ArrowRight className="ml-2" size={16} />
              </button>
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

export default Services;