import * as React from 'react';

import { ArrowTopRightIcon } from '@radix-ui/react-icons';

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@/components/ui/command';
import { Button } from '@/components/ui/button';

import { mainLinks, projectLinks } from './SideMenu';

export function CommandMenu() {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey) {
        e.preventDefault();
        if (e.key === 'k') {
          setOpen((open) => !open);
        } else {
          const link = mainLinks.find((link) =>
            link.shortcut.toLowerCase().endsWith(e.key.toLowerCase())
          );
          if (link) {
            navigate(link.href);
          }
        }
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const navigate = (href: string) => {
    window.location.href = href;
  };

  return (
    <>
      <Button
        variant="outline"
        className={
          'relative hidden h-9 justify-between rounded-[0.5rem] bg-background pr-1.5 text-sm font-normal text-muted-foreground shadow-none sm:flex'
        }
        style={{ width: 'clamp(90px, 20vw, 240px)' }}
        onClick={() => setOpen(true)}>
        <span className="inline-flex">Search...</span>
        <kbd className="pointer-events-none hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            {mainLinks.map((link, index) => (
              <CommandItem key={index} onSelect={() => navigate(link.href)}>
                {link.icon}
                {link.name}
                <CommandShortcut>{link.shortcut}</CommandShortcut>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Projects">
            {projectLinks.map((project, index) => (
              <CommandItem key={index} onSelect={() => navigate(project.href)}>
                <ArrowTopRightIcon className="mr-2 size-4" />
                {project.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
