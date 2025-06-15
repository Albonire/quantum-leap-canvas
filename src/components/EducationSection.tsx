
'use client';

import { useState } from 'react';

interface Education {
  id: number;
  year: string;
  title: string;
  institution: string;
  description: string;
  type: 'degree' | 'certification' | 'course';
}

const educationData: Education[] = [
  {
    id: 1,
    year: '2019',
    title: 'Bachiller en Ciencias',
    institution: 'Instituto Tecnológico Superior',
    description: 'Enfoque en matemáticas y ciencias de la computación',
    type: 'degree'
  },
  {
    id: 2,
    year: '2020',
    title: 'Técnico en Programación',
    institution: 'Centro de Formación Digital',
    description: 'Fundamentos de programación y desarrollo web',
    type: 'certification'
  },
  {
    id: 3,
    year: '2021',
    title: 'Desarrollo Full Stack',
    institution: 'Academia de Programación',
    description: 'JavaScript, React, Node.js y bases de datos',
    type: 'course'
  },
  {
    id: 4,
    year: '2022',
    title: 'Ingeniería en Sistemas',
    institution: 'Universidad Tecnológica',
    description: 'Carrera universitaria en desarrollo de software',
    type: 'degree'
  },
  {
    id: 5,
    year: '2024',
    title: 'Especialización en DevOps',
    institution: 'Instituto de Tecnología Avanzada',
    description: 'Docker, AWS, CI/CD y automatización',
    type: 'certification'
  }
];

const EducationSection = () => {
  const [selectedEducation, setSelectedEducation] = useState<Education | null>(null);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'degree': return 'bg-cyber-lime';
      case 'certification': return 'bg-matrix-green';
      case 'course': return 'bg-neon-cyan';
      default: return 'bg-cyber-lime';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'degree': return '🎓';
      case 'certification': return '📜';
      case 'course': return '💻';
      default: return '🎓';
    }
  };

  return (
    <section id="education" className="py-16 px-6 relative">
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-space-grotesk font-bold cyber-text mb-4">
            Mi Formación
          </h2>
          <p className="text-lg text-quantum-silver/80 max-w-2xl mx-auto">
            El camino del aprendizaje continuo en tecnología
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Central timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-cyber-lime via-matrix-green to-neon-cyan opacity-30" />
          
          <div className="space-y-8">
            {educationData.map((education, index) => (
              <div
                key={education.id}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'justify-start' : 'justify-end'
                }`}
              >
                {/* Timeline connector */}
                <div className={`absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full border-2 border-cyber-lime z-10 ${
                  selectedEducation?.id === education.id 
                    ? 'bg-cyber-lime shadow-lg shadow-cyber-lime/50 scale-125' 
                    : 'bg-neural-gray'
                }`} />
                
                {/* Content card */}
                <div
                  className={`
                    w-5/12 cursor-pointer transition-all duration-300 group
                    ${index % 2 === 0 ? 'mr-auto pr-8' : 'ml-auto pl-8'}
                    ${selectedEducation?.id === education.id ? 'scale-105' : 'hover:scale-102'}
                  `}
                  onClick={() => setSelectedEducation(selectedEducation?.id === education.id ? null : education)}
                >
                  <div className={`
                    cyber-glass p-6 rounded-lg border transition-all duration-300
                    ${selectedEducation?.id === education.id 
                      ? 'border-cyber-lime bg-cyber-lime/10 shadow-lg shadow-cyber-lime/20' 
                      : 'border-cyber-lime/20 group-hover:border-cyber-lime/40'
                    }
                  `}>
                    {/* Year badge */}
                    <div className="flex items-center justify-between mb-4">
                      <span className={`
                        px-4 py-2 rounded-full text-sm font-bold text-void-black
                        ${getTypeColor(education.type)}
                      `}>
                        {education.year}
                      </span>
                      <span className="text-2xl">
                        {getTypeIcon(education.type)}
                      </span>
                    </div>
                    
                    {/* Content */}
                    <h3 className="text-xl font-space-grotesk font-bold text-quantum-silver mb-2 group-hover:text-cyber-lime transition-colors">
                      {education.title}
                    </h3>
                    <p className="text-cyber-lime font-medium mb-3">
                      {education.institution}
                    </p>
                    
                    {/* Expandable description */}
                    <div className={`
                      overflow-hidden transition-all duration-300
                      ${selectedEducation?.id === education.id ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'}
                    `}>
                      <div className="pt-3 border-t border-cyber-lime/20">
                        <p className="text-quantum-silver/80 text-sm leading-relaxed">
                          {education.description}
                        </p>
                        <span className="inline-block mt-2 px-2 py-1 text-xs font-medium bg-cyber-lime/20 text-cyber-lime rounded capitalize">
                          {education.type}
                        </span>
                      </div>
                    </div>
                    
                    {/* Click indicator */}
                    <div className="mt-3 text-center">
                      <span className="text-xs text-quantum-silver/60">
                        {selectedEducation?.id === education.id ? 'Click para contraer' : 'Click para expandir'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
