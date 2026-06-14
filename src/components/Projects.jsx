import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, ExternalLink, Github } from 'lucide-react';
import { getProjects } from '../services/project.service';

const Projects = () => {
  const projectsRef = useRef(null);

  const [projects, setProjects] = useState([]);

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

    if (projectsRef.current) {
      observer.observe(projectsRef.current);
    }

    const fetchProjects = async () => {
      try {
        const data = await getProjects();
        setProjects(data || []);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProjects();

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="projects"
      className="py-20 bg-white dark:bg-gray-800 relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-10 w-72 h-72 bg-gradient-to-br from-blue-100/40 to-purple-100/40 dark:from-blue-900/20 dark:to-purple-900/20 rounded-full blur-3xl"></div>

        <div className="absolute bottom-20 left-10 w-72 h-72 bg-gradient-to-br from-purple-100/40 to-pink-100/40 dark:from-purple-900/20 dark:to-pink-900/20 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div
          ref={projectsRef}
          className="opacity-0 transform translate-y-10"
        >
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Featured{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Projects
              </span>
            </h2>

            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-8 rounded-full"></div>

            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Explore some of our recent work that demonstrates our expertise
              across various domains and technologies.
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div
                key={project._id}
                className="group bg-gray-50 dark:bg-gray-700 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-200 dark:border-gray-600 transform hover:scale-105 hover:-translate-y-2"
              >
                {/* Image */}
                <div className="relative overflow-hidden">
<img
  src={
    project.thumbnail
      ? formatImageUrl(
          project.thumbnail
        )
      : '/fallback-project.png'
  }
  alt={project.title}
  onError={(e) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src =
      '/fallback-project.png';
  }}
  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
/>

                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {/* Category */}
                  <div className="absolute top-4 left-4">
                    <span
                      className={`inline-block bg-gradient-to-r ${
                        project.gradient ||
                        'from-blue-500 to-purple-600'
                      } text-white text-xs px-3 py-1 rounded-full font-semibold shadow-lg`}
                    >
                      {project.category}
                    </span>
                  </div>

                  {/* Hover Actions */}
                  <div className="absolute bottom-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    {project.projectUrl && (
                      <a
                        href={project.projectUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 bg-white/90 dark:bg-gray-800/90 rounded-full hover:bg-white dark:hover:bg-gray-800 transition-colors duration-200 shadow-lg hover:scale-110"
                      >
                        <ExternalLink
                          size={16}
                          className="text-gray-700 dark:text-gray-300"
                        />
                      </a>
                    )}

                    <button className="p-2 bg-white/90 dark:bg-gray-800/90 rounded-full hover:bg-white dark:hover:bg-gray-800 transition-colors duration-200 shadow-lg hover:scale-110">
                      <Github
                        size={16}
                        className="text-gray-700 dark:text-gray-300"
                      />
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                    {project.title}
                  </h3>

                  <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed text-sm">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {project.technologies?.map(
                        (tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="inline-block bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 text-xs px-2 py-1 rounded-full font-medium border border-blue-200 dark:border-blue-800"
                          >
                            {tech}
                          </span>
                        )
                      )}
                    </div>
                  </div>

                  {/* CTA */}
                  <button className="group/btn flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 font-semibold transition-all duration-200 hover:translate-x-2">
                    View Project

                    <ArrowRight
                      className="ml-2 group-hover/btn:translate-x-1 transition-transform duration-200"
                      size={16}
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-600 rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-600 max-w-3xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Have a Project in Mind?
              </h3>

              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Let's collaborate to bring your ideas to life.
              </p>

              <button
                onClick={() =>
                  document
                    .getElementById('contact')
                    .scrollIntoView({
                      behavior: 'smooth',
                    })
                }
                className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl font-semibold transform hover:scale-105"
              >
                Start Your Project

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

export default Projects;