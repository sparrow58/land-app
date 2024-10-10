import { useToggleLanguage } from "@/app/hooks/ui/languageHooks";
import Link from "next/link";

const PreferenceMenu = () => {
  const { newPath, currentLanguage } = useToggleLanguage();
  return (
    <ul className="flex grow justify-end flex-wrap items-center">
      <li>
        <Link
          href={newPath!}
          className="font-medium hover:text-gray-900 px-5 py-3 flex items-center transition duration-150 ease-in-out"
        >
          {currentLanguage === "ar" ? "English" : "عربي"}
        </Link>
      </li>
    </ul>
  );
};

export default PreferenceMenu;
