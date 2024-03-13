export const convertToBase64 = async (file: File) => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
      } else {
        reject("Failed to convert file to base64");
      }
    };
    reader.onerror = () => {
      reject("Failed to convert file to base64");
    };
    reader.readAsDataURL(file);
  });
};
