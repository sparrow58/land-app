import { useState } from "react";
import { RealEstateFormData } from "@/app/dataObjects/RealEstateFormData";
import api from "@/app/helpers/api";
import { ApiEvents } from "@/app/Props/CommonProps";

interface UseCreateRealEstateResult {
  create: (data: RealEstateFormData | {}) => void;
  isLoading: boolean;
  error: any;
  responseData: any;
}

const useCreateRealEstate = ({
  onSuccess,
  onFailure,
}: ApiEvents): UseCreateRealEstateResult => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [responseData, setResponseData] = useState<any>(null);

  const create = (data: RealEstateFormData | {}) => {
    setIsLoading(true);
    setError(null);
    setResponseData(null);

    api
      .post("/realEstates", data)
      .then(function (response) {
        // Assuming response.data contains the response data
        setResponseData(response.data);
        onSuccess(response.data);
      })
      .catch(function (err) {
        setError(err);
        onFailure(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return { create, isLoading, error, responseData };
};

export default useCreateRealEstate;
