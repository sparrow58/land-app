"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import AOS from "aos";

import SigninMenu, { SignInProps } from "./SigninMenu";
import MainMenu from "./MainMenu";
import { LinkItemProps } from "@/app/Props/RoutingProps";
import PreferenceMenu from "./PreferenceMenu";
import UserMenu from "./UserMenu";
import Logo from "./logo";
import MobileMenu from "./mobile-menu";
import { ModeToggle } from "@/components/mode-toggle";

type Props = SignInProps & {
  linkItems: LinkItemProps[];
  t: { theme: any };
};

export default function Header({
  linkItems,
  sign_in,
  sign_up,
  t,
  lang,
}: Props) {
  const { status, data: session } = useSession();
  const [top, setTop] = useState<boolean>(true);

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
    scrollHandler();
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, []);

  return (
    <header
      className={`fixed w-full z-30 transition duration-300 ease-in-out ${
        !top ? "bg-background/80 backdrop-blur-sm shadow-lg" : ""
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="shrink-0 mr-4">
            <Logo />
          </div>

          <nav className="hidden md:flex md:grow items-center space-x-4">
            <MainMenu linkItems={linkItems} />
            <div className="flex items-center space-x-4">
              <PreferenceMenu />
              <ModeToggle />
              {status === "unauthenticated" && (
                <SigninMenu sign_in={sign_in} sign_up={sign_up} lang={lang} />
              )}
              {status === "authenticated" && session?.user && (
                <UserMenu {...session.user} />
              )}
            </div>
          </nav>

          <MobileMenu
            linkItems={linkItems}
            sign_in={sign_in}
            sign_up={sign_up}
            lang={lang}
          />
        </div>
      </div>
    </header>
  );
}
