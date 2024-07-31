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
import { formatDate } from '@/lib/utils';
import { mainLinks, projectLinks, iconStyles } from './navLinks';
import { useHotkeys } from 'react-hotkeys-hook';

import type { CollectionEntry } from 'astro:content';
type PostsType = CollectionEntry<'posts'>[];

const SettingsGroup = () => {
  const { toggleTheme } = useThemeToggle();
  return (
    <CommandGroup heading="Settings">
      <CommandItem onSelect={toggleTheme}>
        <ThemeIcon />
        <span className="ml-2">Toggle theme</span>
        <CommandShortcut>T</CommandShortcut>
      </CommandItem>
    </CommandGroup>
  );
};

export function CommandMenu({
  buttonStyles,
  sortedPosts,
}: {
  buttonStyles?: string;
  sortedPosts?: PostsType;
}) {
  const [open, setOpen] = React.useState(false);

  useHotkeys('mod+k', () => setOpen((open) => !open), {
    enableOnFormTags: true,
    preventDefault: true,
  });

  useHotkeys('/', () => setOpen((open) => !open), {
    preventDefault: true,
  });

  const navigate = (href: string) => {
    window.location.href = href;
  };

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
            {mainLinks.map((link) => (
              <CommandItem key={link.name} onSelect={() => navigate(link.href)}>
                {React.createElement(link.icon, { className: iconStyles })}
                {link.name}
                <CommandShortcut>{link.shortcut}</CommandShortcut>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Projects">
            {projectLinks.map((project) => (
              <CommandItem
                key={project.name}
                onSelect={() => navigate(project.href)}>
                <ArrowTopRightIcon className={iconStyles} />
                {project.name}
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Blog posts">
            {sortedPosts?.map((post) => (
              <CommandItem
                slot="blogPosts"
                key={post.data.title}
                className="text-balance"
                aria-label={`Link to blog post: ${post.data.title}`}
                onSelect={() => navigate(`/posts/${post.slug}/`)}>
                <NotebookText className={iconStyles} />
                {post.data.title}
                <CommandShortcut className="whitespace-nowrap pl-4 tracking-wide">
                  <time>
                    {formatDate(post.data.pubDate, {
                      month: 'short',
                    })}
                  </time>
                </CommandShortcut>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <SettingsGroup />
        </CommandList>
      </CommandDialog>
    </>
  );
}
