"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
interface Props {
  continue_with_google: string;
  continue_with_facebook: string;
}
const OAuthForm = ({ continue_with_google }: Props) => {
  return (
    <form>
      <div className="flex flex-wrap -mx-3">
        <div className="w-full px-3">
          <button
            type="button"
            onClick={() => signIn("google")}
            className="btn px-0 text-white bg-red-600 hover:bg-red-700 w-full relative flex items-center"
          >
            <svg
              className="absolute w-4 h-4 fill-current text-white opacity-75 shrink-0 mx-4 left-0"
              viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M7.9 7v2.4H12c-.2 1-1.2 3-4 3-2.4 0-4.3-2-4.3-4.4 0-2.4 2-4.4 4.3-4.4 1.4 0 2.3.6 2.8 1.1l1.9-1.8C11.5 1.7 9.9 1 8 1 4.1 1 1 4.1 1 8s3.1 7 7 7c4 0 6.7-2.8 6.7-6.8 0-.5 0-.8-.1-1.2H7.9z" />
            </svg>
            <span className="flex-auto">{continue_with_google}</span>
          </button>
        </div>
      </div>
    </form>
  );
};

export default OAuthForm;
