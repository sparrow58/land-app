import Link from "next/link";
import MainMenuItem from "./MainMenuItem";
import { LinkItemProps } from "@/app/Props/RoutingProps";
interface Props {
  linkItems: LinkItemProps[];
}
const MainMenu = ({ linkItems }: Props) => {
  return (
    <ul className="flex grow justify-start flex-wrap items-center">
      {linkItems &&
        linkItems.map((item) => {
          return (
            <li key={item.text}>
              <MainMenuItem url={item.url} text={item.text} />
            </li>
          );
        })}
    </ul>
  );
};

export default MainMenu;
