import { Moon, Sun } from 'lucide-react';
import { Button } from '@components/ui/button';

export function ModeToggle() {
  const toggleTheme = () => {
    const currentTheme =
      localStorage.getItem('themeToggle') ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    localStorage.setItem('themeToggle', newTheme);
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      className="focus-visible:bg-accent focus-visible:ring-transparent">
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
