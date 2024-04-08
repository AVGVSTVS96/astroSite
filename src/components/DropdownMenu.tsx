import { Button } from '@components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@components/ui/dropdown-menu';
import { projectLinks } from './navLinks';

export function Dropdown({ children }: { children: React.ReactNode }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="link"
          className="hidden h-9 px-2 text-muted-foreground hover:text-foreground/80 hover:no-underline data-[state='open']:text-foreground/80 sm:flex">
          {children}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-24 min-w-fit">
        {projectLinks.map((project) => (
          <DropdownMenuItem
            key={project.name}
            className="text-muted-foreground">
            <a href={project.href}>{project.name}</a>
          </DropdownMenuItem>
        ))}{' '}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
