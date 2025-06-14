
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
    title: "E-Commerce Neural",
    description: "Plataforma de comercio electrónico con IA para recomendaciones personalizadas y análisis predictivo de ventas.",
    technologies: ["React", "Node.js", "Python", "TensorFlow", "PostgreSQL"],
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&h=400&fit=crop",
    demoUrl: "https://demo.example.com",
    githubUrl: "https://github.com/example",
    category: "web"
  },
  {
    id: 2,
    title: "FinTech Quantum",
    description: "Aplicación financiera con blockchain para transacciones seguras y análisis de mercado en tiempo real.",
    technologies: ["Next.js", "Solidity", "Web3", "Chart.js", "MongoDB"],
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=400&fit=crop",
    demoUrl: "https://demo.example.com",
    githubUrl: "https://github.com/example",
    category: "web"
  },
  {
    id: 3,
    title: "AI Code Assistant",
    description: "Asistente de código inteligente que utiliza machine learning para sugerir optimizaciones y detectar errores.",
    technologies: ["Python", "OpenAI", "FastAPI", "React", "Docker"],
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop",
    demoUrl: "https://demo.example.com",
    githubUrl: "https://github.com/example",
    category: "ai"
  },
  {
    id: 4,
    title: "IoT Dashboard",
    description: "Dashboard en tiempo real para monitoreo de dispositivos IoT con alertas inteligentes y análisis de datos.",
    technologies: ["Vue.js", "Node.js", "MQTT", "InfluxDB", "Grafana"],
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=600&h=400&fit=crop",
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
          <h2 className="text-4xl md:text-6xl font-space-grotesk font-bold cyber-text mb-6">
            Galaxia de Proyectos
          </h2>
          <p className="text-xl text-quantum-silver max-w-3xl mx-auto">
            Explorando el cosmos digital a través de soluciones innovadoras que transforman ideas en realidades tecnológicas
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
                  ? 'bg-cyber-lime text-void-black shadow-[0_0_20px_#a4ff00]'
                  : 'bg-neural-gray/50 text-quantum-silver hover:bg-cyber-lime/20 hover:text-cyber-lime border border-transparent hover:border-cyber-lime/50'
              }`}
            >
              {category === 'all' ? 'Todos' : category.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group relative cyber-glass rounded-xl overflow-hidden hover:border-cyber-lime transition-all duration-500"
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
                    <div className="absolute inset-0 bg-cyber-lime/10" />
                    <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-cyber-lime animate-pulse" />
                    <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-cyber-lime animate-pulse" />
                    <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-cyber-lime animate-pulse" />
                    <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-cyber-lime animate-pulse" />
                  </>
                )}
              </div>

              {/* Project content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-2xl font-space-grotesk font-bold text-quantum-silver group-hover:text-cyber-lime transition-colors">
                    {project.title}
                  </h3>
                  <span className="px-3 py-1 text-xs font-inter font-medium bg-cyber-lime/20 text-cyber-lime rounded-full">
                    {project.category.toUpperCase()}
                  </span>
                </div>

                <p className="text-quantum-silver/80 font-inter mb-6 leading-relaxed">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-neural-gray/50 text-quantum-silver text-sm rounded-full font-inter border border-transparent group-hover:border-cyber-lime/30 transition-all duration-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action buttons */}
                <div className="flex gap-4">
                  {project.demoUrl && (
                    <CyberButton size="sm" onClick={() => window.open(project.demoUrl, '_blank')}>
                      Ver Demo
                    </CyberButton>
                  )}
                  {project.githubUrl && (
                    <CyberButton 
                      variant="secondary" 
                      size="sm" 
                      onClick={() => window.open(project.githubUrl, '_blank')}
                    >
                      Código
                    </CyberButton>
                  )}
                </div>
              </div>

              {/* Scanning line effect */}
              {hoveredProject === project.id && (
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyber-lime to-transparent animate-cyber-scan" />
              )}
            </div>
          ))}
        </div>

        {/* Call to action */}
        <div className="text-center mt-16">
          <p className="text-xl text-quantum-silver mb-8 font-inter">
            ¿Listo para crear algo extraordinario juntos?
          </p>
          <CyberButton 
            size="lg"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Iniciar Proyecto
          </CyberButton>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
