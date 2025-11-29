
import { useState } from 'react';
import CyberButton from './CyberButton';
import { Project } from '@/data/projects';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group relative bg-white/90 dark:bg-neural-gray/30 backdrop-blur-md border border-gray-300 dark:border-cyber-lime/20 rounded-xl overflow-hidden hover:border-sage-accent dark:hover:border-cyber-lime transition-all duration-500 shadow-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Project media (Image or Video) */}
      <div className="relative aspect-video overflow-hidden">
        {project.video ? (
          <video
            src={project.video}
            poster={project.image}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-contain bg-black transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        )}
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-void-black/90 via-void-black/50 to-transparent" />
        
        {/* Hover effects */}
        {isHovered && (
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
      {isHovered && (
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-sage-accent dark:via-cyber-lime to-transparent animate-cyber-scan" />
      )}
    </div>
  );
};

export default ProjectCard;
