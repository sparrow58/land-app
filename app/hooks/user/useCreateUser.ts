import { ApiEvents } from "@/app/Props/CommonProps";
import api from "@/app/helpers/api";
import { UserFormData } from "@/app/dataObjects/UserFormData";
import { CreateResult } from "@/app/dataObjects/Generics";
import { useState } from "react";
import { AxiosError } from "axios";
import useSignIn from "./useSignIn";
import { useCurrentLanguage } from "../ui/languageHooks";

export default function useCreateUser({
  onSuccess,
  onFailure,
}: ApiEvents): CreateResult<UserFormData> {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [responseData, setResponseData] = useState<any>(null);
  const language = useCurrentLanguage();
  const { signInCredentials, isLoading: isSigningIn } =
    useSignIn("error password");
  const create = (data: UserFormData) => {
    if (language) data = { ...data, language };
    setIsLoading(true);
    setError(null);
    setResponseData(null);

    api
      .post("/users", data)
      .then(function (response) {
        // Assuming response.data contains the response data
        setResponseData(response.data);
        signInCredentials(data.email!, data.password);
        if (onSuccess) onSuccess(response.data);
      })
      .catch(function (err: AxiosError) {
        setError(err.response?.data);
        if (onFailure) onFailure(err.response?.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return { create, isLoading: isLoading || isSigningIn, error, responseData };
}
