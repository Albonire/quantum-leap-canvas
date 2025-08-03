'use client';

import { useState } from 'react';
import ContactForm from './ContactForm';

const ContactSection = () => {
  const [terminalHistory, setTerminalHistory] = useState([
    '$ cat welcome.txt',
    '╔══════════════════════════════════════════════════╗',
    '║        Bienvenido a Anderson Terminal v2.0       ║',
    '║              Desarrollador Full Stack            ║',
    '╚══════════════════════════════════════════════════╝',
    '$ whoami',
    'Anderson González - Full Stack Developer',
    '$ status',
    '🟢 Online | ⚡ Disponible para proyectos | 🚀 Listo para colaborar',
    '',
    '💡 Tip: Escribe "help" para ver todos los comandos disponibles',
    '💡 Tip: Usa "sudo dnf download" para descargar mi CV'
  ]);
  const [currentCommand, setCurrentCommand] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const downloadCV = () => {
    // Simular descarga del CV
    const link = document.createElement('a');
    link.href = '#'; // En producción, aquí iría la URL real del CV
    link.download = 'https://icedrive.net/s/gghN1jxzVwV9t8BVBkPQgxD8a4i3';
    link.click();
  };

  const executeCommand = (command: string) => {
    const cmd = command.toLowerCase().trim();
    const args = cmd.split(' ');
    const baseCmd = args[0];
    let response = '';
    
    // Add command to history
    setCommandHistory(prev => [...prev, command]);
    
    // Handle sudo dnf download command
    if (cmd === 'sudo dnf download' || cmd.startsWith('sudo dnf download')) {
      downloadCV();
      response = `📥 Descargando CV de Anderson González...
├── Archivo: Anderson_Gonzalez_CV.pdf
├── Tamaño: 2.5 MB
├── Formato: PDF Profesional
├── Última actualización: Diciembre 2024
└── ✅ Descarga completada exitosamente!

🎯 CV descargado desde terminal - ¡Gracias por tu interés!`;
      
      setTerminalHistory(prev => [
        ...prev,
        `$ ${command}`,
        response,
        ''
      ]);
      return;
    }
    
    switch (baseCmd) {
      case 'help':
        response = `Comandos disponibles:
┌──────────────────┬──────────────────────────────────────┐
│ Comando          │ Descripción                          │
├──────────────────┼──────────────────────────────────────┤
│ help             │ Muestra esta ayuda                   │
│ about            │ Información personal                 │
│ skills           │ Tecnologías y habilidades            │
│ projects         │ Proyectos destacados                 │
│ experience       │ Experiencia laboral                  │
│ education        │ Formación académica                  │
│ contact          │ Información de contacto              │
│ social           │ Redes sociales                       │
│ sudo dnf download│ Descargar CV                         │
│ quote            │ Frase motivacional aleatoria         │
│ joke             │ Chiste de programación               │
│ weather          │ Clima actual                         │
│ time             │ Fecha y hora actual                  │
│ uptime           │ Tiempo de experiencia                │
│ ping             │ Test de conectividad                 │
│ whoami           │ Información del usuario              │
│ pwd              │ Directorio actual                    │
│ ls               │ Listar contenido                     │
│ cat [archivo]    │ Mostrar contenido de archivo         │
│ history          │ Historial de comandos                │
│ clear            │ Limpiar terminal                     │
│ exit             │ Mensaje de despedida                 │
└──────────────────┴──────────────────────────────────────┘`;
        break;
      case 'about':
        response = `👨‍💻 Anderson González
🎯 Full Stack Developer especializado en crear experiencias digitales únicas
📍 Ubicación: Disponible para trabajo remoto
💼 Experiencia: 5+ años desarrollando soluciones escalables
🔥 Pasión: Transformar ideas en productos digitales innovadores`;
        break;
      case 'skills':
        response = `🚀 Stack Tecnológico:

Frontend:
├── React.js / Next.js ⚛️
├── TypeScript 📘
├── Tailwind CSS 🎨
├── Vue.js 💚
└── Angular 🔴

Backend:
├── Node.js 🟢
├── Python 🐍
├── Express.js ⚡
├── FastAPI 🚀
└── PostgreSQL 🐘

DevOps & Tools:
├── Docker 🐳
├── AWS ☁️
├── Git/GitHub 📝
├── MongoDB 🍃
└── Redis 🔴`;
        break;
      case 'projects':
        response = `📂 Proyectos Destacados:

🛒 E-commerce Platform
   ├── React + Node.js + PostgreSQL
   ├── Sistema de pagos integrado
   └── Dashboard administrativo

📱 Task Manager App
   ├── Vue.js + Express + MongoDB
   ├── Real-time collaboration
   └── Mobile responsive

🎯 Portfolio Personal
   ├── Next.js + TypeScript
   ├── Animaciones cyber-punk
   └── Performance optimizada

🔗 API REST Services
   ├── Python FastAPI
   ├── Documentación automática
   └── Testing completo`;
        break;
      case 'experience':
        response = `💼 Experiencia Profesional:

2022-2024 | Senior Full Stack Developer
├── Liderazgo de equipo de 5 desarrolladores
├── Arquitectura de microservicios
└── Mejora de performance en 40%

2020-2022 | Full Stack Developer
├── Desarrollo de aplicaciones web complejas
├── Integración de APIs de terceros
└── Implementación de metodologías ágiles

2019-2020 | Frontend Developer
├── Desarrollo en React y Vue.js
├── Diseño responsive
└── Optimización SEO`;
        break;
      case 'education':
        response = `🎓 Formación Académica:

2021-2026 | Ingeniería en Sistemas
├── Universidad de Pamplona


📚 Certificaciones:
├── AWS Solutions Architect ☁️
├── React Advanced Patterns ⚛️
├── Docker & Kubernetes 🐳
└── Scrum Master 📋`;
        break;
      case 'contact':
        response = `📞 Información de Contacto:

📧 Email: fabianagcris@gmail.com
💬 Estado: Disponible
Respuesta: 24h máximo`;
        break;
      case 'social':
        response = `🌐 Socials:

├── 📘 LinkedIn: /in/anderson-gonzalez-dev
├── 🐙 GitHub: https://github.com/Albonire
├── 🐦 Twitter: https://x.com/anderso37646360
├── 📷 Instagram: https://www.instagram.com/fabian_gonale/
└── 💼 Portfolio: anderdev-one.vercel.app`;
        break;
      
      case 'joke': {
        const jokes = [
          '¿Por qué los programadores prefieren el modo oscuro? Porque la luz atrae bugs! 🐛',
          '¿Cuántos programadores necesitas para cambiar una bombilla? Ninguno, es un problema de hardware. 💡',
          'Un programador va al supermercado. Su esposa le dice: "Compra pan, y si hay huevos, trae 6". Vuelve con 6 panes. "¿Por qué tanto pan?" "Había huevos" 🥚',
          '¿Por qué los programadores odian la naturaleza? Tiene demasiados bugs. 🌿',
          '"Funciona en mi máquina" es el "el perro se comió mi tarea" de los programadores. 🐕'
        ];
        response = `😂 ${jokes[Math.floor(Math.random() * jokes.length)]}`;
        break;
      }
      case 'weather':
        response = `🌤️ Clima para Developers:
├── Temperatura: 23°C (perfecto para codear)
├── Humedad: 60% (ideal para el teclado)
├── Viento: 5 km/h (no volará el monitor)
├── Presión: 1013 hPa (estable como mi código)
└── Recomendación: ☕ Perfecto para un café y coding`;
        break;
      case 'time': {
        const now = new Date();
        response = `🕐 Información Temporal:
├── Fecha: ${now.toLocaleDateString('es-ES', { 
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        })}
├── Hora: ${now.toLocaleTimeString('es-ES')}
├── Zona: GMT-5
└── Época Unix: ${Math.floor(now.getTime() / 1000)}`;
        break;
      }
      case 'uptime':
        response = `⏱️ Sistema Anderson v2024:
├── Tiempo activo: 5+ años de experiencia
├── Última actualización: Desarrollo continuo
├── Disponibilidad: 99.9% uptime
├── Café consumido: ∞ tazas ☕
└── Líneas de código: 500,000+ 💻`;
        break;
      case 'ping':
        response = `🏓 PING anderson-dev.com:
├── 64 bytes from anderson: icmp_seq=1 ttl=64 time=0.1ms ✅
├── 64 bytes from anderson: icmp_seq=2 ttl=64 time=0.1ms ✅
├── 64 bytes from anderson: icmp_seq=3 ttl=64 time=0.1ms ✅
└── --- Estadísticas: 3 paquetes, 0% pérdida, tiempo promedio 0.1ms`;
        break;
      case 'whoami':
        response = `👤 anderson
├── Grupos: developers, fullstack, problem-solvers
├── Shell: /bin/creativity
├── Directorio: /home/anderson/projects
└── Permisos: rwx (read, write, execute dreams)`;
        break;
      case 'pwd':
        response = '/home/anderson/workspace/portfolio/contact-section';
        break;
      case 'ls':
        response = `📁 Contenido del directorio:
├── 📂 projects/
├── 📂 skills/
├── 📂 experience/
├── 📄 about.txt
├── 📄 contact.txt
├── 📄 resume.pdf
└── 📄 README.md`;
        break;
      case 'cat': {
        if (args[1]) {
          const file = args[1];
          switch (file) {
            case 'about.txt':
              response = 'Desarrollador Full Stack con pasión por crear soluciones innovadoras y escalables.';
              break;
            case 'contact.txt':
              response = 'Email: anderson.gonzalez.dev@gmail.com\nEstado: Disponible\nRespuesta: 24h máximo';
              break;
            case 'README.md':
              response = '# Anderson González\n\nFull Stack Developer especializado en React, Node.js y soluciones cloud.\n\n## Contacto\nSiempre abierto a nuevas oportunidades y colaboraciones.';
              break;
            default:
              response = `cat: ${file}: No existe el archivo`;
          }
        } else {
          response = 'cat: falta especificar archivo. Uso: cat [nombre_archivo]';
        }
        break;
      }
      case 'history':
        response = commandHistory.length > 0 
          ? commandHistory.map((cmd, i) => `  ${i + 1}  ${cmd}`).join('\n')
          : 'Historial vacío';
        break;
      case 'clear':
        setTerminalHistory([]);
        return;
      case 'exit':
        response = `👋 ¡Hasta luego!
¡Esperamos verte pronto!

Thanks for visiting my terminal.
We hope to see you soon! 🚀

Connection to anderson-terminal closed.`;
        break;
      default:
        response = `bash: ${command}: comando no encontrado
💡 Tip: Escribe 'help' para ver todos los comandos disponibles
💡 Tip: Usa 'sudo dnf download' para descargar mi CV`;
    }
    
    setTerminalHistory(prev => [
      ...prev,
      `$ ${command}`,
      response,
      ''
    ]);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (currentCommand.trim()) {
        executeCommand(currentCommand);
        setCurrentCommand('');
        setHistoryIndex(-1);
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0 && historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setCurrentCommand(commandHistory[commandHistory.length - 1 - newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setCurrentCommand(commandHistory[commandHistory.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setCurrentCommand('');
      }
    }
  };

  return (
    <section id="contact" className="py-8 sm:py-12 md:py-16 px-3 sm:px-4 md:px-6 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-6 sm:mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-space-grotesk font-bold mb-3 sm:mb-4 md:mb-6 text-sage-accent dark:text-cyber-lime">
            Conectemos
          </h2>
          <p className="text-sm sm:text-lg md:text-xl max-w-2xl mx-auto font-medium text-black dark:text-quantum-silver px-2 sm:px-4 leading-relaxed">
            ¿Tienes un proyecto en mente? Hablemos sobre cómo puedo ayudarte a llevarlo al siguiente nivel
          </p>
        </div>

        {/* Responsive layout - Stack on mobile, side by side on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 items-stretch">
          {/* Enhanced Interactive Command Console */}
          <div className="bg-sage-accent/20 dark:bg-neural-gray/30 backdrop-blur-md border-2 border-sage-accent dark:border-cyber-lime/20 rounded-lg p-3 sm:p-4 md:p-6 flex flex-col h-[300px] sm:h-[350px] md:h-[400px] lg:h-[650px] shadow-lg">
            <div className="flex items-center gap-1 sm:gap-2 mb-2 sm:mb-3 md:mb-4">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-3 md:h-3 rounded-full bg-red-500 animate-pulse"></div>
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-3 md:h-3 rounded-full bg-yellow-500 animate-pulse" style={{animationDelay: '0.5s'}}></div>
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-3 md:h-3 rounded-full bg-green-500 animate-pulse" style={{animationDelay: '1s'}}></div>
              <span className="text-gray-800 dark:text-quantum-silver text-xs sm:text-sm md:text-base ml-1 sm:ml-2 md:ml-4 font-mono font-medium">anderson@terminal:~$</span>
              <div className="flex-1"></div>
              <span className="text-xs text-gray-700 dark:text-quantum-silver/60 font-mono hidden sm:block">Terminal v2.0</span>
            </div>
            
            {/* Terminal output */}
            <div className="flex-1 overflow-y-auto mb-2 sm:mb-3 md:mb-4 font-mono text-xs sm:text-sm md:text-base space-y-0.5 sm:space-y-1 scrollbar-thin scrollbar-thumb-sage-accent/50 dark:scrollbar-thumb-cyber-lime/50">
              {terminalHistory.map((line, index) => (
                <div 
                  key={index} 
                  className={
                    line.startsWith('$') 
                      ? 'text-sage-accent dark:text-cyber-lime flex items-center gap-1 sm:gap-2 font-semibold' 
                      : line.startsWith('├──') || line.startsWith('└──') || line.startsWith('│')
                        ? 'text-gray-800 dark:text-quantum-silver/80 font-mono'
                        : line.includes('✅') || line.includes('🟢')
                          ? 'text-green-600 dark:text-green-400 font-medium'
                          : line.includes('❌') || line.includes('🔴')
                            ? 'text-red-600 dark:text-red-400 font-medium'
                            : line.includes('⚡') || line.includes('💡')
                              ? 'text-amber-600 dark:text-yellow-400 font-medium'
                              : 'text-gray-900 dark:text-quantum-silver'
                  }
                >
                  {line.startsWith('$') && <span className="text-sage-accent dark:text-cyber-lime mr-1">{'>'}</span>}
                  <span className="whitespace-pre-wrap break-words text-xs sm:text-sm md:text-base">{line.startsWith('$') ? line.substring(2) : line}</span>
                </div>
              ))}
            </div>
            
            {/* Enhanced command input */}
            <div className="flex items-center gap-1 sm:gap-2 border-t-2 border-sage-accent dark:border-cyber-lime/20 pt-2 sm:pt-3 md:pt-4">
              <span className="text-sage-accent dark:text-cyber-lime font-mono text-xs sm:text-sm md:text-base animate-pulse font-bold">$</span>
              <input
                type="text"
                value={currentCommand}
                onChange={(e) => setCurrentCommand(e.target.value)}
                onKeyDown={handleKeyPress}
                className="flex-1 bg-transparent text-gray-900 dark:text-quantum-silver font-mono text-xs sm:text-sm md:text-base focus:outline-none placeholder:text-gray-600 dark:placeholder:text-quantum-silver/50 font-medium"
                placeholder="Escribe 'help' para ver comandos..."
                autoComplete="off"
              />
              <div className="text-xs text-gray-700 dark:text-quantum-silver/40 font-mono hidden sm:block">
                ↑↓ historial | Enter ejecutar
              </div>
            </div>
          </div>

          {/* Contact form with matching height */}
          <ContactForm />
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
