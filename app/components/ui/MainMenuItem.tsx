"use client";

import { LinkItemProps } from "@/app/Props/RoutingProps";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const MainMenuItem = ({ url, text, children }: LinkItemProps) => {
  const currentUrl = usePathname();

  return (
    <Link
      href={url}
      className={cn(
        "font-medium px-3 py-2 rounded-md transition duration-150 ease-in-out",
        currentUrl === url
          ? "bg-primary text-primary-foreground"
          : "hover:bg-accent hover:text-accent-foreground"
      )}
    >
      {text}
      {children}
    </Link>
  );
};

export default MainMenuItem;
