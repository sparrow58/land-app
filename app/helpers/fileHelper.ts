export const readFileAsync = (file: File): Promise<string> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const url = event?.target?.result as string;
      resolve(url);
    };
    reader.readAsDataURL(file);
  });
};
