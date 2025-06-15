
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
      case 'degree': return 'bg-sage-accent dark:bg-cyber-lime';
      case 'certification': return 'bg-mint-accent dark:bg-matrix-green';
      case 'course': return 'bg-emerald-accent dark:bg-neon-cyan';
      default: return 'bg-sage-accent dark:bg-cyber-lime';
    }
  };

  return (
    <section id="education" className="py-12 px-6 relative">
      <div className="max-w-4xl mx-auto">
        {/* Section header - más compacto */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-space-grotesk font-bold text-charcoal dark:text-cyber-lime mb-3">
            Mi Formación
          </h2>
          <p className="text-base text-steel-gray dark:text-quantum-silver/80 max-w-2xl mx-auto">
            El camino del aprendizaje continuo en tecnología
          </p>
        </div>

        {/* Grid layout más compacto */}
        <div className="grid gap-4 md:gap-6">
          {educationData.map((education) => (
            <div
              key={education.id}
              className="cursor-pointer transition-all duration-300 group"
              onClick={() => setSelectedEducation(selectedEducation?.id === education.id ? null : education)}
            >
              <div className={`
                bg-white/40 dark:bg-black/20 backdrop-blur-md p-4 md:p-5 rounded-lg border transition-all duration-300 shadow-sm
                ${selectedEducation?.id === education.id 
                  ? 'border-sage-accent dark:border-cyber-lime bg-sage-accent/10 dark:bg-cyber-lime/10 shadow-lg shadow-sage-accent/20 dark:shadow-cyber-lime/20' 
                  : 'border-sage-accent/20 dark:border-cyber-lime/20 group-hover:border-sage-accent/40 dark:group-hover:border-cyber-lime/40'
                }
              `}>
                {/* Header compacto */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-4">
                    <span className={`
                      px-3 py-1 rounded-full text-sm font-bold text-charcoal dark:text-void-black
                      ${getTypeColor(education.type)}
                    `}>
                      {education.year}
                    </span>
                    <div>
                      <h3 className="text-lg font-space-grotesk font-bold text-charcoal dark:text-quantum-silver group-hover:text-sage-accent dark:group-hover:text-cyber-lime transition-colors">
                        {education.title}
                      </h3>
                      <p className="text-sage-accent dark:text-cyber-lime font-medium text-sm">
                        {education.institution}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-medium bg-sage-accent/20 dark:bg-cyber-lime/20 text-sage-accent dark:text-cyber-lime rounded px-2 py-1 capitalize">
                    {education.type}
                  </span>
                </div>
                
                {/* Descripción expandible más compacta */}
                <div className={`
                  overflow-hidden transition-all duration-300
                  ${selectedEducation?.id === education.id ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'}
                `}>
                  <div className="pt-2 border-t border-sage-accent/20 dark:border-cyber-lime/20">
                    <p className="text-steel-gray dark:text-quantum-silver/80 text-sm leading-relaxed">
                      {education.description}
                    </p>
                  </div>
                </div>
                
                {/* Indicador más sutil */}
                <div className="mt-2 text-center">
                  <span className="text-xs text-steel-gray/40 dark:text-quantum-silver/40">
                    {selectedEducation?.id === education.id ? '▲' : '▼'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
