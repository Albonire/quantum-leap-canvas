export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  image: string;
  video?: string;
  demoUrl?: string;
  githubUrl?: string;
  category: "web" | "mobile" | "desktop" | "ai";
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Task Manager",
    description:
      "Plataforma de gestión de tareas con pomodoro technique integration con su propia base de datos y autenticación de usuarios.",
    technologies: [
      "Django 5.2.1",
      "JavaScript",
      "Python",
      "HTML5 & CSS3",
      "SQLite3",
    ],
    image:
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&h=400&fit=crop",
    video: "/Screencast From 2025-11-27 10-00-02.mp4",
    demoUrl: "https://demo.example.com",
    githubUrl: "https://github.com/Albonire/To-DoList1.0",
    category: "web",
  },
  {
    id: 2,
    title: "BDI-GB-ZOO",
    description:
      "Sistema de gestión para un zoológico, con administración de animales, hábitats y cuidadores a través de una API RESTful y una interfaz web.",
    technologies: [
      "Python",
      "FastAPI",
      "PostgreSQL",
      "JavaScript",
      "Bootstrap",
      "Docker",
    ],
    image:
      "https://images.unsplash.com/photo-1550854043-ee4c44b62035?w=600&h=400&fit=crop",
    githubUrl: "https://github.com/Albonire/BDI-GB-ZOO",
    video: "/Screencastbdi From 2025-11-27 11-20-18.mp4",
    demoUrl: "https://bdi-gb-zoo.vercel.app/",
    category: "web",
  },
  {
    id: 3,
    title: "IA Humanizer",
    description:
      "Orquestador para la humanización de textos generados por IA, transformándolos en versiones más naturales y humanas.",
    technologies: ["Vite", "TypeScript", "React", "shadcn-ui", "Tailwind CSS"],
    image:
      "https://images.unsplash.com/photo-1507146426996-ef05306b995a?w=600&h=400&fit=crop",
    githubUrl: "https://github.com/Albonire/ia-humanizer",
    video: "/Screencasthumanizer From 2025-11-27 11-02-33.mp4",
    demoUrl: "https://ia-humanizer-neon.vercel.app/",
    category: "ai",
  },
  {
    id: 4,
    title: "Home Button (GNOME Extension)",
    description:
      "Extensión para GNOME Shell que añade un botón para minimizar todas las ventanas y mostrar el escritorio con un solo clic.",
    technologies: ["JavaScript", "GNOME Shell", "GJS"],
    image:
      "https://images.unsplash.com/photo-1588507914493-59603a45a0e4?w=600&h=400&fit=crop",
    githubUrl: "https://github.com/Albonire/home-button",
    category: "desktop",
  },
  {
    id: 5,
    title: "Cupido App (Full-Stack)",
    description:
      "Aplicación de citas full-stack. Frontend desarrollado con React y Vite, y backend API RESTful construido con Python, Django y DRF.",
    technologies: ["React", "Vite", "TypeScript", "Python", "Django", "DRF"],
    image:
      "https://images.unsplash.com/photo-1527719327859-c6ce80353573?w=600&h=400&fit=crop",
    video: "/ScreencastCupido From 2025-11-27 10-40-27.mp4",
    demoUrl: "https://cupido-sandy.vercel.app/",
    githubUrl: "https://github.com/cupidoUP-App",
    category: "web",
  },
  {
    id: 6,
    title: "Quantum Leap Canvas",
    description:
      "Mi portafolio web de alto rendimiento para mostrar habilidades, proyectos y experiencia profesional como desarrollador Full Stack.",
    technologies: ["Vite", "TypeScript", "React", "shadcn-ui", "Tailwind CSS"],
    image:
      "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=600&h=400&fit=crop",
    githubUrl: "https://github.com/Albonire/quantum-leap-canvas",
    category: "web",
  },
];
