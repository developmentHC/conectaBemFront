import imageCompression from "browser-image-compression";

export const compressImage = async (file: File): Promise<File> => {
  const options = {
    maxSizeMB: 0.5, // ~500KB, dentro do limite de 3MB do backend
    maxWidthOrHeight: 1200, // equilíbrio entre qualidade e tamanho
    useWebWorker: true,
    // Preserve original type (JPEG/PNG/etc) para passar no fileFilter do backend
  };

  try {
    return await imageCompression(file, options);
  } catch (error) {
    console.error("Erro na compressão:", error);
    throw new Error("Falha ao comprimir imagem");
  }
};
