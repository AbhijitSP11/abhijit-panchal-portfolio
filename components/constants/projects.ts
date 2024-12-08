import { Project } from "../types";

export const projects: Project[] = [
  {
    id: 1,
    title: "Aster: AI-Powered Task Management",
    description: "Revolutionary task management platform leveraging AI to optimize productivity and workflow efficiency.",
    status: "Live",
    imageUrl: "/images/aster.png",
    githubUrl: "https://github.com/username/nebula",
    liveUrl: "https://nebula-tasks.com",
    techStack: ["React", "Node.js", "TensorFlow", "GraphQL"],
  },
  {
    id: 2,
    title: "EcoTrack: Sustainable Living Companion",
    description: "Mobile app empowering users to reduce their carbon footprint through personalized recommendations and community challenges.",
    status: "In Development",
    imageUrl: "/images/twello.png",
    githubUrl: "https://github.com/username/ecotrack",
    liveUrl: "https://ecotrack.io",
    techStack: ["React Native", "Firebase", "TensorFlow Lite", "Node.js"],
  },
  {
    id: 3,
    title: "Quantum Forge: Next-Gen Game Engine",
    description: "Cutting-edge game development engine harnessing quantum computing principles for unparalleled physics simulations and AI behaviors.",
    status: "Planning",
    imageUrl: "https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?q=80&w=2187&auto=format&fit=crop",
    githubUrl: "https://github.com/username/quantum-forge",
    liveUrl: "https://quantumforge.dev",
    techStack: ["C++", "CUDA", "Quantum SDK", "Vulkan"],
  }
];