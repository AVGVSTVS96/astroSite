import { HomeIcon, User, NotebookTabs } from 'lucide-react';

export const iconStyles = 'mr-2 size-4';

export const mainLinks = [
  {
    name: 'Home',
    icon: HomeIcon,
    href: '/',
    shortcut: 'H',
  },
  {
    name: 'About',
    icon: User,
    href: '/about',
    shortcut: 'A',
  },
  {
    name: 'Blog',
    icon: NotebookTabs,
    href: '/blog',
    shortcut: 'B',
  },
];

export const projectLinks = [
  { name: 'First Website', href: '/flaskSite' },
  { name: 'Chat UI', href: '/gptchat' },
];
