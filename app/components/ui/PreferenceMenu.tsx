"use client";

import { useToggleLanguage } from "@/app/hooks/ui/languageHooks";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const PreferenceMenu = () => {
  const { newPath, currentLanguage } = useToggleLanguage();

  return (
    <Button variant="ghost" asChild>
      <Link href={newPath!}>
        {currentLanguage === "ar" ? "English" : "عربي"}
      </Link>
    </Button>
  );
};

export default PreferenceMenu;
