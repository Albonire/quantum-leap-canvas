
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
  const [selectedEducation, setSelectedEducation] = useState<Education | null>(educationData[0]);

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
    <section id="education" className="py-20 px-6 relative">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-space-grotesk font-bold cyber-text mb-6">
            Mi Formación
          </h2>
          <p className="text-xl text-quantum-silver max-w-2xl mx-auto">
            El camino del aprendizaje continuo en tecnología
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Timeline */}
          <div className="relative">
            <h3 className="text-2xl font-space-grotesk font-bold text-cyber-lime mb-8">
              Línea Temporal
            </h3>
            
            {/* Timeline line */}
            <div className="absolute left-6 top-20 bottom-0 w-0.5 bg-gradient-to-b from-cyber-lime via-matrix-green to-cyber-lime opacity-50" />
            
            <div className="space-y-8">
              {educationData.map((education, index) => (
                <div
                  key={education.id}
                  className={`relative flex items-center cursor-pointer group transition-all duration-300 ${
                    selectedEducation?.id === education.id ? 'scale-105' : 'hover:scale-102'
                  }`}
                  onClick={() => setSelectedEducation(education)}
                >
                  {/* Timeline dot */}
                  <div className={`
                    relative z-10 w-12 h-12 rounded-full border-2 border-cyber-lime flex items-center justify-center
                    transition-all duration-300 ${
                      selectedEducation?.id === education.id 
                        ? 'bg-cyber-lime scale-110 shadow-lg shadow-cyber-lime/50' 
                        : 'bg-neural-gray group-hover:bg-cyber-lime/20'
                    }
                  `}>
                    <span className="text-lg">
                      {selectedEducation?.id === education.id ? '✨' : getTypeIcon(education.type)}
                    </span>
                  </div>
                  
                  {/* Content */}
                  <div className={`ml-6 cyber-glass p-4 rounded-lg flex-1 transition-all duration-300 ${
                    selectedEducation?.id === education.id ? 'border-cyber-lime bg-cyber-lime/5' : ''
                  }`}>
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`
                        px-3 py-1 rounded-full text-xs font-bold text-void-black
                        ${getTypeColor(education.type)}
                      `}>
                        {education.year}
                      </span>
                      <span className="text-cyber-lime text-sm font-medium capitalize">
                        {education.type}
                      </span>
                    </div>
                    <h4 className="font-space-grotesk font-semibold text-quantum-silver group-hover:text-cyber-lime transition-colors">
                      {education.title}
                    </h4>
                    <p className="text-sm text-quantum-silver/70 mt-1">
                      {education.institution}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Detailed view */}
          <div className="lg:sticky lg:top-8 lg:self-start">
            <h3 className="text-2xl font-space-grotesk font-bold text-cyber-lime mb-8">
              Detalles
            </h3>
            
            {selectedEducation && (
              <div className="cyber-glass p-8 rounded-lg border-cyber-lime/30">
                <div className="flex items-center gap-4 mb-6">
                  <div className={`
                    w-16 h-16 rounded-full flex items-center justify-center text-2xl
                    ${getTypeColor(selectedEducation.type)}
                  `}>
                    {getTypeIcon(selectedEducation.type)}
                  </div>
                  <div>
                    <span className={`
                      px-4 py-1 rounded-full text-sm font-bold text-void-black
                      ${getTypeColor(selectedEducation.type)}
                    `}>
                      {selectedEducation.year}
                    </span>
                  </div>
                </div>
                
                <h4 className="text-2xl font-space-grotesk font-bold text-quantum-silver mb-3">
                  {selectedEducation.title}
                </h4>
                
                <p className="text-cyber-lime font-medium mb-4">
                  {selectedEducation.institution}
                </p>
                
                <p className="text-quantum-silver/80 leading-relaxed">
                  {selectedEducation.description}
                </p>
                
                <div className="mt-6 pt-6 border-t border-cyber-lime/20">
                  <span className="inline-block px-3 py-1 text-xs font-inter font-medium bg-cyber-lime/20 text-cyber-lime rounded-full capitalize">
                    {selectedEducation.type}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
