import { Dimensions } from "../Props/CommonProps";
import Compressor from "compressorjs";

export function compressImage(
  file: File | Blob,
  dimensions: Dimensions
): Promise<File | Blob> {
  const WIDTH = 800;
  const ratio = WIDTH / dimensions.width;
  return new Promise((resolve, reject) => {
    new Compressor(file, {
      quality: 0.6,
      maxWidth: WIDTH,
      maxHeight: dimensions.height * ratio,
      success(result) {
        resolve(result);
      },
      error(err) {
        console.error(err.message);
        reject(err);
      },
    });
  });
}
