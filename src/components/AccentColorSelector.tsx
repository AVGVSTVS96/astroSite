import React, { useState, useEffect } from 'react';
import { DropdownMenu, DropdownMenuItem } from './DropdownMenu';
import { Arrow } from '@radix-ui/react-tooltip';
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@components/ui/tooltip';


const themeOptions = [
  { colorName: 'Sky', colorClass: 'bg-sky-400', href: '#sky' },
  { colorName: 'Cyan', colorClass: 'bg-cyan-400', href: '#cyan' },
  { colorName: 'Teal', colorClass: 'bg-teal-400', href: '#teal' },
  { colorName: 'Emerald', colorClass: 'bg-emerald-400', href: '#emerald' },
  { colorName: 'Violet', colorClass: 'bg-violet-400', href: '#violet' },
  { colorName: 'Fuchsia', colorClass: 'bg-fuchsia-400', href: '#fuchsia' },
  { colorName: 'Amber', colorClass: 'bg-amber-400', href: '#amber' },
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
      <DropdownMenu ariaLabel="Open accent color selector menu" variant="outline">
        <div className="flex items-center">
          <div className="size-5 rounded-full bg-accent-400" />
        </div>
        {themeOptions.map((option) => (
          <Tooltip key={option.href} delayDuration={250}>
            <TooltipTrigger asChild>
              <DropdownMenuItem
                className="py-2 text-muted-foreground"
                onSelect={() => handleThemeChange(option.href)}>
                <div className="flex items-center space-x-2">
                  <div className={`${option.colorClass} size-5 rounded-full`} />
                  <span className="sr-only">{option.colorName}</span>
                </div>
              </DropdownMenuItem>
            </TooltipTrigger>
            <TooltipContent
              side="left"
              sideOffset={0}
              className="bg-muted text-foreground">
              {option.colorName}
              <Arrow className="fill-muted" width={12} height={6} />
            </TooltipContent>
          </Tooltip>
        ))}
      </DropdownMenu>
    </TooltipProvider>
  );
};
