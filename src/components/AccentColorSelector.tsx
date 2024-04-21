import React, { useState, useEffect } from 'react';
import { Dropdown } from './DropdownMenu';
import { Arrow } from '@radix-ui/react-tooltip';
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
    <Tooltip delayDuration={250}>
      <TooltipTrigger asChild>
        <div className={`${className} size-5 rounded-full`} />
      </TooltipTrigger>
      <TooltipContent
        side="left"
        sideOffset="1"
        className="bg-muted text-foreground">
        {colorName}
        <Arrow className="fill-muted" width={12} height={6} />
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
    return storedTheme;
  });

  useEffect(() => {
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const localStorageAccessible =
    typeof window !== 'undefined' && window.localStorage;

  const handleStorageChange = () => {
    const storedTheme = localStorage.getItem('themeSwitcher') || 'sky';

    if (localStorageAccessible && storedTheme !== selectedTheme) {
      setSelectedTheme(storedTheme);
      document.documentElement.setAttribute('data-theme', storedTheme);
    }
  };

  if (localStorageAccessible)
    window.addEventListener('storage', handleStorageChange);

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
