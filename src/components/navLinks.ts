import { HomeIcon, User, NotebookTabs } from 'lucide-react';

export const iconStyles = 'mr-2 size-4';

export const mainLinks = [
  {
    name: 'Home',
    icon: HomeIcon,
    href: '/',
    shortcut: '⌘E',
  },
  {
    name: 'About',
    icon: User,
    href: '/about',
    shortcut: '⌘A',
  },
  {
    name: 'Blog',
    icon: NotebookTabs,
    href: '/blog',
    shortcut: '⌘B',
  },
  {
    name: 'BlogTimeline',
    icon: NotebookTabs,
    href: '/blogLine',
    // shortcut: '⌘M',
  },

];

export const projectLinks = [
  { name: 'Minimal Typography', href: '/designProject' },
  { name: 'Old Flask Website', href: '/flaskSite' },
  { name: 'GPT Chat', href: '/gpt' },
  { name: 'React + shadcn/ui', href: '/react' },
  { name: 'Chat UI', href: '/gptchat' },
];
