import imageCompression from "browser-image-compression";

export const compressImage = async (file: File): Promise<File> => {
  const options = {
    maxSizeMB: 0.005,
    maxWidthOrHeight: 1200,
    useWebWorker: true,
    fileType: "image/webp",
  };

  try {
    return await imageCompression(file, options);
  } catch (error) {
    console.error("Erro na compressão:", error);
    throw new Error("Falha ao comprimir imagem");
  }
};
