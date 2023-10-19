"use client";

import { useState, useEffect } from "react";

import Logo from "./logo";
import MobileMenu from "./mobile-menu";
import Dropdown from "../utils/dropdown";
import SigninMenu, { SignInProps } from "./SigninMenu";
import MainMenu from "./MainMenu";
import AOS from "aos";
import { LinkItemProps } from "@/app/Props/RoutingProps";
import PreferenceMenu from "./PreferenceMenu";
import { useSession } from "next-auth/react";
import { stat } from "fs";
import UserMenu from "./UserMenu";
type Props = SignInProps & {
  linkItems: LinkItemProps[];
};
export default function Header({ linkItems, sign_in, sign_up, lang }: Props) {
  const { status, data: session } = useSession();
  const [top, setTop] = useState<boolean>(true);
  // detect whether user has scrolled the page down by 10px
  const scrollHandler = () => {
    window.scrollY > 10 ? setTop(false) : setTop(true);
  };
  useEffect(() => {
    AOS.init({
      once: true,
      disable: "phone",
      duration: 700,
      easing: "ease-out-cubic",
    });
  });
  useEffect(() => {
    scrollHandler();
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, [top]);

  return (
    <header
      className={`fixed w-full z-30 md:bg-opacity-90 transition duration-300 ease-in-out ${
        !top ? "bg-white backdrop-blur-sm shadow-lg" : ""
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Site branding */}
          <div className="shrink-0 mr-4">
            <Logo />
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex md:grow">
            {/* Desktop sign in links */}
            <MainMenu linkItems={linkItems} />
            <PreferenceMenu />

            {status === "unauthenticated" && (
              <SigninMenu sign_in={sign_in} sign_up={sign_up} lang={lang} />
            )}
            {status === "authenticated" && <UserMenu {...session.user} />}
          </nav>

          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
