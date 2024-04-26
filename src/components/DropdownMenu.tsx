import React from 'react';
import { Button } from '@components/ui/button';
import {
  DropdownMenu as DropdownMenuPrimitive,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@components/ui/dropdown-menu';

type DropdownProps = {
  children: [React.ReactNode, React.ReactNode];
  ariaLabel?: string;
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

const DropdownMenu: React.FC<DropdownProps> = ({
  children,
  variant,
  ariaLabel,
}) => {
  const [dropdownTrigger, dropdownItem] = children;

  return (
    <DropdownMenuPrimitive>
      <DropdownMenuTrigger asChild>
        <Button
          variant={variant}
          aria-label={ariaLabel}
          className="group flex h-9 px-2 text-muted-foreground hover:text-foreground/80 hover:no-underline data-[state='open']:bg-accent data-[state='open']:text-foreground/80">
          {dropdownTrigger}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-fit" align="center">
        {dropdownItem}
      </DropdownMenuContent>
    </DropdownMenuPrimitive>
  );
};

export { DropdownMenu, DropdownMenuItem };
