import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { api } from "@/libs/api";
import { compressImage } from "@/utils/compressImage";

interface PhotoUploadResponse {
  url: string;
}

export const usePhotoUpload = () => {
  return useMutation({
    mutationFn: async (file: File): Promise<string> => {
      const compressedFile = await compressImage(file);

      const formData = new FormData();
      formData.append("photo", compressedFile);

      const response = await api.post<PhotoUploadResponse>("/auth/uploadPhoto", formData);

      return response.data.url;
    },
    onSuccess: () => {
      toast.success("Foto carregada com sucesso!");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Erro ao carregar imagem");
    },
  });
};
