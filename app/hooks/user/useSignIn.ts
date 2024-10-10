import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function useSignIn(invalid_credentials: string) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/";
  const router = useRouter();
  async function signInCredentials(username: string, password: string) {
    setIsLoading(true);

    const signinResponse = await signIn("credentials", {
      redirect: false,
      username: username,
      password: password,
      callbackUrl,
    });

    console.log(signinResponse);
    setIsLoading(false);
    if (signinResponse?.ok) {
      router.replace(callbackUrl);
    }
    if (signinResponse?.error === "CredentialsSignin") {
      setError(invalid_credentials);
    }
  }

  return { signInCredentials, isLoading, error };
}
