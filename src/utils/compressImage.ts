import imageCompression from "browser-image-compression";

export const compressImage = async (file: File): Promise<File> => {
  const options = {
    maxSizeMB: 0.1, // 100KB - reduzido para evitar erro 413
    maxWidthOrHeight: 800, // Reduzido para garantir compressão adequada
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
