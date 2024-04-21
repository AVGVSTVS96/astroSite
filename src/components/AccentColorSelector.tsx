import React, { useState, useEffect } from 'react';
import { Dropdown } from './DropdownMenu';

const themeOptions = [
  {
    name: React.createElement('div', {
      className: 'bg-sky-400 size-5 rounded-full',
    }),
    href: '#sky',
  },
  {
    name: React.createElement('div', {
      className: 'bg-cyan-400 size-5 rounded-full',
    }),
    href: '#cyan',
  },
  {
    name: React.createElement('div', {
      className: 'bg-teal-400 size-5 rounded-full',
    }),
    href: '#teal',
  },
  {
    name: React.createElement('div', {
      className: 'bg-emerald-400 size-5 rounded-full',
    }),
    href: '#emerald',
  },
  {
    name: React.createElement('div', {
      className: 'bg-violet-400 size-5 rounded-full',
    }),
    href: '#violet',
  },
  {
    name: React.createElement('div', {
      className: 'bg-fuchsia-400 size-5 rounded-full',
    }),
    href: '#fuchsia',
  },
  {
    name: React.createElement('div', {
      className: 'bg-amber-400 size-5 rounded-full',
    }),
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
    <Dropdown
      items={themeOptions}
      ariaLabel="Open accent color selector menu"
      variant="outline"
      onSelect={handleThemeChange}>
      <div className="flex items-center">
        <div className="size-5 rounded-full bg-accent-400" />
      </div>
    </Dropdown>
  );
};
