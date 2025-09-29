import { useState, useEffect } from 'react';
import { DropdownMenu, DropdownMenuItem } from './DropdownMenu';
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@components/ui/tooltip';

type ThemeOption = {
  colorName:
  | 'Slate'
  | 'Gray'
  | 'Zinc'
  | 'Neutral'
  | 'Stone'
  | 'Red'
  | 'Orange'
  | 'Amber'
  | 'Yellow'
  | 'Lime'
  | 'Green'
  | 'Emerald'
  | 'Teal'
  | 'Cyan'
  | 'Sky'
  | 'Blue'
  | 'Indigo'
  | 'Violet'
  | 'Purple'
  | 'Fuchsia'
  | 'Pink'
  | 'Rose';
  colorClass:
  | 'bg-slate-400'
  | 'bg-gray-400'
  | 'bg-zinc-400'
  | 'bg-neutral-400'
  | 'bg-stone-400'
  | 'bg-red-400'
  | 'bg-orange-400'
  | 'bg-amber-400'
  | 'bg-yellow-400'
  | 'bg-lime-400'
  | 'bg-green-400'
  | 'bg-emerald-400'
  | 'bg-teal-400'
  | 'bg-cyan-400'
  | 'bg-sky-400'
  | 'bg-blue-400'
  | 'bg-indigo-400'
  | 'bg-violet-400'
  | 'bg-purple-400'
  | 'bg-fuchsia-400'
  | 'bg-pink-400'
  | 'bg-rose-400';
  href:
  | '#slate'
  | '#gray'
  | '#zinc'
  | '#neutral'
  | '#stone'
  | '#red'
  | '#orange'
  | '#amber'
  | '#yellow'
  | '#lime'
  | '#green'
  | '#emerald'
  | '#teal'
  | '#cyan'
  | '#sky'
  | '#blue'
  | '#indigo'
  | '#violet'
  | '#purple'
  | '#fuchsia'
  | '#pink'
  | '#rose';
};

const themeOptions: ThemeOption[] = [
  { colorName: 'Slate', colorClass: 'bg-slate-400', href: '#slate' },
  { colorName: 'Sky', colorClass: 'bg-sky-400', href: '#sky' },
  { colorName: 'Cyan', colorClass: 'bg-cyan-400', href: '#cyan' },
  { colorName: 'Teal', colorClass: 'bg-teal-400', href: '#teal' },
  { colorName: 'Emerald', colorClass: 'bg-emerald-400', href: '#emerald' },
  { colorName: 'Violet', colorClass: 'bg-violet-400', href: '#violet' },
  { colorName: 'Fuchsia', colorClass: 'bg-fuchsia-400', href: '#fuchsia' },
  { colorName: 'Amber', colorClass: 'bg-amber-400', href: '#amber' },
  { colorName: 'Orange', colorClass: 'bg-orange-400', href: '#orange' },
];

export const AccentColorSelector = () => {
  const isBrowser = typeof window !== 'undefined' && window.localStorage;
  const [selectedTheme, setSelectedTheme] = useState(() => {
    const storedTheme =
      isBrowser && window.localStorage.getItem('themeSwitcher');
    return storedTheme;
  });

  useEffect(() => {
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleStorageChange = () => {
    const storedTheme = localStorage.getItem('themeSwitcher') || 'orange';

    if (isBrowser && storedTheme !== selectedTheme) {
      setSelectedTheme(storedTheme);
      document.documentElement.setAttribute('data-theme', storedTheme);
    }
  };

  isBrowser && window.addEventListener('storage', handleStorageChange);

  const handleThemeChange = (href: string) => {
    const theme = href.substring(1);
    setSelectedTheme(theme);
    localStorage.setItem('themeSwitcher', theme);
    document.documentElement.setAttribute('data-theme', theme);
  };

  return (
    <TooltipProvider delayDuration={300}>
      <DropdownMenu
        ariaLabel="Open accent color selector menu"
        variant="outline">
        <div className="flex items-center">
          <div className="size-5 rounded-full bg-accent-400" />
        </div>
        {themeOptions.map((option) => (
          <Tooltip key={option.href}>
            <TooltipTrigger asChild>
              <DropdownMenuItem
                className="py-2 text-muted-foreground"
                onSelect={() => handleThemeChange(option.href)}>
                <div className="flex items-center">
                  <div className={`${option.colorClass} size-5 rounded-full`} />
                  <span className="sr-only">{option.colorName}</span>
                </div>
              </DropdownMenuItem>
            </TooltipTrigger>
            <TooltipContent
              side="left"
              sideOffset={10}
              className="bg-popover/95 text-popover-foreground border border-border/50 backdrop-blur-sm">
              {option.colorName}
            </TooltipContent>
          </Tooltip>
        ))}
      </DropdownMenu>
    </TooltipProvider>
  );
};
