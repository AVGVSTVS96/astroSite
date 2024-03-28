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

export function SideMenu() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <HamburgerMenuIcon className="size-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetTitle className="font-bold">bassim</SheetTitle>
        <nav className="mt-4 flex flex-col *:justify-start">
          <Button
            asChild
            variant="link"
            size="lg"
            className="hover:no-underline w-max py-0">
            <a href="/">Home</a>
          </Button>
          <Button
            asChild
            variant="link"
            size="lg"
            className="hover:no-underline w-max py-0">
            <a href="/about">About</a>
          </Button>
          <Button
            asChild
            variant="link"
            size="lg"
            className="hover:no-underline w-max py-0">
            <a href="/blog">Blog</a>
          </Button>
          <h4 className="ml-4 mt-4 mb-2 font-semibold">Projects</h4>
          <Button
            asChild
            variant="link"
            size="lg"
            className="hover:no-underline">
            <a href="/designProject">Minimal Typography</a>
          </Button>
          <Button
            asChild
            variant="link"
            size="lg"
            className="hover:no-underline">
            <a href="/flaskSite">Old Flask Website</a>
          </Button>
          <Button
            asChild
            variant="link"
            size="lg"
            className="hover:no-underline">
            <a href="/gpt">GPT Chat</a>
          </Button>
          <Button
            asChild
            variant="link"
            size="lg"
            className="hover:no-underline">
            <a href="/react">React + shadcn/ui</a>
          </Button>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
