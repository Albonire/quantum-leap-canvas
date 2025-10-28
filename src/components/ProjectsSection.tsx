
'use client';

import { useState } from 'react';
import CyberButton from './CyberButton';

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  image: string;
  demoUrl?: string;
  githubUrl?: string;
  category: 'web' | 'mobile' | 'desktop' | 'ai';
}

const projects: Project[] = [
  {
    id: 1,
    title: "Task Manager",
    description: "Plataforma de gestión de tareas con pomodoro technique integration con su propia base de datos y autenticación de usuarios.",
    technologies: ["Django 5.2.1", "JavaScript", "Python", "HTML5 & CSS3", "SQLite3"],
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&h=400&fit=crop",
    demoUrl: "https://demo.example.com",
    githubUrl: "https://github.com/Albonire/To-DoList1.0",
    category: "web"
  },
  {
    id: 2,
    title: "BDI-GB-ZOO",
    description: "Sistema de gestión para un zoológico, con administración de animales, hábitats y cuidadores a través de una API RESTful y una interfaz web.",
    technologies: ["Python", "FastAPI", "PostgreSQL", "JavaScript", "Bootstrap", "Docker"],
    image: "https://images.unsplash.com/photo-1550854043-ee4c44b62035?w=600&h=400&fit=crop",
    githubUrl: "https://github.com/Albonire/BDI-GB-ZOO",
    category: "web"
  },
  {
    id: 3,
    title: "IA Humanizer",
    description: "Orquestador para la humanización de textos generados por IA, transformándolos en versiones más naturales y humanas.",
    technologies: ["Vite", "TypeScript", "React", "shadcn-ui", "Tailwind CSS"],
    image: "https://images.unsplash.com/photo-1507146426996-ef05306b995a?w=600&h=400&fit=crop",
    githubUrl: "https://github.com/Albonire/ia-humanizer",
    category: "ai"
  },
  {
    id: 4,
    title: "Home Button (GNOME Extension)",
    description: "Extensión para GNOME Shell que añade un botón para minimizar todas las ventanas y mostrar el escritorio con un solo clic.",
    technologies: ["JavaScript", "GNOME Shell", "GJS"],
    image: "https://images.unsplash.com/photo-1588507914493-59603a45a0e4?w=600&h=400&fit=crop",
    githubUrl: "https://github.com/Albonire/home-button",
    category: "desktop"
  },
    {
    id: 5,
    title: "Cupido App (Full-Stack)",
    description: "Aplicación de citas full-stack. Frontend desarrollado con React y Vite, y backend API RESTful construido con Python, Django y DRF.",
    technologies: ["React", "Vite", "TypeScript", "Python", "Django", "DRF"],
    image: "https://images.unsplash.com/photo-1527719327859-c6ce80353573?w=600&h=400&fit=crop",
    githubUrl: "https://github.com/cupidoUP-App",
    category: "web"
  },
  {
    id: 6,
    title: "Quantum Leap Canvas",
    description: "Mi portafolio web de alto rendimiento para mostrar habilidades, proyectos y experiencia profesional como desarrollador Full Stack.",
    technologies: ["Vite", "TypeScript", "React", "shadcn-ui", "Tailwind CSS"],
    image: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=600&h=400&fit=crop",
    githubUrl: "https://github.com/Albonire/quantum-leap-canvas",
    category: "web"
  },
];

const ProjectsSection = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const categories = ['all', 'web', 'mobile', 'desktop', 'ai'];
  
  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  return (
    <section id="projects" className="py-20 px-6 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-space-grotesk font-bold mb-6 text-sage-accent dark:text-cyber-lime">
            Digital Cosmos
          </h2>
          <p className="text-xl max-w-3xl mx-auto text-gray-900 dark:text-quantum-silver font-medium">
            Innovative Solutions Where Ideas Become Reality
          </p>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full font-space-grotesk font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-sage-accent dark:bg-cyber-lime text-white dark:text-void-black shadow-[0_0_20px_#6b8e6b] dark:shadow-[0_0_20px_#a4ff00]'
                  : 'bg-gray-200/80 dark:bg-neural-gray/50 text-gray-800 dark:text-quantum-silver hover:bg-sage-accent/20 dark:hover:bg-cyber-lime/20 hover:text-sage-accent dark:hover:text-cyber-lime border border-transparent hover:border-sage-accent/50 dark:hover:border-cyber-lime/50'
              }`}
            >
              {category === 'all' ? 'All' : category.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group relative bg-white/90 dark:bg-neural-gray/30 backdrop-blur-md border border-gray-300 dark:border-cyber-lime/20 rounded-xl overflow-hidden hover:border-sage-accent dark:hover:border-cyber-lime transition-all duration-500 shadow-lg"
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              {/* Project image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-void-black/90 via-void-black/50 to-transparent" />
                
                {/* Hover effects */}
                {hoveredProject === project.id && (
                  <>
                    <div className="absolute inset-0 bg-sage-accent/10 dark:bg-cyber-lime/10" />
                    <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-sage-accent dark:border-cyber-lime animate-pulse" />
                    <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-sage-accent dark:border-cyber-lime animate-pulse" />
                    <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-sage-accent dark:border-cyber-lime animate-pulse" />
                    <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-sage-accent dark:border-cyber-lime animate-pulse" />
                  </>
                )}
              </div>

              {/* Project content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-2xl font-space-grotesk font-bold text-gray-800 dark:text-quantum-silver group-hover:text-sage-accent dark:group-hover:text-cyber-lime transition-colors">
                    {project.title}
                  </h3>
                  <span className="px-3 py-1 text-xs font-inter font-medium bg-sage-accent/20 dark:bg-cyber-lime/20 text-sage-accent dark:text-cyber-lime rounded-full">
                    {project.category.toUpperCase()}
                  </span>
                </div>

                <p className="text-gray-700 dark:text-quantum-silver/80 font-inter mb-6 leading-relaxed">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-gray-200/80 dark:bg-neural-gray/50 text-gray-800 dark:text-quantum-silver text-sm rounded-full font-inter border border-transparent group-hover:border-sage-accent/30 dark:group-hover:border-cyber-lime/30 transition-all duration-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action buttons */}
                <div className="flex gap-4">
                  {project.demoUrl && (
                    <CyberButton size="sm" onClick={() => window.open(project.demoUrl, '_blank')}>
                      View Demo
                    </CyberButton>
                  )}
                  {project.githubUrl && (
                    <CyberButton 
                      variant="secondary" 
                      size="sm" 
                      onClick={() => window.open(project.githubUrl, '_blank')}
                    >
                      Source Code
                    </CyberButton>
                  )}
                </div>
              </div>

              {/* Scanning line effect */}
              {hoveredProject === project.id && (
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-sage-accent dark:via-cyber-lime to-transparent animate-cyber-scan" />
              )}
            </div>
          ))}
        </div>

        {/* Call to action */}
        <div className="text-center mt-16">
          <p className="text-xl mb-8 font-inter font-medium text-gray-900 dark:text-quantum-silver">
            Ready to create something extraordinary together?
          </p>
          <CyberButton 
            size="lg"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Start Project
          </CyberButton>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
