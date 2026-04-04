import { 
  Code2, Layers, Terminal, Cpu, Users, 
  Database, Globe, Layout, Palette, Wind,
  Server, Cpu as Hardware, Network, Box, GitBranch
} from 'lucide-react';

export const SKILL_CATEGORIES = [
  {
    id: 'cat-1',
    title: 'Languages',
    icon: Code2,
    color: '#D4A373',
    rings: [
      {
        id: 'inner',
        skills: [
          { name: 'Java', slug: 'java', color: '#D4A373', level: 90, customUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
          { name: 'JavaScript', slug: 'javascript', color: '#F5F5F7', level: 95 },
        ]
      },
      {
        id: 'outer',
        skills: [
          { name: 'C++', slug: 'cplusplus', color: '#A1A1AA', level: 85 },
          { name: 'C', slug: 'c', color: '#B08D57', level: 80 },
          { name: 'PHP', slug: 'php', color: '#71717A', level: 75 },
        ]
      }
    ]
  },
  {
    id: 'cat-2',
    title: 'Web Stack',
    icon: Layers,
    color: '#A1A1AA',
    rings: [
      {
        id: 'inner',
        skills: [
          { name: 'React', slug: 'react', color: '#D4A373', level: 95 },
          { name: 'Node.js', slug: 'nodedotjs', color: '#F5F5F7', level: 90 },
        ]
      },
      {
        id: 'outer',
        skills: [
          { name: 'Express', slug: 'express', color: '#A1A1AA', level: 85 },
          { name: 'Tailwind', slug: 'tailwindcss', color: '#D4A373', level: 90 },
          { name: 'HTML5', slug: 'html5', color: '#F5F5F7', level: 95 },
          { name: 'CSS3', slug: 'css3', color: '#A1A1AA', level: 95, customUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
        ]
      }
    ]
  },
  {
    id: 'cat-3',
    title: 'Infrastructure',
    icon: Terminal,
    color: '#B08D57',
    rings: [
      {
        id: 'inner',
        skills: [
          { name: 'MySQL', slug: 'mysql', color: '#D4A373', level: 85 },
          { name: 'Vercel', slug: 'vercel', color: '#F5F5F7', level: 80 },
        ]
      },
      {
        id: 'outer',
        skills: [
          { name: 'Github', slug: 'github', color: '#A1A1AA', level: 95 },
          { name: 'Git', slug: 'git', color: '#B08D57', level: 90 },
          { name: 'Postman', slug: 'postman', color: '#71717A', level: 85 },
          { name: 'VS Code', slug: 'visualstudiocode', color: '#D4A373', level: 90, customUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg' },
        ]
      }
    ]
  },
  {
    id: 'cat-4',
    title: 'System Core',
    icon: Hardware,
    color: '#F5F5F7',
    rings: [
      {
        id: 'inner',
        skills: [
          { name: 'DSA', icon: GitBranch, color: '#D4A373', level: 85 },
          { name: 'DBMS', icon: Database, color: '#F5F5F7', level: 80 },
        ]
      },
      {
        id: 'outer',
        skills: [
          { name: 'OS', icon: Terminal, color: '#A1A1AA', level: 75 },
          { name: 'CN', icon: Globe, color: '#B08D57', level: 70 },
          { name: 'SQL', slug: 'sqlite', color: '#71717A', level: 85 },
          { name: 'OOPS', icon: Box, color: '#D4A373', level: 85 },
        ]
      }
    ]
  }
];
