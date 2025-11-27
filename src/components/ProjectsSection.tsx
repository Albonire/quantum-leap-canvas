
'use client';

import { useState } from 'react';
import CyberButton from './CyberButton';
import ProjectCard from './ProjectCard';
import { projects } from '@/data/projects';

const ProjectsSection = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

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
            <ProjectCard key={project.id} project={project} />
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
