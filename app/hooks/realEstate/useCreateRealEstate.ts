import { useState } from "react";
import { RealEstateFormData } from "@/app/dataObjects/RealEstateFormData";
import api from "@/app/helpers/api";
import { ApiEvents } from "@/app/Props/CommonProps";
import { CreateResult } from "@/app/dataObjects/Generics";

const useCreateRealEstate = ({
  onSuccess,
  onFailure,
}: ApiEvents): CreateResult<RealEstateFormData> & {
  update: (data: RealEstateFormData) => void;
} => {
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
        if (onSuccess) onSuccess(response.data);
      })
      .catch(function (err) {
        setError(err);
        if (onFailure) onFailure(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const update = (data: RealEstateFormData) => {
    setIsLoading(true);
    setError(null);
    setResponseData(null);

    api
      .put(`/realEstates/${data.id}`, data)
      .then(function (response) {
        // Assuming response.data contains the response data
        setResponseData(response.data);
        if (onSuccess) onSuccess(response.data);
      })
      .catch(function (err) {
        setError(err);
        if (onFailure) onFailure(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return { create, update, isLoading, error, responseData };
};

export default useCreateRealEstate;
