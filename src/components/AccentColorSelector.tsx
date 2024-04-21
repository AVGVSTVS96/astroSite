import React, { useState, useEffect } from 'react';
import { Dropdown } from './DropdownMenu';

const themeOptions = [
  { name: 'Sky', href: '#sky' },
  { name: 'Cyan', href: '#cyan' },
  { name: 'Teal', href: '#teal' },
  { name: 'Emerald', href: '#emerald' },
  { name: 'Violet', href: '#violet' },
  { name: 'Fuchsia', href: '#fuchsia' },
  { name: 'Amber', href: '#amber' },
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
