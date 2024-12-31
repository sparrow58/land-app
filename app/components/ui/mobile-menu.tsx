"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { LinkItemProps } from "@/app/Props/RoutingProps";
import { SignInProps } from "./SigninMenu";

interface MobileMenuProps extends SignInProps {
  linkItems: LinkItemProps[];
}

export default function MobileMenu({
  linkItems,
  sign_in,
  sign_up,
  lang,
}: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="md:hidden">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" aria-label="Menu">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[300px] sm:w-[400px]">
          <div className="flex flex-col h-full">
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-4"
              onClick={toggleMenu}
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </Button>
            <nav className="flex flex-col mt-16">
              {linkItems.map((item) => (
                <Link
                  key={item.text}
                  href={item.url}
                  className="px-4 py-2 text-lg font-medium hover:bg-accent hover:text-accent-foreground rounded-md transition-colors duration-200"
                  onClick={toggleMenu}
                >
                  {item.text}
                </Link>
              ))}
            </nav>
            <div className="mt-auto mb-8">
              <Button asChild variant="outline" className="w-full mb-4">
                <Link href={`/${lang}/signin`} onClick={toggleMenu}>
                  {sign_in}
                </Link>
              </Button>
              <Button asChild className="w-full">
                <Link href={`/${lang}/signup`} onClick={toggleMenu}>
                  {sign_up}
                </Link>
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
