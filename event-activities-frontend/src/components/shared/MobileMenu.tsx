"use client"

import { useState } from "react";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "../ui/button";


interface MobileMenuProps {
  links: React.ReactNode;
}

export default function MobileMenu({ links }: MobileMenuProps) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <Menu size={24} />
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="w-64">
        <div className="flex flex-col gap-4 mt-6 p-6">{links}</div>
      </SheetContent>
    </Sheet>
  );
}
