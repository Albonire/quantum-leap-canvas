
'use client';

import { useState, useEffect, useRef } from 'react';
import CyberButton from './CyberButton';
import { ExternalLink } from 'lucide-react';

interface Education {
  id: number;
  year: string;
  title: string;
  institution: string;
  description: string;
  type: 'degree' | 'certification' | 'course';
  certificateUrl?: string;
}

const educationData: Education[] = [
  {
    id: 1,
    year: '2019',
    title: 'Bachiller Técnico',
    institution: 'Instituto Tecnico Industrial Francisco de Paula Santander',
    description: 'Enfoque en electrónica y mecánica industrial',
    type: 'degree',
    certificateUrl: 'https://example.com/certificate1'
  },
  {
    id: 2,
    year: '2020',
    title: 'Técnico en Programación',
    institution: 'Centro de Formación Digital',
    description: 'Fundamentos de programación y desarrollo web',
    type: 'certification',
    certificateUrl: 'https://example.com/certificate2'
  },
  {
    id: 3,
    year: '2021',
    title: 'Desarrollo Full Stack',
    institution: 'Academia de Programación',
    description: 'JavaScript, React, Node.js y bases de datos',
    type: 'course',
    certificateUrl: 'https://example.com/certificate3'
  },
  {
    id: 4,
    year: '2022',
    title: 'Ingeniería en Sistemas',
    institution: 'Universidad Tecnológica',
    description: 'Carrera universitaria en desarrollo de software',
    type: 'degree',
    certificateUrl: 'https://example.com/certificate4'
  },
  {
    id: 5,
    year: '2024',
    title: 'Programming Bootcamp',
    institution: 'Instituto de Tecnología Avanzada',
    description: 'TypeScript, React, Node.js, Next.js, Tailwind CSS, and more',
    type: 'certification',
    certificateUrl: 'https://certificadotech.tiiny.site'
  }
];

const EducationSection = () => {
  const [selectedEducation, setSelectedEducation] = useState<Education | null>(null);
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'degree': return 'bg-sage-accent dark:bg-cyber-lime';
      case 'certification': return 'bg-mint-accent dark:bg-matrix-green';
      case 'course': return 'bg-emerald-accent dark:bg-neon-cyan';
      default: return 'bg-sage-accent dark:bg-cyber-lime';
    }
  };

  const handleViewCertificate = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const itemId = parseInt(entry.target.getAttribute('data-item-id') || '0');
            setVisibleItems(prev => {
              if (!prev.includes(itemId)) {
                return [...prev, itemId];
              }
              return prev;
            });
          }
        });
      },
      { threshold: 0.2, rootMargin: '20px' }
    );

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    const items = document.querySelectorAll('.education-item');
    items.forEach((item) => {
      if (observerRef.current) {
        observerRef.current.observe(item);
      }
    });

    return () => {
      if (observerRef.current) {
        items.forEach((item) => {
          observerRef.current?.unobserve(item);
        });
      }
    };
  }, []);

  return (
    <section id="education" className="py-8 sm:py-12 px-3 sm:px-4 md:px-6 relative">
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-space-grotesk font-bold text-gray-900 dark:text-cyber-lime mb-2 sm:mb-3">
            Mi Formación
          </h2>
          <p className="text-sm sm:text-base text-gray-600 dark:text-quantum-silver/80 max-w-2xl mx-auto font-medium px-2">
            El camino del aprendizaje continuo en tecnología
          </p>
        </div>

        {/* Original layout with responsive fixes */}
        <div className="grid gap-3 sm:gap-4 md:gap-6">
          {educationData.map((education, index) => {
            const isVisible = visibleItems.includes(education.id);
            
            return (
              <div
                key={education.id}
                data-item-id={education.id}
                className={`education-item cursor-pointer group will-change-transform transition-all duration-500 ease-out transform ${
                  isVisible 
                    ? 'translate-x-0 opacity-100' 
                    : index % 2 === 0 
                      ? '-translate-x-8 opacity-0' 
                      : 'translate-x-8 opacity-0'
                }`}
                style={{
                  transitionDelay: isVisible ? `${index * 100}ms` : '0ms',
                  transitionProperty: 'transform, opacity'
                }}
                onClick={() => setSelectedEducation(selectedEducation?.id === education.id ? null : education)}
              >
                <div className={`
                  bg-white/70 dark:bg-black/20 backdrop-blur-md p-3 sm:p-4 md:p-5 rounded-lg border transition-all duration-300 shadow-sm transform-gpu
                  ${selectedEducation?.id === education.id 
                    ? 'border-sage-accent dark:border-cyber-lime bg-sage-accent/10 dark:bg-cyber-lime/10 shadow-lg shadow-sage-accent/20 dark:shadow-cyber-lime/20 scale-[1.02]' 
                    : 'border-sage-accent/30 dark:border-cyber-lime/20 group-hover:border-sage-accent/60 dark:group-hover:border-cyber-lime/40 hover:scale-[1.01]'
                  }
                `}>
                  {/* Header - original layout with responsive improvements */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3 mb-2 sm:mb-3">
                    <div className="flex items-start sm:items-center gap-2 sm:gap-4 flex-1 min-w-0">
                      <span className={`
                        px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-bold text-white dark:text-void-black transition-all duration-300 flex-shrink-0
                        ${getTypeColor(education.type)}
                      `}>
                        {education.year}
                      </span>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm sm:text-lg font-space-grotesk font-bold text-gray-900 dark:text-quantum-silver group-hover:text-sage-accent dark:group-hover:text-cyber-lime transition-colors duration-300 leading-tight">
                          {education.title}
                        </h3>
                        <p className="text-sage-accent dark:text-cyber-lime font-medium text-xs sm:text-sm transition-colors duration-300 leading-tight mt-0.5 sm:mt-1 break-words">
                          {education.institution}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 sm:gap-3 justify-end flex-shrink-0">
                      <span className="text-xs font-medium bg-sage-accent/20 dark:bg-cyber-lime/20 text-sage-accent dark:text-cyber-lime rounded px-2 py-1 capitalize transition-all duration-300">
                        {education.type}
                      </span>
                      
                      {education.certificateUrl && (
                        <CyberButton
                          size="sm"
                          variant="ghost"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewCertificate(education.certificateUrl!);
                          }}
                          className="min-w-0 px-2 sm:px-3 h-7 sm:h-8"
                        >
                          <ExternalLink size={12} className="sm:w-3.5 sm:h-3.5" />
                          <span className="hidden sm:inline ml-1 text-xs">Ver</span>
                        </CyberButton>
                      )}
                    </div>
                  </div>
                  
                  {/* Description - expandable */}
                  <div className={`
                    overflow-hidden transition-all duration-400 ease-in-out
                    ${selectedEducation?.id === education.id ? 'max-h-20 sm:max-h-24 opacity-100' : 'max-h-0 opacity-0'}
                  `}>
                    <div className="pt-2 border-t border-sage-accent/30 dark:border-cyber-lime/20 transition-colors duration-300">
                      <p className="text-gray-600 dark:text-quantum-silver/80 text-xs sm:text-sm leading-relaxed font-medium">
                        {education.description}
                      </p>
                    </div>
                  </div>
                  
                  {/* Expand indicator */}
                  <div className="mt-1 sm:mt-2 text-center">
                    <span className={`text-xs transition-all duration-300 transform ${
                      selectedEducation?.id === education.id 
                        ? 'text-sage-accent dark:text-cyber-lime rotate-180' 
                        : 'text-gray-400 dark:text-quantum-silver/40 rotate-0'
                    }`}>
                      ▼
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
