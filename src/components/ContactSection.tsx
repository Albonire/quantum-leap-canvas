
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
            Terminal de Contacto
          </h2>
          <p className="text-xl text-quantum-silver max-w-3xl mx-auto">
            Establece una conexión directa conmigo a través del protocolo de comunicación cuántica
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Terminal simulator */}
          <div className="cyber-glass rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-cyber-lime/30">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="ml-4 text-quantum-silver font-mono text-sm">terminal.exe</span>
            </div>
            
            <div className="h-80 overflow-y-auto font-mono text-sm">
              {terminalLines.map((line, index) => (
                <div key={index} className="text-cyber-lime mb-2">
                  {line}
                </div>
              ))}
              <div className="flex items-center text-cyber-lime">
                <span>{'> '}</span>
                <span className="animate-pulse">_</span>
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div className="cyber-glass rounded-lg p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-quantum-silver font-space-grotesk font-medium mb-2">
                  Identificación
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
                  Canal de Comunicación
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
                  Transmisión de Datos
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
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="w-full"
              >
                {isSubmitting ? (
                  <>
                    <span className="animate-pulse">Transmitiendo...</span>
                    <div className="w-4 h-4 border-2 border-void-black border-t-transparent rounded-full animate-spin ml-2" />
                  </>
                ) : (
                  'Enviar Transmisión'
                )}
              </CyberButton>
            </form>
          </div>
        </div>

        {/* Contact info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="text-center cyber-glass rounded-lg p-6">
            <div className="w-12 h-12 bg-cyber-lime/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-cyber-lime text-xl">📧</span>
            </div>
            <h3 className="text-xl font-space-grotesk font-semibold text-quantum-silver mb-2">Email</h3>
            <p className="text-cyber-lime">contacto@alexcyber.dev</p>
          </div>

          <div className="text-center cyber-glass rounded-lg p-6">
            <div className="w-12 h-12 bg-cyber-lime/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-cyber-lime text-xl">🌐</span>
            </div>
            <h3 className="text-xl font-space-grotesk font-semibold text-quantum-silver mb-2">LinkedIn</h3>
            <p className="text-cyber-lime">linkedin.com/in/alexcyber</p>
          </div>

          <div className="text-center cyber-glass rounded-lg p-6">
            <div className="w-12 h-12 bg-cyber-lime/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-cyber-lime text-xl">📱</span>
            </div>
            <h3 className="text-xl font-space-grotesk font-semibold text-quantum-silver mb-2">WhatsApp</h3>
            <p className="text-cyber-lime">+1 (555) 123-4567</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
