
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
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setFormData({ name: '', email: '', message: '' });
      alert('Mensaje enviado con éxito!');
    }, 2000);
  };

  return (
    <section id="contact" className="py-20 px-6 relative">
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-space-grotesk font-bold cyber-text mb-6">
            Conectemos
          </h2>
          <p className="text-xl text-quantum-silver max-w-2xl mx-auto">
            ¿Tienes un proyecto en mente? Hablemos sobre cómo puedo ayudarte a llevarlo al siguiente nivel
          </p>
        </div>

        {/* Contact form - centered and simplified */}
        <div className="cyber-glass rounded-lg p-8 max-w-2xl mx-auto">
          <h3 className="text-2xl font-space-grotesk font-bold text-quantum-silver mb-6 text-center">
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

          {/* Contact info below form */}
          <div className="mt-12 pt-8 border-t border-cyber-lime/20 text-center">
            <p className="text-quantum-silver mb-4">O contáctame directamente:</p>
            <div className="space-y-2">
              <p className="text-cyber-lime">anderson.gonzalez.dev@gmail.com</p>
              <p className="text-quantum-silver text-sm">Respondo usualmente en 24 horas</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
