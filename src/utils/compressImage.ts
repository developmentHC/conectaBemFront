import imageCompression from "browser-image-compression";

export const compressImage = async (file: File): Promise<File> => {
  const options = {
    maxSizeMB: 0.1,
    maxWidthOrHeight: 800,
    useWebWorker: true,
    fileType: "image/webp",
  };

  try {
    return await imageCompression(file, options);
  } catch {
    throw new Error("Falha ao comprimir imagem");
  }
};
