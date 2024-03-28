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
          <HamburgerMenuIcon className='size-5' />
        </Button>
      </SheetTrigger>
      <SheetContent side='left'>
        <SheetTitle>Menu</SheetTitle>
      </SheetContent>
    </Sheet>
  );
}
