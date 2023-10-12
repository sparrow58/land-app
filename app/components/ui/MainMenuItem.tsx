import { LinkItemProps } from "@/app/Props/RoutingProps";
import Link from "next/link";
import React from "react";

const MainMenuItem = ({ url, text }: LinkItemProps) => {
  return (
    <Link
      href={url}
      className="font-medium text-gray-600 hover:text-gray-900 px-5 py-3 flex items-center transition duration-150 ease-in-out"
    >
      {text}
    </Link>
  );
};

export default MainMenuItem;
