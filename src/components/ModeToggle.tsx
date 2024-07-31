import { Moon, Sun } from 'lucide-react';
import { Button } from '@components/ui/button';
import { toggleTheme } from '@/lib/utils';

export const ThemeIcon = () => {
  return (
    <>
      <Sun className='size-5 scale-100 dark:scale-0' />
      <Moon className='absolute size-5 scale-0 dark:scale-100' />
    </>
  );
};

export function ModeToggle() {
  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      className="focus-visible:bg-accent focus-visible:ring-transparent">
      <ThemeIcon />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
