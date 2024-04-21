import React, { useState, useEffect } from 'react';
import { Dropdown } from './DropdownMenu';

import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@components/ui/tooltip';

const themeOptions = [
  {
    name: (
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="size-5 rounded-full bg-sky-400" />
        </TooltipTrigger>
        <TooltipContent>
          <p>Sky</p>
        </TooltipContent>
      </Tooltip>
    ),
    href: '#sky',
  },
  {
    name: (
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="size-5 rounded-full bg-cyan-400" />
        </TooltipTrigger>
        <TooltipContent>
          <p>Cyan</p>
        </TooltipContent>
      </Tooltip>
    ),
    href: '#cyan',
  },
  {
    name: (
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="size-5 rounded-full bg-teal-400" />
        </TooltipTrigger>
        <TooltipContent>
          <p>Teal</p>
        </TooltipContent>
      </Tooltip>
    ),
    href: '#teal',
  },
  {
    name: (
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="size-5 rounded-full bg-emerald-400" />
        </TooltipTrigger>
        <TooltipContent>
          <p>Emerald</p>
        </TooltipContent>
      </Tooltip>
    ),
    href: '#emerald',
  },
  {
    name: (
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="size-5 rounded-full bg-violet-400" />
        </TooltipTrigger>
        <TooltipContent>
          <p>Violet</p>
        </TooltipContent>
      </Tooltip>
    ),
    href: '#violet',
  },
  {
    name: (
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="size-5 rounded-full bg-fuchsia-400" />
        </TooltipTrigger>
        <TooltipContent>
          <p>Fuchsia</p>
        </TooltipContent>
      </Tooltip>
    ),
    href: '#fuchsia',
  },
  {
    name: (
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="size-5 rounded-full bg-amber-400" />
        </TooltipTrigger>
        <TooltipContent>
          <p>Amber</p>
        </TooltipContent>
      </Tooltip>
    ),
    href: '#amber',
  },
];

export const AccentColorSelector: React.FC = () => {
  const [selectedTheme, setSelectedTheme] = useState(() => {
    const storedTheme =
      typeof window !== 'undefined' &&
      window.localStorage?.getItem('themeSwitcher');
    return storedTheme || 'sky';
  });

  useEffect(() => {
    const handleStorageChange = () => {
      const storedTheme = localStorage.getItem('themeSwitcher');
      const localStorageAccessible =
        typeof window !== 'undefined' && window.localStorage;

      if (localStorageAccessible && storedTheme !== selectedTheme) {
        setSelectedTheme(storedTheme);
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleThemeChange = (href: string) => {
    const theme = href.substring(1);
    setSelectedTheme(theme);
    localStorage.setItem('themeSwitcher', theme);
    document.documentElement.setAttribute('data-theme', theme);
  };

  return (
    <TooltipProvider>
      <Dropdown
        items={themeOptions}
        ariaLabel="Open accent color selector menu"
        variant="outline"
        onSelect={handleThemeChange}>
        <div className="flex items-center">
          <div className="size-5 rounded-full bg-accent-400" />
        </div>
      </Dropdown>
    </TooltipProvider>
  );
};
