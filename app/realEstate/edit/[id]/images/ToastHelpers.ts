import { toast } from "react-toastify";
import { MutableRefObject } from "react";
import { FileProps } from "@/app/Props/CommonProps";

export const showToast = (
  file: FileProps,
  toastIds: MutableRefObject<string[]>
) => {
  const toastId = toast.success(`Uploading ${file.file?.name} in Progress`, {
    progress: file.progress,
    toastId: file.file?.name,
    icon: false,
  });
  toastIds.current.push(toastId.toString());
};
export const updateToast = (
  file: FileProps,
  toastIds: MutableRefObject<string[]>
) => {
  const toastId = toastIds.current.find((id) => id === file.file?.name);

  if (toastId) {
    toast.update(toastId, { progress: file.progress });
  } else showToast(file, toastIds);
};
