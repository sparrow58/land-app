import { toggleLanguage } from "@/app/helpers/urlHelpers";
import Link from "next/link";
import { usePathname } from "next/navigation";

const PreferenceMenu = () => {
  const url = usePathname();
  const { newPath, currentLanguage } = toggleLanguage(url);
  return (
    <ul className="flex grow justify-end flex-wrap items-center">
      <li>
        <Link
          href={newPath!}
          className="font-medium text-gray-600 hover:text-gray-900 px-5 py-3 flex items-center transition duration-150 ease-in-out"
        >
          {currentLanguage === "ar" ? "English" : "عربي"}
        </Link>
      </li>
    </ul>
  );
};

export default PreferenceMenu;
