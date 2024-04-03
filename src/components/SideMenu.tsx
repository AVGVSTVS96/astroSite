import React from 'react';

import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@components/ui/sheet';
import { Button } from '@components/ui/button';

import { HamburgerMenuIcon } from '@radix-ui/react-icons';
import { mainLinks, projectLinks, iconStyles } from './navLinks';

export function SideMenu() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" aria-label="Open sidebar menu">
          <HamburgerMenuIcon className="size-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64">
        <SheetTitle className="font-bold">bassim</SheetTitle>
        <nav className="mt-4 flex flex-col">
          <section>
            {mainLinks.map((link) => (
              <span className="flex items-center" key={link.name}>
                <a href={link.href} className="w-full">
                  <Button
                    tabIndex={-1}
                    variant="ghost"
                    size="lg"
                    className="h-9 w-full justify-start px-3 hover:no-underline">
                    {React.createElement(link.icon, {
                      className: iconStyles,
                    })}
                    {link.name}
                  </Button>
                </a>
              </span>
            ))}
          </section>
          <hr className="my-4" />
          <section>
            <h4 className="mb-2 ml-2 mt-1 font-semibold">Projects</h4>
            <span className="flex flex-col items-start [&_a]:my-1.5 [&_a]:h-full [&_a]:px-4">
              {projectLinks.map((project) => (
                <Button
                  asChild
                  variant="link"
                  size="lg"
                  className="w-full justify-start text-muted-foreground hover:text-foreground hover:no-underline"
                  key={project.name}>
                  <a href={project.href}>{project.name}</a>
                </Button>
              ))}
            </span>
          </section>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
