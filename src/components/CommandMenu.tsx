import * as React from 'react';
import { useThemeToggle } from '@hooks/useThemeToggle';
import { ThemeIcon } from './ModeToggle';

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

import { ArrowTopRightIcon } from '@radix-ui/react-icons';
import { NotebookText } from 'lucide-react';

import { cn } from '@/lib/utils';
import { formatDate } from '@utils/formateDate';
import { sortedBlogPosts } from '@utils/getSortedPosts';
import { mainLinks, projectLinks, iconStyles } from './navLinks';

type CommandMenuProps = {
  buttonStyles?: string;
};

export function CommandMenu({ buttonStyles }: CommandMenuProps) {
  const [open, setOpen] = React.useState(false);
  const { toggleTheme } = useThemeToggle();

  const handleKeyDown = (event: KeyboardEvent) => {
    const { metaKey, ctrlKey, key, target } = event;

    const isEditable =
      (target instanceof HTMLElement && target.isContentEditable) ||
      target instanceof HTMLInputElement ||
      target instanceof HTMLTextAreaElement ||
      target instanceof HTMLSelectElement;

    const linkShortcut = mainLinks.find((link) =>
      link.shortcut.toLowerCase().endsWith(key.toLowerCase())
    );

    if (
      ((metaKey || ctrlKey) && (key === 'k' || linkShortcut)) ||
      (key === '/' && !isEditable)
    ) {
      event.preventDefault();
      key === 'k' || key === '/'
        ? setOpen((open) => !open)
        : linkShortcut && navigate(linkShortcut.href);
    }
  };

  const navigate = (href: string) => {
    window.location.href = href;
  };

  React.useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <>
      <Button
        aria-label="Open command menu"
        variant="outline"
        className={cn(
          'relative hidden h-9 justify-between rounded-[0.5rem] bg-background pr-1.5 text-sm font-normal text-muted-foreground shadow-none md:flex',
          buttonStyles
        )}
        style={{ width: 'clamp(120px, 20vw, 240px)' }}
        onClick={() => setOpen(true)}>
        <span className="inline-flex">Search...</span>
        <kbd className="pointer-events-none flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100">
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
                {React.createElement(link.icon, { className: iconStyles })}
                {link.name}
                <CommandShortcut>{link.shortcut}</CommandShortcut>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Projects">
            {projectLinks.map((project, index) => (
              <CommandItem key={index} onSelect={() => navigate(project.href)}>
                <ArrowTopRightIcon className={iconStyles} />
                {project.name}
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Blog Posts">
            {sortedBlogPosts.map((post, index) => (
              <CommandItem
                slot="blogPosts"
                key={index}
                className="text-balance"
                aria-label={`Link to blog post: ${post.data.title}`}
                onSelect={() => navigate(`/posts/${post.slug}/`)}>
                <NotebookText className={iconStyles} />
                {post.data.title}
                <CommandShortcut className="whitespace-nowrap pl-4 tracking-wide">
                  {formatDate(post.data.pubDate, {
                    month: 'short',
                  })}
                </CommandShortcut>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Settings">
            <CommandItem onSelect={toggleTheme}>
              <ThemeIcon />
              <span className="ml-2">Toggle theme</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
