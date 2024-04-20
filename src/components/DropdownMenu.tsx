import React from 'react';

import { Button } from '@components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@components/ui/dropdown-menu';

type DropdownProps = {
  items: { name: string; href: string }[];
  children: React.ReactNode;
  onSelect?: (href: string) => void;
  variant?:
    | 'ghost'
    | 'link'
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | null
    | undefined;
};

export const Dropdown: React.FC<DropdownProps> = ({
  children,
  items,
  variant,
  onSelect,
}) => {
  const handleSelect = (href: string) => {
    if (onSelect) {
      onSelect(href);
    } else {
      window.location.href = href;
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={variant}
          className="group hidden h-9 px-2 text-muted-foreground hover:text-foreground/80 hover:no-underline data-[state='open']:bg-accent data-[state='open']:text-foreground/80 sm:flex">
          {children}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-24 min-w-fit" align="center">
        {items.map((item) => (
          <DropdownMenuItem
            key={item.name}
            className="py-2 text-muted-foreground"
            onSelect={() => handleSelect(item.href)}>
            {item.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
