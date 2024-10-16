"use client";

import { Locale } from "@/i18n.config";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export interface SignInProps {
  sign_in: string;
  sign_up: string;
  lang: Locale;
}

const SigninMenu = ({ sign_in, sign_up, lang }: SignInProps) => {
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const callbackUrl = searchParams.get("callbackUrl");
  let callbackUrlArgs = "";

  if (callbackUrl) {
    callbackUrlArgs = `/?callbackUrl=${callbackUrl}`;
  } else if (!pathName.endsWith("/signin") && !pathName.endsWith("/signup")) {
    callbackUrlArgs = `/?callbackUrl=${pathName}`;
  }

  return (
    <div className="flex justify-end items-center gap-4">
      <Button variant="ghost" asChild>
        <Link href={`/${lang}/signin${callbackUrlArgs}`}>{sign_in}</Link>
      </Button>
      <Button asChild>
        <Link href={`/${lang}/signup${callbackUrlArgs}`}>
          <span>{sign_up}</span>
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </Button>
    </div>
  );
};

export default SigninMenu;
