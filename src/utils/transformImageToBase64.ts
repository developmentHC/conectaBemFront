/**
 * @deprecated Use multipart upload via usePhotoUpload hook instead.
 * This Base64 approach is being phased out in favor of more efficient multipart/FormData uploads.
 */
export const convertToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
      }
    };

    reader.onerror = (error) => {
      reject(error);
    };
  });
};
