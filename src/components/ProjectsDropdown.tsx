import React from 'react';
import { Dropdown } from '@components/DropdownMenu';
import { ChevronDown } from 'lucide-react';
import { DropdownMenuItem } from '@components/ui/dropdown-menu';
import { projectLinks } from './navLinks';

export const ProjectsDropdown: React.FC = () => {
  return (
    <Dropdown variant="link" ariaLabel="Open projects dropdown menu">
      <span className="flex items-center">
        Projects
        <ChevronDown
          size={12}
          className="ml-1.5 mt-[1.5px] transition-all group-data-[state=open]:rotate-180"
        />
      </span>
      {projectLinks.map((link) => (
        <DropdownMenuItem
          key={link.href}
          className="py-2 text-muted-foreground"
          onSelect={() => {
            window.location.href = link.href;
          }}>
          {link.name}
        </DropdownMenuItem>
      ))}
    </Dropdown>
  );
};
