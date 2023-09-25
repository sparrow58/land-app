import { useState, useEffect, useCallback } from "react";
import api from "../helpers/api";

function useApiData<T>(apiEndpoint: string) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    console.log("fetch data");
    setIsLoading(true);
    setError(null);

    try {
      console.log("getting data" + apiEndpoint);
      const response = await api.get(apiEndpoint);
      setData(response.data);
    } catch (err: any) {
      console.log("getting error");
      setError(err.message || "An error occurred while fetching data.");
    } finally {
      setIsLoading(false);
    }
  }, [apiEndpoint]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, isLoading, error, refetch: fetchData };
}

export default useApiData;
