import { useState, useEffect } from 'react';
import { Dropdown } from '@components/DropdownMenu';

const themeOptions = [
  { name: 'Sky', href: '#sky' },
  { name: 'Cyan', href: '#cyan' },
  { name: 'Teal', href: '#teal' },
  { name: 'Emerald', href: '#emerald' },
  { name: 'Violet', href: '#violet' },
  { name: 'Fuchsia', href: '#fuchsia' },
  { name: 'Amber', href: '#amber' },
];

export function AccentColorSelector() {
  const [selectedTheme, setSelectedTheme] = useState('sky');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', selectedTheme);
  }, [selectedTheme]);

  const handleThemeChange = (href) => {
    const theme = href.substring(1);
    setSelectedTheme(theme);
  };

  return (
    <Dropdown
      items={themeOptions}
      variant="outline"
      onSelect={handleThemeChange}>
      <div className="flex items-center">
        <div className="size-6 rounded-full bg-accent-400" />
      </div>
    </Dropdown>
  );
}
