import { Button } from '@components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@components/ui/dropdown-menu';

export function Dropdown({ children, items }: { children: React.ReactNode, items: {name: string, href: string}[] }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="data-[state='open']:bg-accent group hidden h-9 px-2 text-muted-foreground hover:text-foreground/80 hover:no-underline data-[state='open']:text-foreground/80 sm:flex">
          {children}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-24 min-w-fit">
        {items.map((item) => (
          <DropdownMenuItem
            key={item.name}
            className="py-2 text-muted-foreground">
            <a href={item.href}>{item.name}</a>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
