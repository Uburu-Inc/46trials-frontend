import { forwardRef } from "react";
import { Button } from "../shadcn-components/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../shadcn-components/sheet";
import { DrawerProps } from "./type";
import { LeftArrow } from "./left-arrow";
import { ButtonComponent } from "../button";

const Drawer = forwardRef<HTMLButtonElement, DrawerProps>(function (
  { title, description, proceedText, onProceed, loading, children },
  ref
) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" ref={ref} className="hidden"></Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <div className="flex gap-3">
            <SheetClose asChild>
              <Button
                type="button"
                className="bg-transparent px-0 py-0 hover:bg-transparent"
              >
                <LeftArrow />
              </Button>
            </SheetClose>
            <SheetTitle className="mt-1.5">{title}</SheetTitle>
          </div>
          <SheetDescription>{description}</SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">{children}</div>

        <div className="flex gap-2 mt-3">
          <SheetClose asChild>
            <Button
              type="submit"
              className="bg-[#E3E8EC] text-black hover:bg-[#E3E8EC] font-normal"
            >
              Cancel
            </Button>
          </SheetClose>

          <ButtonComponent
            type="submit"
            className="font-normal bg-black"
            onClick={onProceed}
            loading={loading}
          >
            {loading ? "Loading..." : proceedText}
          </ButtonComponent>
        </div>
      </SheetContent>
    </Sheet>
  );
});

Drawer.displayName = "Drawer";
export default Drawer;
