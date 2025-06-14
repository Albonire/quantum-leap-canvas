
'use client';

import { useState } from 'react';
import CyberButton from './CyberButton';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [terminalLines, setTerminalLines] = useState([
    '> Sistema de comunicación inicializado...',
    '> Estableciendo conexión segura...',
    '> Esperando input del usuario...'
  ]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate terminal processing
    const processingLines = [
      '> Procesando mensaje...',
      '> Encriptando datos...',
      '> Transmitiendo a servidor...',
      '> Mensaje enviado con éxito!',
      '> Respuesta esperada en 24h...'
    ];

    for (let i = 0; i < processingLines.length; i++) {
      setTimeout(() => {
        setTerminalLines(prev => [...prev, processingLines[i]]);
      }, i * 1000);
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setFormData({ name: '', email: '', message: '' });
    }, 5000);
  };

  return (
    <section id="contact" className="py-20 px-6 relative">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-space-grotesk font-bold cyber-text mb-6">
            Conectemos
          </h2>
          <p className="text-xl text-quantum-silver max-w-3xl mx-auto">
            ¿Tienes un proyecto en mente? Hablemos sobre cómo puedo ayudarte a llevarlo al siguiente nivel
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact form */}
          <div className="cyber-glass rounded-lg p-8">
            <h3 className="text-2xl font-space-grotesk font-bold text-quantum-silver mb-6">
              Envíame un mensaje
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-quantum-silver font-space-grotesk font-medium mb-2">
                  Nombre
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-neural-gray/50 border border-cyber-lime/30 rounded-lg px-4 py-3 text-quantum-silver focus:border-cyber-lime focus:outline-none focus:ring-2 focus:ring-cyber-lime/20 transition-all duration-300"
                  placeholder="Tu nombre completo"
                />
              </div>

              <div>
                <label className="block text-quantum-silver font-space-grotesk font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-neural-gray/50 border border-cyber-lime/30 rounded-lg px-4 py-3 text-quantum-silver focus:border-cyber-lime focus:outline-none focus:ring-2 focus:ring-cyber-lime/20 transition-all duration-300"
                  placeholder="tu@email.com"
                />
              </div>

              <div>
                <label className="block text-quantum-silver font-space-grotesk font-medium mb-2">
                  Mensaje
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className="w-full bg-neural-gray/50 border border-cyber-lime/30 rounded-lg px-4 py-3 text-quantum-silver focus:border-cyber-lime focus:outline-none focus:ring-2 focus:ring-cyber-lime/20 transition-all duration-300 resize-none"
                  placeholder="Describe tu proyecto o idea..."
                />
              </div>

              <CyberButton
                size="lg"
                disabled={isSubmitting}
                className="w-full"
              >
                {isSubmitting ? (
                  <>
                    <span className="animate-pulse">Enviando...</span>
                    <div className="w-4 h-4 border-2 border-void-black border-t-transparent rounded-full animate-spin ml-2" />
                  </>
                ) : (
                  'Enviar Mensaje'
                )}
              </CyberButton>
            </form>
          </div>

          {/* Contact info & stats */}
          <div className="space-y-8">
            {/* Professional stats */}
            <div className="cyber-glass rounded-lg p-8">
              <h3 className="text-2xl font-space-grotesk font-bold text-quantum-silver mb-6">
                Experiencia
              </h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-4xl font-space-grotesk font-bold cyber-text mb-2">2+</div>
                  <p className="text-quantum-silver text-sm">Años de experiencia</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-space-grotesk font-bold cyber-text mb-2">10+</div>
                  <p className="text-quantum-silver text-sm">Proyectos completados</p>
                </div>
              </div>
            </div>

            {/* Contact methods */}
            <div className="space-y-4">
              <div className="cyber-glass rounded-lg p-6 hover:border-cyber-lime transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-cyber-lime/20 rounded-full flex items-center justify-center">
                    <span className="text-cyber-lime text-xl">📧</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-space-grotesk font-semibold text-quantum-silver">Email</h4>
                    <p className="text-cyber-lime">anderson.gonzalez.dev@gmail.com</p>
                  </div>
                </div>
              </div>

              <div className="cyber-glass rounded-lg p-6 hover:border-cyber-lime transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-cyber-lime/20 rounded-full flex items-center justify-center">
                    <span className="text-cyber-lime text-xl">💼</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-space-grotesk font-semibold text-quantum-silver">LinkedIn</h4>
                    <p className="text-cyber-lime">linkedin.com/in/anderson-gonzalez</p>
                  </div>
                </div>
              </div>

              <div className="cyber-glass rounded-lg p-6 hover:border-cyber-lime transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-cyber-lime/20 rounded-full flex items-center justify-center">
                    <span className="text-cyber-lime text-xl">⚡</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-space-grotesk font-semibold text-quantum-silver">Respuesta rápida</h4>
                    <p className="text-quantum-silver">Usualmente respondo en 24 horas</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
