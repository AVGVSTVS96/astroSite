import * as React from 'react';

import { ArrowTopRightIcon } from '@radix-ui/react-icons';
import { NotebookText } from 'lucide-react';

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
import { cn } from '@/lib/utils';

type CommandMenuProps = {
  buttonStyles?: string;
  posts?: any[];
};

export function CommandMenu({ buttonStyles, posts }: CommandMenuProps) {
  const [open, setOpen] = React.useState(false);

  const handleKeyDown = (e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      setOpen((open) => !open);
    } else if (e.key === '/') {
      if (
        !(
          (e.target instanceof HTMLElement && e.target.isContentEditable) ||
          e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLTextAreaElement ||
          e.target instanceof HTMLSelectElement
        )
      ) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    } else if (e.metaKey || e.ctrlKey) {
      const link = mainLinks.find((link) =>
        link.shortcut.toLowerCase().endsWith(e.key.toLowerCase())
      );
      if (link) {
        e.preventDefault();
        navigate(link.href);
      }
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
          <CommandSeparator />
          <CommandGroup heading="Blog Posts">
            {posts?.map((post, index) => (
              <CommandItem
                slot="blogPosts"
                key={index}
                aria-label={`Link to blog post: ${post.frontmatter.title}`}
                onSelect={() => navigate(post.url)}>
                <NotebookText className="mr-2 size-4" />
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
