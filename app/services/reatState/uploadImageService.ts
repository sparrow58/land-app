import api from "@/app/helpers/api";
import { AxiosProgressEvent } from "axios";
interface UploadImageProps {
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
  onSuccess,
  onFailure,
}: UploadImageProps) => {
  if (!selectedFile) return;
  const formData = new FormData();
  const fileName = (selectedFile as File).name;
  formData.append("image", selectedFile, fileName);
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
            name: fileName,
          });
        },
      }
    );
    onSuccess({ name: fileName, data: response.data });
  } catch (error) {
    onFailure({ name: fileName, error: error });
  }
};

export default uploadImageService;
