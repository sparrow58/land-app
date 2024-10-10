import { LinkItemProps } from "@/app/Props/RoutingProps";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const MainMenuItem = ({ url, text, children }: LinkItemProps) => {
  const currntUrl = usePathname();
  return (
    <Link
      href={url}
      className={`${
        currntUrl === url
          ? "text-gray-200 rounded-xl bg-custom-primaryhover"
          : " hover:text-custom-primaryhover"
      }
        font-medium   px-5 py-3 flex items-center transition duration-150 ease-in-out`}
    >
      {text}
      {children}
    </Link>
  );
};

export default MainMenuItem;
