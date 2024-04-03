import * as React from 'react';

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

import { cn } from '@/lib/utils';

import { ArrowTopRightIcon } from '@radix-ui/react-icons';
import { NotebookText } from 'lucide-react';

import { mainLinks, projectLinks, iconStyles } from './navLinks';

type CommandMenuProps = {
  buttonStyles?: string;
  posts?: any[];
};

export function CommandMenu({ buttonStyles, posts }: CommandMenuProps) {
  const [open, setOpen] = React.useState(false);

  const handleKeyDown = (e: KeyboardEvent) => {
    const isEditable =
      (e.target instanceof HTMLElement && e.target.isContentEditable) ||
      e.target instanceof HTMLInputElement ||
      e.target instanceof HTMLTextAreaElement ||
      e.target instanceof HTMLSelectElement;

    const linkShortcut = mainLinks.find((link) =>
      link.shortcut.toLowerCase().endsWith(e.key.toLowerCase())
    );

    if (
      ((e.metaKey || e.ctrlKey) && (e.key === 'k' || linkShortcut)) ||
      (e.key === '/' && !isEditable)
    ) {
      e.preventDefault();
      e.key === 'k' || e.key === '/'
        ? setOpen((open) => !open)
        : linkShortcut && navigate(linkShortcut.href);
    }
  };

  React.useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const navigate = (href: string) => {
    window.location.href = href;
  };

  return (
    <>
      <Button
        aria-label="Open command menu"
        variant="outline"
        className={cn(
          'relative hidden h-9 justify-between rounded-[0.5rem] bg-background pr-1.5 text-sm font-normal text-muted-foreground shadow-none sm:flex',
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
            {posts?.map((post, index) => (
              <CommandItem
                slot="blogPosts"
                key={index}
                aria-label={`Link to blog post: ${post.frontmatter.title}`}
                onSelect={() => navigate(post.url)}>
                <NotebookText className={iconStyles} />
                {post.frontmatter.title}
                <CommandShortcut>{post.frontmatter.pubDate}</CommandShortcut>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
