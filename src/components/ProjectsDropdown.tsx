import React from 'react';
import { DropdownMenu, DropdownMenuItem } from './DropdownMenu';
import { ChevronDown } from 'lucide-react';
import { projectLinks } from './navLinks';
import { isActiveLink } from '@/lib/utils';
import { handleMouseDown } from '@/lib/utils';

export const ProjectsDropdown: React.FC = () => {
  const currentPath =
    typeof window !== 'undefined' ? window.location.pathname : '';
  const [hasActiveLink, setHasActiveLink] = React.useState(false);

  React.useEffect(() => {
    setHasActiveLink(
      projectLinks.some(
        (link) => isActiveLink(currentPath, link.href) === 'text-foreground'
      )
    );
  }, [currentPath]);

  return (
    <DropdownMenu variant="link" ariaLabel="Open projects dropdown menu">
      <span
        className={`flex items-center ${hasActiveLink ? 'text-foreground' : ''}`}>
        Projects
        <ChevronDown
          size={12}
          className="ml-1.5 mt-[1.5px] transition-all group-data-[state=open]:rotate-180"
        />
      </span>
      {projectLinks.map(({ href, name }) => {
        const activeClass = isActiveLink(currentPath, href);
        return (
          <DropdownMenuItem
            key={href}
            className={`py-2 ${activeClass}`}
            onMouseDown={handleMouseDown({ href })}>
            {name}
          </DropdownMenuItem>
        );
      })}
    </DropdownMenu>
  );
};
