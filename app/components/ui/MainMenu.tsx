"use client";

import { LinkItemProps } from "@/app/Props/RoutingProps";
import MainMenuItem from "./MainMenuItem";

interface Props {
  linkItems: LinkItemProps[];
}

const MainMenu = ({ linkItems }: Props) => {
  return (
    <ul className="flex grow justify-start flex-wrap items-center space-x-4">
      {linkItems?.map((item) => (
        <li key={item.text}>
          <MainMenuItem url={item.url} text={item.text} />
        </li>
      ))}
    </ul>
  );
};

export default MainMenu;
