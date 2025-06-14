
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
  const [terminalHistory, setTerminalHistory] = useState([
    '$ cat about.txt',
    'Desarrollador Full Stack especializado en crear experiencias digitales únicas',
    '$ ls skills/',
    'React TypeScript Node.js Python PostgreSQL Docker AWS',
    '$ echo "¿Listo para colaborar?"',
    '¿Listo para colaborar?'
  ]);
  const [currentCommand, setCurrentCommand] = useState('');

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
      
      // Add success message to terminal
      setTerminalHistory(prev => [
        ...prev,
        '$ send_message --to anderson',
        `✓ Mensaje de ${formData.name} enviado exitosamente`,
        '$ status',
        'anderson@terminal: Responderé pronto! 🚀'
      ]);
      
      alert('Mensaje enviado con éxito!');
    }, 2000);
  };

  const executeCommand = (command: string) => {
    const cmd = command.toLowerCase().trim();
    let response = '';
    
    switch (cmd) {
      case 'help':
        response = 'Comandos disponibles: help, skills, projects, contact, clear, whoami, status';
        break;
      case 'skills':
        response = 'Frontend: React, TypeScript, Tailwind CSS\nBackend: Node.js, Python, PostgreSQL\nTools: Docker, AWS, Git';
        break;
      case 'projects':
        response = 'Portfolio personal, E-commerce platform, Task manager, API REST services';
        break;
      case 'contact':
        response = 'Email: anderson.gonzalez.dev@gmail.com\nEstado: Disponible para nuevos proyectos';
        break;
      case 'whoami':
        response = 'Anderson González - Full Stack Developer';
        break;
      case 'status':
        response = 'Sistema operativo: Desarrollador v2024\nEstado: Listo para colaborar\nUptime: 5+ años';
        break;
      case 'clear':
        setTerminalHistory([]);
        return;
      default:
        response = `bash: ${command}: command not found. Escribe 'help' para ver comandos disponibles.`;
    }
    
    setTerminalHistory(prev => [
      ...prev,
      `$ ${command}`,
      response
    ]);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (currentCommand.trim()) {
        executeCommand(currentCommand);
        setCurrentCommand('');
      }
    }
  };

  return (
    <section id="contact" className="py-20 px-6 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-space-grotesk font-bold cyber-text mb-6">
            Conectemos
          </h2>
          <p className="text-xl text-quantum-silver max-w-2xl mx-auto">
            ¿Tienes un proyecto en mente? Hablemos sobre cómo puedo ayudarte a llevarlo al siguiente nivel
          </p>
        </div>

        {/* Two column layout */}
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Interactive Command Console */}
          <div className="cyber-glass rounded-lg p-6 h-[600px] flex flex-col">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-quantum-silver text-sm ml-4 font-mono">anderson@terminal:~$</span>
            </div>
            
            {/* Terminal output */}
            <div className="flex-1 overflow-y-auto mb-4 font-mono text-sm text-quantum-silver space-y-1 scrollbar-thin scrollbar-thumb-cyber-lime/50">
              {terminalHistory.map((line, index) => (
                <div key={index} className={line.startsWith('$') ? 'text-cyber-lime' : 'text-quantum-silver'}>
                  {line}
                </div>
              ))}
            </div>
            
            {/* Command input */}
            <div className="flex items-center gap-2 border-t border-cyber-lime/20 pt-4">
              <span className="text-cyber-lime font-mono text-sm">$</span>
              <input
                type="text"
                value={currentCommand}
                onChange={(e) => setCurrentCommand(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 bg-transparent text-quantum-silver font-mono text-sm focus:outline-none"
                placeholder="Escribe 'help' para ver comandos disponibles..."
              />
            </div>
          </div>

          {/* Contact form */}
          <div className="cyber-glass rounded-lg p-8">
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
            <div className="mt-8 pt-6 border-t border-cyber-lime/20 text-center">
              <p className="text-quantum-silver mb-2">O contáctame directamente:</p>
              <div className="space-y-1">
                <p className="text-cyber-lime">anderson.gonzalez.dev@gmail.com</p>
                <p className="text-quantum-silver text-sm">Respondo usualmente en 24 horas</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
