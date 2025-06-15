
'use client';

import { useState } from 'react';

interface Skill {
  name: string;
  level: number;
  category: 'frontend' | 'backend' | 'database' | 'tools';
  color: string;
}

const skills: Skill[] = [
  { name: 'React', level: 95, category: 'frontend', color: '#61dafb' },
  { name: 'TypeScript', level: 90, category: 'frontend', color: '#3178c6' },
  { name: 'Next.js', level: 88, category: 'frontend', color: '#000000' },
  { name: 'Node.js', level: 85, category: 'backend', color: '#339933' },
  { name: 'Python', level: 92, category: 'backend', color: '#3776ab' },
  { name: 'Java', level: 80, category: 'backend', color: '#ed8b00' },
  { name: 'PostgreSQL', level: 87, category: 'database', color: '#336791' },
  { name: 'MongoDB', level: 83, category: 'database', color: '#47a248' },
  { name: 'Docker', level: 85, category: 'tools', color: '#2496ed' },
  { name: 'AWS', level: 78, category: 'tools', color: '#ff9900' },
];

const TechSection = () => {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', 'frontend', 'backend', 'database', 'tools'];
  
  const filteredSkills = selectedCategory === 'all' 
    ? skills 
    : skills.filter(skill => skill.category === selectedCategory);

  return (
    <section id="tech" className="py-20 px-6 relative">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-space-grotesk font-bold text-charcoal dark:text-cyber-lime mb-6">
            Arsenal Tecnológico
          </h2>
          <p className="text-xl text-steel-gray dark:text-quantum-silver max-w-2xl mx-auto">
            Dominando las tecnologías que impulsan el futuro digital
          </p>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-space-grotesk font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-sage-accent dark:bg-cyber-lime text-charcoal dark:text-void-black'
                  : 'bg-white/40 dark:bg-neural-gray/50 text-charcoal dark:text-quantum-silver hover:bg-sage-accent/20 dark:hover:bg-cyber-lime/20 hover:text-sage-accent dark:hover:text-cyber-lime border border-sage-accent/20 dark:border-transparent'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Skills grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill) => (
            <div
              key={skill.name}
              className="relative group bg-white/40 dark:bg-black/20 backdrop-blur-md p-6 rounded-lg border border-sage-accent/20 dark:border-cyber-lime/20 hover:border-sage-accent dark:hover:border-cyber-lime transition-all duration-300 shadow-sm"
              onMouseEnter={() => setHoveredSkill(skill.name)}
              onMouseLeave={() => setHoveredSkill(null)}
            >
              {/* Skill name and percentage */}
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-space-grotesk font-semibold text-charcoal dark:text-quantum-silver group-hover:text-sage-accent dark:group-hover:text-cyber-lime transition-colors">
                  {skill.name}
                </h3>
                <span className="text-sage-accent dark:text-cyber-lime font-bold">{skill.level}%</span>
              </div>

              {/* Progress bar */}
              <div className="relative h-2 bg-steel-gray/30 dark:bg-neural-gray rounded-full overflow-hidden">
                <div
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-sage-accent to-mint-accent dark:from-cyber-lime dark:to-matrix-green transition-all duration-1000 ease-out"
                  style={{
                    width: hoveredSkill === skill.name ? `${skill.level}%` : '0%',
                  }}
                />
                {/* Glow effect */}
                {hoveredSkill === skill.name && (
                  <div className="absolute top-0 left-0 h-full w-full bg-sage-accent dark:bg-cyber-lime opacity-30 blur-sm" />
                )}
              </div>

              {/* Category badge */}
              <div className="mt-4">
                <span className="inline-block px-3 py-1 text-xs font-inter font-medium bg-sage-accent/20 dark:bg-cyber-lime/20 text-sage-accent dark:text-cyber-lime rounded-full">
                  {skill.category}
                </span>
              </div>

              {/* Hover effect overlay */}
              {hoveredSkill === skill.name && (
                <div className="absolute inset-0 bg-sage-accent/5 dark:bg-cyber-lime/5 rounded-lg pointer-events-none" />
              )}

              {/* Corner accents */}
              <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-sage-accent dark:border-cyber-lime opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-sage-accent dark:border-cyber-lime opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-sage-accent dark:border-cyber-lime opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-sage-accent dark:border-cyber-lime opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>

        {/* Stats section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="text-center">
            <div className="text-4xl font-space-grotesk font-bold text-charcoal dark:text-cyber-lime mb-2">10+</div>
            <div className="text-steel-gray dark:text-quantum-silver">Proyectos Completados</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-space-grotesk font-bold text-charcoal dark:text-cyber-lime mb-2">2+</div>
            <div className="text-steel-gray dark:text-quantum-silver">Años de Experiencia</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-space-grotesk font-bold text-charcoal dark:text-cyber-lime mb-2">24/7</div>
            <div className="text-steel-gray dark:text-quantum-silver">Disponibilidad</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechSection;
