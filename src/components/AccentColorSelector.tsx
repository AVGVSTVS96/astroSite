import React, { useState, useEffect } from 'react';
import { Dropdown } from './DropdownMenu';

import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@components/ui/tooltip';

interface ThemeOptionItemProps {
  className: string;
  colorName: string;
}

const ThemeOptionItem: React.FC<ThemeOptionItemProps> = ({
  className,
  colorName,
}) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className={`${className} size-5 rounded-full`} />
      </TooltipTrigger>
      <TooltipContent>
        <p>{colorName}</p>
      </TooltipContent>
    </Tooltip>
  );
};

const themeOptions = [
  {
    name: <ThemeOptionItem className="bg-sky-400" colorName="Sky" />,
    href: '#sky',
  },
  {
    name: <ThemeOptionItem className="bg-cyan-400" colorName="Cyan" />,
    href: '#cyan',
  },
  {
    name: <ThemeOptionItem className="bg-teal-400" colorName="Teal" />,
    href: '#teal',
  },
  {
    name: <ThemeOptionItem className="bg-emerald-400" colorName="Emerald" />,
    href: '#emerald',
  },
  {
    name: <ThemeOptionItem className="bg-violet-400" colorName="Violet" />,
    href: '#violet',
  },
  {
    name: <ThemeOptionItem className="bg-fuchsia-400" colorName="Fuchsia" />,
    href: '#fuchsia',
  },
  {
    name: <ThemeOptionItem className="bg-amber-400" colorName="Amber" />,
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
