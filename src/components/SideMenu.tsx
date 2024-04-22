import React from 'react';

import { Sheet, SheetContent, SheetTitle, SheetTrigger } from './ui/sheet';

import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from './ui/navigation-menu';

import { Button } from './ui/button';
import { HamburgerMenuIcon } from '@radix-ui/react-icons';
import { mainLinks, projectLinks, iconStyles } from './navLinks';

const MainNavButtons: React.FC = () => {
  return (
    <NavigationMenu
      orientation="vertical"
      className="min-w-full [&>div]:w-full">
      <NavigationMenuList className="flex w-full flex-col items-start justify-start space-x-0">
        {mainLinks.map((link) => (
          <NavigationMenuItem key={link.name} className="w-full">
            <NavigationMenuLink href={link.href} className="rounded-md">
              <Button
                tabIndex={-1}
                variant="ghost"
                className="h-9 w-full justify-start px-3">
                {React.createElement(link.icon, {
                  className: iconStyles,
                })}
                {link.name}
              </Button>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

const ProjectNavButtons: React.FC = () => {
  return (
    <NavigationMenu
      orientation="vertical"
      className="min-w-full [&>div]:w-full">
      <NavigationMenuList className="flex w-full flex-col items-start justify-start space-x-0">
        {projectLinks.map((project) => (
          <NavigationMenuItem key={project.name} className="w-full">
            <NavigationMenuLink href={project.href} className="rounded-md">
              <Button
                tabIndex={-1}
                variant="link"
                size="lg"
                className="h-8 w-full justify-start px-3 text-muted-foreground hover:text-foreground hover:no-underline">
                {project.name}
              </Button>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export const SideMenu: React.FC = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" aria-label="Open sidebar menu">
          <HamburgerMenuIcon className="size-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64 overflow-y-auto">
        <SheetTitle className="font-bold">bassim</SheetTitle>
        <div className="mt-4 flex flex-col">
          <section>
            <MainNavButtons />
          </section>
          <hr className="my-4" />
          <section>
            <h4 className="mb-2 ml-2 mt-1 font-semibold">Projects</h4>
            <ProjectNavButtons />
          </section>
        </div>
      </SheetContent>
    </Sheet>
  );
};
