import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "src/components/ui/sheet";
import { useDrawerOpenStore } from "~/lib/states/drawer_open";
import DrawerLayout from "./drawer_layout";

function Hamburger() {
  const doStore = useDrawerOpenStore();
  return (
    <Sheet open={doStore.isOpen} onOpenChange={doStore.setIsOpen}>
      <SheetTrigger className="btn">
        <Menu />
      </SheetTrigger>
      <SheetContent side={"left"} className="w-80 !border-none !px-0">
        <DrawerLayout />
      </SheetContent>
    </Sheet>
  );
}

export default Hamburger;
