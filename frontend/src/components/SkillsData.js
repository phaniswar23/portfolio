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
    color: '#6EE7F9',
    rings: [
      {
        id: 'inner',
        skills: [
          { name: 'Java', slug: 'java', color: '#ED8B00', level: 90, customUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
          { name: 'JavaScript', slug: 'javascript', color: '#F7DF1E', level: 95 },
        ]
      },
      {
        id: 'outer',
        skills: [
          { name: 'C++', slug: 'cplusplus', color: '#00599C', level: 85 },
          { name: 'C', slug: 'c', color: '#A8B9CC', level: 80 },
          { name: 'PHP', slug: 'php', color: '#777BB4', level: 75 },
        ]
      }
    ]
  },
  {
    id: 'cat-2',
    title: 'Web Stack',
    icon: Layers,
    color: '#A78BFA',
    rings: [
      {
        id: 'inner',
        skills: [
          { name: 'React', slug: 'react', color: '#61DAFB', level: 95 },
          { name: 'Node.js', slug: 'nodedotjs', color: '#339933', level: 90 },
        ]
      },
      {
        id: 'outer',
        skills: [
          { name: 'Express', slug: 'express', color: '#000000', level: 85 },
          { name: 'Tailwind', slug: 'tailwindcss', color: '#06B6D4', level: 90 },
          { name: 'HTML5', slug: 'html5', color: '#E34F26', level: 95 },
          { name: 'CSS3', slug: 'css3', color: '#1572B6', level: 95, customUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
        ]
      }
    ]
  },
  {
    id: 'cat-3',
    title: 'Infrastructure',
    icon: Terminal,
    color: '#F472B6',
    rings: [
      {
        id: 'inner',
        skills: [
          { name: 'MySQL', slug: 'mysql', color: '#4479A1', level: 85 },
          { name: 'Vercel', slug: 'vercel', color: '#000000', level: 80 },
        ]
      },
      {
        id: 'outer',
        skills: [
          { name: 'Github', slug: 'github', color: '#181717', level: 95 },
          { name: 'Git', slug: 'git', color: '#F05032', level: 90 },
          { name: 'Postman', slug: 'postman', color: '#FF6C37', level: 85 },
          { name: 'VS Code', slug: 'visualstudiocode', color: '#007ACC', level: 90, customUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg' },
        ]
      }
    ]
  },
  {
    id: 'cat-4',
    title: 'System Core',
    icon: Hardware,
    color: '#34D399',
    rings: [
      {
        id: 'inner',
        skills: [
          { name: 'DSA', icon: GitBranch, color: '#FF3621', level: 85 },
          { name: 'DBMS', icon: Database, color: '#4285F4', level: 80 },
        ]
      },
      {
        id: 'outer',
        skills: [
          { name: 'OS', icon: Terminal, color: '#FCC624', level: 75 },
          { name: 'CN', icon: Globe, color: '#1BA0D7', level: 70 },
          { name: 'SQL', slug: 'sqlite', color: '#003B57', level: 85 },
          { name: 'OOPS', icon: Box, color: '#6EE7F9', level: 85 },
        ]
      }
    ]
  }
];
