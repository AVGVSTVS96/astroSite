import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@components/ui/sheet';
import { Button } from '@components/ui/button';
import { HamburgerMenuIcon } from '@radix-ui/react-icons';
import { HomeIcon, User, NotebookText } from 'lucide-react';

export function SideMenu() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <HamburgerMenuIcon className="size-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64">
        <SheetTitle className="font-bold">bassim</SheetTitle>
        <nav className="mt-4 flex flex-col *:justify-start [&_a]:my-1.5">
          <section>
            <span className="flex items-center">
              <Button
                variant="ghost"
                size="lg"
                className="h-9 w-full justify-start px-3 hover:no-underline">
                <HomeIcon className="mr-2 size-4" />
                <a href="/">Home</a>
              </Button>
            </span>
            <span className="flex items-center">
              <Button
                variant="ghost"
                size="lg"
                className="h-9 w-full justify-start px-3 hover:no-underline">
                <User className="mr-2 size-4" />
                <a href="/about">About</a>
              </Button>
            </span>
            <span className="flex items-center">
              <Button
                variant="ghost"
                size="lg"
                className="h-9 w-full justify-start px-3 hover:no-underline">
                <NotebookText className="mr-2 size-4" />
                <a href="/blog">Blog</a>
              </Button>
            </span>
          </section>
          <hr className="my-4" />
          <section>
            <h4 className="mb-2 ml-2 mt-1 font-semibold">Projects</h4>
            <span className="flex flex-col items-start [&_a]:h-full [&_a]:px-4">
              <Button
                asChild
                variant="link"
                size="lg"
                className="w-full justify-start text-muted-foreground hover:text-foreground hover:no-underline">
                <a href="/designProject">Minimal Typography</a>
              </Button>
              <Button
                asChild
                variant="link"
                size="lg"
                className="w-full justify-start text-muted-foreground hover:text-foreground hover:no-underline">
                <a href="/flaskSite">Old Flask Website</a>
              </Button>
              <Button
                asChild
                variant="link"
                size="lg"
                className="w-full justify-start text-muted-foreground hover:text-foreground hover:no-underline">
                <a href="/gpt">GPT Chat</a>
              </Button>
              <Button
                asChild
                variant="link"
                size="lg"
                className="w-full justify-start text-muted-foreground hover:text-foreground hover:no-underline">
                <a href="/react">React + shadcn/ui</a>
              </Button>
            </span>
          </section>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
