import { Locale } from "@/i18n.config";
import Link from "next/link";
import { usePathname } from "next/navigation";
import MainMenuItem from "./MainMenuItem";
export interface SignInProps {
  sign_in: string;
  sign_up: string;
  lang: Locale;
}
const SigninMenu = ({ sign_in, sign_up, lang }: SignInProps) => {
  const url = usePathname();

  return (
    <ul className="flex justify-end flex-wrap items-center">
      <li>
        <MainMenuItem url={`/${lang}/signin`} text={sign_in} />
      </li>
      <li>
        <Link
          href={`/${lang}/signup`}
          className="btn-sm text-gray-200 bg-gray-900 hover:bg-gray-800 ml-3 "
        >
          <span className={`${lang === "ar" && "ml-2"}`}>{sign_up}</span>
          <svg
            className={`w-3 h-3 fill-current text-gray-400 shrink-0 ml-2 -mr-1 ${
              lang === "ar" && "transform scale-x-[-1]"
            }`}
            viewBox="0 0 12 12"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.707 5.293L7 .586 5.586 2l3 3H0v2h8.586l-3 3L7 11.414l4.707-4.707a1 1 0 000-1.414z"
              fillRule="nonzero"
            />
          </svg>
        </Link>
      </li>
    </ul>
  );
};

export default SigninMenu;
