"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Icons } from "@/app/components/icons";

interface Props {
  t: {
    continue_with_google: string;
    continue_with_facebook: string;
  };
}

export default function OAuthForm({ t }: Props) {
  return (
    <div className="grid gap-4">
      <Button
        variant="outline"
        onClick={() => signIn("google")}
        className="w-full"
      >
        <Icons.google className="mr-2 h-4 w-4" />
        {t.continue_with_google}
      </Button>
      <Button
        variant="outline"
        onClick={() => signIn("facebook")}
        className="w-full"
      >
        <Icons.facebook className="mr-2 h-4 w-4" />
        {t.continue_with_facebook}
      </Button>
    </div>
  );
}
