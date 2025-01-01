import { LangParams } from "@/app/Props/RoutingProps";
import Link from "next/link";
import SignInForm from "./SignInForm";
import OAuthForm from "./OAuthForm";
import { getDictionary } from "@/lib/dictionary";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

export async function generateMetadata({ params: { lang } }: LangParams) {
  const { authentication } = await getDictionary(lang);

  return {
    title: authentication.sign_in,
  };
}

export default async function SignIn({
  params: { lang },
}: Readonly<LangParams>) {
  const { authentication, or } = await getDictionary(lang);
  return (
    <div className="flex min-h-screen bg-background">
      {/* Left side - Illustration */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-primary/10 to-secondary/20 dark:from-primary/20 dark:to-secondary/30 overflow-hidden rounded-e-md">
        <div className="relative w-full h-full flex flex-col justify-between p-12">
          <div className="z-10">
            <h1 className="text-5xl font-bold mb-4 text-primary">
              Welcome back to Aqarat!
            </h1>
            <p className="text-muted-foreground text-xl">
              Sign in to continue your aqarat journey.
            </p>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Image
              src="/images/illustration.svg"
              alt="Decorative illustration"
              width={800}
              height={800}
              priority
              className="w-full h-auto max-w-[800px] object-contain opacity-50"
            />
          </div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-background/95 backdrop-blur-sm">
        <Card className="w-full max-w-md  shadow-none border-none outline-none bg-card/50">
          <CardHeader className="space-y-1">
            <div className="flex justify-center mb-8 rounded-md">
              <Image
                src="/images/logo.png"
                alt="Aqarat Logo"
                width={120}
                height={48}
                priority
              />
            </div>
            <CardTitle className="text-2xl font-bold text-center">
              {authentication.welcome_back}
            </CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SignInForm t={authentication} />

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  {or}
                </span>
              </div>
            </div>

            <OAuthForm t={authentication} />

            <p className="mt-8 text-center text-sm text-muted-foreground">
              {authentication.dont_have_account}{" "}
              <Link
                href={`/${lang}/signup`}
                className="font-medium text-primary hover:underline"
              >
                {authentication.sign_up}
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
