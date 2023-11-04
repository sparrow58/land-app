// or Dynamic metadata
export async function generateMetadata({ params: { lang } }: LangParams) {
  const { authentication } = await getDictionary(lang);

  return {
    title: authentication.sign_in,
  };
}
import Link from "next/link";
import SignInForm from "./SignInForm";
import OAuthForm from "./OAuthForm";
import { LangParams } from "@/app/Props/RoutingProps";
import { getDictionary } from "@/lib/dictionary";

export default async function SignIn({ params: { lang } }: LangParams) {
  const { authentication, or } = await getDictionary(lang);
  return (
    <section className="bg-gradient-to-b from-gray-100 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">
          {/* Page header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <span className="h2">{authentication.welcome_back}</span>
          </div>

          {/* Form */}
          <div className="max-w-sm mx-auto">
            <SignInForm t={authentication} />
            <div className="flex items-center my-6">
              <div
                className="border-t border-gray-300 grow mr-3"
                aria-hidden="true"
              ></div>
              <div className="text-gray-600 italic">{or}</div>
              <div
                className="border-t border-gray-300 grow ml-3"
                aria-hidden="true"
              ></div>
            </div>
            <OAuthForm t={authentication} />
            <div className="text-gray-600 text-center mt-6">
              {authentication.dont_have_account}
              <Link
                href="/signup"
                className="text-blue-600 hover:underline transition duration-1000 ease-in-out"
              >
                {authentication.sign_up}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
