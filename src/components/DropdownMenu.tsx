import React, { useState } from 'react';
import { Button } from '@components/ui/button';
import {
  DropdownMenu as DropdownMenuPrimitive,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@components/ui/dropdown-menu';

// Make sure to import your hook from its module.
import { useScrollLock } from '@hooks/useScrollLock';

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

const DropdownMenu: React.FC<DropdownProps> = ({ children, variant, ariaLabel }) => {
  const [dropdownTrigger, dropdownItem] = children;
  const [isOpen, setIsOpen] = useState(false);

  // Lock scrolling when the dropdown is open.
  // useScrollLock(isOpen);

  return (
    // Radix reflow issue workaround: setting modal={false} fixes the scroll & performance issues.
    // We instead manually implement scroll locking
    // https://github.com/radix-ui/primitives/issues/1634
    <DropdownMenuPrimitive modal={false} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant={variant}
          aria-label={ariaLabel}
          className="group flex h-9 px-2 text-muted-foreground hover:text-foreground/80 hover:no-underline data-[state='open']:bg-accent data-[state='open']:text-foreground/80"
        >
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

