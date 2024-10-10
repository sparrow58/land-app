"use client";

import * as React from "react";

import { useTheme } from "next-themes";
import { Laptop, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoonIcon, SunIcon } from "lucide-react";

interface Props {
  t: {
    theme: any;
  };
  locale?: any;
}

export function ModeToggle({ t, locale = "en" }: Props) {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={locale === "ar" ? "end" : "start"}>
        <DropdownMenuItem className="font-heading" dir={locale}>
          {t.theme.theme}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => setTheme("light")} dir={locale}>
          <Sun
            aria-hidden="true"
            className={`${locale === "ar" ? "ml-2 h-4 w-4" : "mr-2 h-4 w-4"}`}
          />
          <span>{t.theme.modes.light}</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")} dir={locale}>
          <Moon
            aria-hidden="true"
            className={`${locale === "ar" ? "ml-2 h-4 w-4" : "mr-2 h-4 w-4"}`}
          />
          <span>{t.theme.modes.dark}</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")} dir={locale}>
          <Laptop
            aria-hidden="true"
            className={`${locale === "ar" ? "ml-2 h-4 w-4" : "mr-2 h-4 w-4"}`}
          />
          <span>{t.theme.modes.system}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
