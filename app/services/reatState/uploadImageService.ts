import api from "@/app/helpers/api";
import { AxiosProgressEvent } from "axios";
interface uploadImageProps {
  id: string;
  selectedFile: File | Blob;
  onUplading: ({
    name,
    progress,
  }: {
    progress: number | undefined;
    name: string;
  }) => void;
  onSuccess: ({ name, data }: { name: string; data: any }) => void;
  onFailure: ({ name, error }: { name: string; error: any }) => void;
}
const uploadImageService = async ({
  id,
  selectedFile,
  onUplading,
  onSuccess: onSuccess,
  onFailure,
}: uploadImageProps) => {
  if (!selectedFile) return;
  const formData = new FormData();
  formData.append("image", selectedFile, selectedFile.name);
  try {
    const response = await api.patchForm(
      `/realEstates/${id}/images`,
      formData,
      {
        onUploadProgress: (progressEvent: AxiosProgressEvent) => {
          const percentCompleted =
            progressEvent.total &&
            Math.round(progressEvent.loaded / progressEvent.total);

          onUplading({
            progress: percentCompleted,
            name: selectedFile.name,
          });
        },
      }
    );
    onSuccess({ name: selectedFile.name, data: response.data });
  } catch (error) {
    onFailure({ name: selectedFile.name, error: error });
  }
};

export default uploadImageService;
