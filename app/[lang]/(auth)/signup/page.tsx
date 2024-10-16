import { LangParams } from "@/app/Props/RoutingProps";

import Link from "next/link";
import SignUpForm from "./SignUpForm";
import OAuthForm from "../signin/OAuthForm";
import { getDictionary } from "@/lib/dictionary";
export async function generateMetadata({ params: { lang } }: LangParams) {
  const { authentication } = await getDictionary(lang);

  return {
    title: authentication.sign_up,
  };
}
export default async function SignUp({
  params: { lang },
}: Readonly<LangParams>) {
  const { authentication, errors, or } = await getDictionary(lang);
  return (
    <section className="bg-gradient-to-">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">
          {/* Page header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <h1 className="h1">{authentication.create_account}</h1>
          </div>

          {/* Form */}
          <div className="max-w-sm mx-auto">
            <SignUpForm t={{ ...authentication, errors: { ...errors } }} />
            <div className="flex items-center my-6">
              <div className="border-t grow mr-3" aria-hidden="true"></div>
              <div className=" italic">{or}</div>
              <div className="border-t  grow ml-3" aria-hidden="true"></div>
            </div>
            <OAuthForm t={authentication} />
            <div className=" text-center mt-6">
              {authentication.already_have_account}
              <Link
                href="/signin"
                className="text-blue-600 hover:underline transition duration-150 ease-in-out"
              >
                {authentication.sign_in}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
