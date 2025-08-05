"use client";

import React, { useState } from "react";
import ContactForm from "./ContactForm";
import { CV_URL } from "@/lib/utils";

const ContactSection = () => {
  const [terminalHistory, setTerminalHistory] = useState([
    "$ cat welcome.txt",
    "╔══════════════════════════════════════════════════╗",
    "║       Welcome to Anderson Terminal v2.0          ║",
    "║              Full Stack Developer                ║",
    "╚══════════════════════════════════════════════════╝",
    "$ whoami",
    "Anderson González - Full Stack Developer",
    "$ status",
    "🟢 Online | ⚡ Available for projects | 🚀 Ready to collaborate",
    "",
    '💡 Tip: Type "help" to see all available commands',
    '💡 Tip: Use "download cv" to get my resume',
  ]);
  const [currentCommand, setCurrentCommand] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const downloadCV = () => {
    const link = document.createElement("a");
    link.href = CV_URL;
    link.download = "Anderson_Gonzalez_CV.pdf";
    link.click();
  };

  const renderWithLinks = (text: string) => {
    const urlRegex =
      /(https?:\[^\s]+|www\.[^\s]+|[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(\/[^\s]*)?)/g;
    const parts = text.split(urlRegex);

    return parts.map((part, index) => {
      if (part && part.match(urlRegex)) {
        let href = part;
        if (!part.startsWith("http")) {
          href = `https://${part}`;
        }
        return (
          <a
            key={index}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sky-400 hover:underline"
          >
            {part}
          </a>
        );
      }
      return <React.Fragment key={index}>{part}</React.Fragment>;
    });
  };

  const executeCommand = (command: string) => {
    const cmd = command.toLowerCase().trim();
    const args = cmd.split(" ");
    const baseCmd = args[0];
    let response = "";

    // Add command to history
    setCommandHistory((prev) => [...prev, command]);

    // Handle download cv command
    if (cmd === "download cv") {
      downloadCV();
      response = `📥 Downloading Anderson Gonzalez's CV...
├── File: Anderson_Gonzalez_CV.pdf
├── Size: 2.5 MB
├── Format: Professional PDF
├── Last updated: December 2024
└── ✅ Download completed successfully!

🎯 CV downloaded from terminal - Thanks for your interest!`;

      setTerminalHistory((prev) => [...prev, `$ ${command}`, response, ""]);
      return;
    }

    switch (baseCmd) {
      case "help":
        response = `Available commands:
┌──────────────────┬──────────────────────────────────────┐
│ Command          │ Description                          │
├──────────────────┼──────────────────────────────────────┤
│ help             │ Show help                            │
│ about            │ Personal information                 │
│ skills           │ Technologies and skills              │
│ projects         │ Featured projects                    │
│ experience       │ Work experience                      │
│ education        │ Academic background                  │
│ contact          │ Contact information                  │
│ social           │ Social media links                   │
│ download cv      │ Download CV                          │
│ quote            │ Random motivational quote            │
│ joke             │ Programming joke                     │
│ weather          │ Current weather                      │
│ time             │ Current date and time                │
│ uptime           │ Experience uptime                    │
│ ping             │ Connectivity test                    │
│ whoami           │ User information                     │
│ pwd              │ Current directory                    │
│ ls               │ List content                         │
│ cat [file]       │ Display file content                 │
│ history          │ Command history                      │
│ clear            │ Clear terminal                       │
│ exit             │ Exit message                         │
└──────────────────┴──────────────────────────────────────┘`;
        break;
      case "about":
        response = `👨‍💻 Anderson González
🎯 Full Stack Developer specializing in creating unique digital experiences
📍 Location: Available for remote work
💼 Experience: 5+ years developing scalable solutions
🔥 Passion: Transforming ideas into innovative digital products`;
        break;
      case "skills":
        response = `🚀 Tech Stack:

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
      case "projects":
        response = `📂 Featured Projects:

🛒 E-commerce Platform
   ├── React + Node.js + PostgreSQL
   ├── Integrated payment system
   └── Admin dashboard

📱 Task Manager App
   ├── Vue.js + Express + MongoDB
   ├── Real-time collaboration
   └── Mobile responsive

🎯 Personal Portfolio
   ├── Next.js + TypeScript
   ├── Cyber-punk animations
   └── Optimized performance

🔗 API REST Services
   ├── Python FastAPI
   ├── Automatic documentation
   └── Complete testing`;
        break;
      case "experience":
        response = `💼 Professional Experience:

2022-2024 | Senior Full Stack Developer
├── Led a team of 5 developers
├── Microservices architecture
└── Improved performance by 40%

2020-2022 | Full Stack Developer
├── Developed complex web applications
├── Integrated third-party APIs
└── Implemented agile methodologies

2019-2020 | Frontend Developer
├── Developed in React and Vue.js
├── Responsive design
└── SEO optimization`;
        break;
      case "education":
        response = `🎓 Academic Background:

2021-2026 | Systems Engineering
├── University of Pamplona


📚 Certifications:
├── AWS Solutions Architect ☁️
├── React Advanced Patterns ⚛️
├── Docker & Kubernetes 🐳
└── Scrum Master 📋`;
        break;
      case "contact":
        response = `📞 Contact Information:

📧 Email: fabianagcris@gmail.com
💬 Status: Available
Response: 24h maximum`;
        break;
      case "social":
        response = `🌐 Socials:

├── 📘 LinkedIn: https://www.linkedin.com/in/anderson-gonzaleza21/
├── 🐙 GitHub: https://github.com/Albonire
├── 🐦 Twitter: https://x.com/anderso37646360
├── 📷 Instagram: https://www.instagram.com/fabian_gonale/
└── 💼 Portfolio: https://anderdev-one.vercel.app`;
        break;

      case "joke": {
        const jokes = [
          "Why do programmers prefer dark mode? Because light attracts bugs! 🐛",
          "How many programmers does it take to change a light bulb? None, it's a hardware problem. 💡",
          'A programmer goes to the supermarket. His wife says: "Buy bread, and if there are eggs, bring 6." He comes back with 6 loaves of bread. "Why so much bread?" "There were eggs" 🥚',
          "Why do programmers hate nature? It has too many bugs. 🌿",
          '"It works on my machine" is the programmers\' "the dog ate my homework". 🐕',
        ];
        response = `😂 ${jokes[Math.floor(Math.random() * jokes.length)]}`;
        break;
      }
      case "weather":
        response = `🌤️ Weather for Developers:
├── Temperature: 23°C (perfect for coding)
├── Humidity: 60% (ideal for the keyboard)
├── Wind: 5 km/h (won't blow the monitor away)
├── Pressure: 1013 hPa (as stable as my code)
└── Recommendation: ☕ Perfect for a coffee and coding`;
        break;
      case "time": {
        const now = new Date();
        response = `🕐 Temporal Information:
├── Date: ${now.toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
├── Time: ${now.toLocaleTimeString("en-US")}
├── Zone: GMT-5
└── Unix Epoch: ${Math.floor(now.getTime() / 1000)}`;
        break;
      }
      case "uptime":
        response = `⏱️ Anderson System v2024:
├── Active time: 5+ years of experience
├── Last update: Continuous development
├── Availability: 99.9% uptime
├── Coffee consumed: ∞ cups ☕
└── Lines of code: 500,000+ 💻`;
        break;
      case "ping":
        response = `🏓 PING anderdev-one.velcel.app:
├── 64 bytes from anderson: icmp_seq=1 ttl=64 time=0.1ms ✅
├── 64 bytes from anderson: icmp_seq=2 ttl=64 time=0.1ms ✅
├── 64 bytes from anderson: icmp_seq=3 ttl=64 time=0.1ms ✅
└── --- Statistics: 3 packets, 0% loss, average time 0.1ms`;
        break;
      case "whoami":
        response = `👤 anderson
├── Groups: developers, fullstack, problem-solvers
├── Shell: /bin/creativity
├── Directory: /home/anderson/projects
└── Permissions: rwx (read, write, execute dreams)`;
        break;
      case "pwd":
        response = "/home/anderson/workspace/portfolio/contact-section";
        break;
      case "ls":
        response = `📁 Directory content:
├── 📂 projects/
├── 📂 skills/
├── 📂 experience/
├── 📄 about.txt
├── 📄 contact.txt
├── 📄 resume.pdf
└── 📄 README.md`;
        break;
      case "cat": {
        if (args[1]) {
          const file = args[1];
          switch (file) {
            case "about.txt":
              response =
                "Full Stack Developer with a passion for creating innovative and scalable solutions.";
              break;
            case "contact.txt":
              response =
                "Email: anderson.gonzalez.dev@gmail.com\nStatus: Available\nResponse: 24h maximum";
              break;
            case "README.md":
              response =
                "# Anderson González\n\nFull Stack Developer specializing in React, Node.js and cloud solutions.\n\n## Contact\nAlways open to new opportunities and collaborations.";
              break;
            default:
              response = `cat: ${file}: No such file or directory`;
          }
        } else {
          response = "cat: missing file operand. Usage: cat [filename]";
        }
        break;
      }
      case "history":
        response =
          commandHistory.length > 0
            ? commandHistory.map((cmd, i) => `  ${i + 1}  ${cmd}`).join("\n")
            : "History is empty";
        break;
      case "clear":
        setTerminalHistory([]);
        return;
      case "exit":
        response = `👋 Goodbye!
Hope to see you soon!

Thanks for visiting my terminal.
We hope to see you soon! 🚀

Connection to anderson-terminal closed.`;
        break;
      default:
        response = `bash: ${command}: command not found
💡 Tip: Type 'help' to see all available commands
💡 Tip: Use 'download cv' to get my resume`;
    }

    setTerminalHistory((prev) => [...prev, `$ ${command}`, response, ""]);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (currentCommand.trim()) {
        executeCommand(currentCommand);
        setCurrentCommand("");
        setHistoryIndex(-1);
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (
        commandHistory.length > 0 &&
        historyIndex < commandHistory.length - 1
      ) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setCurrentCommand(commandHistory[commandHistory.length - 1 - newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setCurrentCommand(commandHistory[commandHistory.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setCurrentCommand("");
      }
    }
  };

  return (
    <section
      id="contact"
      className="py-8 sm:py-12 md:py-16 px-3 sm:px-4 md:px-6 relative"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-6 sm:mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-space-grotesk font-bold mb-3 sm:mb-4 md:mb-6 text-sage-accent dark:text-cyber-lime">
            Let's Connect
          </h2>
          <p className="text-sm sm:text-lg md:text-xl max-w-2xl mx-auto font-medium text-black dark:text-quantum-silver px-2 sm:px-4 leading-relaxed">
            Have a project in mind? Let's talk about how I can help you take it
            to the next level.
          </p>
        </div>

        {/* Responsive layout - Stack on mobile, side by side on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 items-stretch">
          {/* Enhanced Interactive Command Console */}
          <div className="bg-sage-accent/20 dark:bg-neural-gray/30 backdrop-blur-md border-2 border-sage-accent dark:border-cyber-lime/20 rounded-lg p-3 sm:p-4 md:p-6 flex flex-col h-[350px] sm:h-[350px] md:h-[400px] lg:h-[650px] shadow-lg">
            <div className="flex items-center gap-1 sm:gap-2 mb-2 sm:mb-3 md:mb-4">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-3 md:h-3 rounded-full bg-red-500 animate-pulse"></div>
              <div
                className="w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-3 md:h-3 rounded-full bg-yellow-500 animate-pulse"
                style={{ animationDelay: "0.5s" }}
              ></div>
              <div
                className="w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-3 md:h-3 rounded-full bg-green-500 animate-pulse"
                style={{ animationDelay: "1s" }}
              ></div>
              <span className="text-gray-800 dark:text-quantum-silver text-xs sm:text-sm md:text-base ml-1 sm:ml-2 md:ml-4 font-mono font-medium">
                anderson@terminal:~$
              </span>
              <div className="flex-1"></div>
              <span className="text-xs text-gray-700 dark:text-quantum-silver/60 font-mono hidden sm:block">
                Terminal v2.0
              </span>
            </div>

            {/* Terminal output */}
            <div className="flex-1 overflow-y-auto mb-2 sm:mb-3 md:mb-4 font-mono text-xs sm:text-sm md:text-base space-y-0.5 sm:space-y-1 scrollbar-thin scrollbar-thumb-sage-accent/50 dark:scrollbar-thumb-cyber-lime/50">
              {terminalHistory.map((line, index) => (
                <div
                  key={index}
                  className={
                    line.startsWith("$")
                      ? "text-sage-accent dark:text-cyber-lime flex items-center gap-1 sm:gap-2 font-semibold"
                      : line.startsWith("├──") ||
                        line.startsWith("└──") ||
                        line.startsWith("│")
                      ? "text-gray-800 dark:text-quantum-silver/80 font-mono"
                      : line.includes("✅") || line.includes("🟢")
                      ? "text-green-600 dark:text-green-400 font-medium"
                      : line.includes("❌") || line.includes("🔴")
                      ? "text-red-600 dark:text-red-400 font-medium"
                      : line.includes("⚡") || line.includes("💡")
                      ? "text-amber-600 dark:text-yellow-400 font-medium"
                      : "text-gray-900 dark:text-quantum-silver"
                  }
                >
                  {line.startsWith("$") && (
                    <span className="text-sage-accent dark:text-cyber-lime mr-1">
                      {">"}
                    </span>
                  )}
                  <span className="whitespace-pre-wrap break-words text-xs sm:text-sm md:text-base">
                    {renderWithLinks(
                      line.startsWith("$") ? line.substring(2) : line
                    )}
                  </span>
                </div>
              ))}
            </div>

            {/* Enhanced command input */}
            <div className="flex items-center gap-1 sm:gap-2 border-t-2 border-sage-accent dark:border-cyber-lime/20 pt-2 sm:pt-3 md:pt-4">
              <span className="text-sage-accent dark:text-cyber-lime font-mono text-xs sm:text-sm md:text-base animate-pulse font-bold">
                $
              </span>
              <input
                type="text"
                value={currentCommand}
                onChange={(e) => setCurrentCommand(e.target.value)}
                onKeyDown={handleKeyPress}
                className="flex-1 bg-transparent text-gray-900 dark:text-quantum-silver font-mono text-xs sm:text-sm md:text-base focus:outline-none placeholder:text-gray-600 dark:placeholder:text-quantum-silver/50 font-medium"
                placeholder="Type 'help' for commands..."
                autoComplete="off"
              />
              <div className="text-xs text-gray-700 dark:text-quantum-silver/40 font-mono hidden sm:block">
                ↑↓ history | Enter to run
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
