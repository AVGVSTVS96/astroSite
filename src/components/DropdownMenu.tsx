import React from 'react';
import { Button } from '@components/ui/button';
import {
  DropdownMenu,
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

export const Dropdown: React.FC<DropdownProps> = ({
  children,
  variant,
  ariaLabel,
}) => {
  const [triggerChild, dropdownItem] = children;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={variant}
          aria-label={ariaLabel}
          className="group flex h-9 px-2 text-muted-foreground hover:text-foreground/80 hover:no-underline data-[state='open']:bg-accent data-[state='open']:text-foreground/80">
          {triggerChild}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-fit" align="center">
        {dropdownItem}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
