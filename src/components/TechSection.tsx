
'use client';

import { useState } from 'react';

interface Skill {
  name: string;
  level: 'low' | 'medium' | 'high';
  category: 'frontend' | 'backend' | 'database' | 'tools';
  color: string;
}

const skills: Skill[] = [
  { name: 'HTML, CSS & JavaScript', level: 'high', category: 'frontend', color: '#e34f26' },
  { name: 'TypeScript', level: 'high', category: 'frontend', color: '#3178c6' },
  { name: 'React & Next.js', level: 'high', category: 'frontend', color: '#61dafb' }, // Opcional: Juntarlos si siempre los usas en conjunto
  { name: 'Tailwind CSS', level: 'high', category: 'frontend', color: '#06b6d4' },
  { name: 'Three.js / R3F', level: 'medium', category: 'frontend', color: '#000000' }, // Más específico si usas React Three Fiber

  { name: 'Python (Django & FastAPI)', level: 'high', category: 'backend', color: '#3776ab' },
  { name: 'Node.js (Express)', level: 'medium', category: 'backend', color: '#339933' }, // Más específico si usas Express.js

  { name: 'SQL databases (PostgreSQL & SQLite)', level: 'medium', category: 'database', color: '#336791' },
  
  { name: 'Git & GitHub', level: 'high', category: 'tools', color: '#f05032' },
  { name: 'Vercel', level: 'high', category: 'tools', color: '#f05032' }
];

const TechSection = () => {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', 'frontend', 'backend', 'database', 'tools'];
  
  const filteredSkills = selectedCategory === 'all' 
    ? skills 
    : skills.filter(skill => skill.category === selectedCategory);

  const getLevelInfo = (level: 'low' | 'medium' | 'high') => {
    switch (level) {
      case 'low':
        return { 
          text: 'Básico', 
          color: 'bg-yellow-500 dark:bg-yellow-400',
          width: '33%',
          textColor: 'text-yellow-600 dark:text-yellow-400'
        };
      case 'medium':
        return { 
          text: 'Intermedium', 
          color: 'bg-orange-500 dark:bg-orange-400',
          width: '66%',
          textColor: 'text-orange-600 dark:text-orange-400'
        };
      case 'high':
        return { 
          text: 'Avanzado', 
          color: 'bg-green-500 dark:bg-green-400',
          width: '100%',
          textColor: 'text-green-600 dark:text-green-400'
        };
    }
  };

  return (
    <section id="tech" className="py-20 px-6 relative">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-space-grotesk font-bold text-gray-900 dark:text-cyber-lime mb-6">
            Technology Stack
          </h2>
          <p className="text-xl text-gray-600 dark:text-quantum-silver max-w-2xl mx-auto font-medium">
            Tech I Speak Fluently: Full-Stack Expertise
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
                  ? 'bg-sage-accent dark:bg-cyber-lime text-white dark:text-void-black shadow-lg'
                  : 'bg-white/70 dark:bg-neural-gray/50 text-gray-700 dark:text-quantum-silver hover:bg-sage-accent/20 dark:hover:bg-cyber-lime/20 hover:text-sage-accent dark:hover:text-cyber-lime border border-sage-accent/30 dark:border-transparent'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Skills grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill) => {
            const levelInfo = getLevelInfo(skill.level);
            
            return (
              <div
                key={skill.name}
                className="relative group bg-white/70 dark:bg-black/20 backdrop-blur-md p-6 rounded-lg border border-sage-accent/30 dark:border-cyber-lime/20 hover:border-sage-accent dark:hover:border-cyber-lime transition-all duration-300 shadow-sm"
                onMouseEnter={() => setHoveredSkill(skill.name)}
                onMouseLeave={() => setHoveredSkill(null)}
              >
                {/* Skill name and level */}
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-space-grotesk font-semibold text-gray-900 dark:text-quantum-silver group-hover:text-sage-accent dark:group-hover:text-cyber-lime transition-colors">
                    {skill.name}
                  </h3>
                  <span className={`font-bold ${levelInfo.textColor}`}>
                    {levelInfo.text}
                  </span>
                </div>

                {/* Progress bar */}
                <div className="relative h-2 bg-gray-300 dark:bg-neural-gray rounded-full overflow-hidden">
                  <div
                    className={`absolute top-0 left-0 h-full transition-all duration-1000 ease-out ${levelInfo.color}`}
                    style={{
                      width: hoveredSkill === skill.name ? levelInfo.width : '0%',
                    }}
                  />
                  {/* Glow effect */}
                  {hoveredSkill === skill.name && (
                    <div className={`absolute top-0 left-0 h-full w-full opacity-30 blur-sm ${levelInfo.color}`} />
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
            );
          })}
        </div>

        {/* Stats section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="text-center">
            <div className="text-4xl font-space-grotesk font-bold text-gray-900 dark:text-cyber-lime mb-2">10+</div>
            <div className="text-gray-600 dark:text-quantum-silver font-medium">Proyectos Completados</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-space-grotesk font-bold text-gray-900 dark:text-cyber-lime mb-2">2+</div>
            <div className="text-gray-600 dark:text-quantum-silver font-medium">Años de Experiencia</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-space-grotesk font-bold text-gray-900 dark:text-cyber-lime mb-2">24/7</div>
            <div className="text-gray-600 dark:text-quantum-silver font-medium">Disponibilidad</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechSection;
