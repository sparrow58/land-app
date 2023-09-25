import { ApiResponse, FileProps } from "../Props/CommonProps";
import useApiData from "./useApiData";

export default function useRealEstateImages(id: string) {
  const { data, isLoading, error, refetch } = useApiData<ApiResponse<string[]>>(
    `/realEstates/${id}/images`
  );

  const files: FileProps[] =
    data?.data?.map((image) => {
      const file: FileProps = {
        url: image,
        isDone: true,
        progress: 1,
        file: null,
      };
      return file;
    }) || [];

  return { data: files, isLoading, error, refetch };
}
