import { api } from "@/libs/api";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { compressImage } from "@/utils/compressImage";

interface PhotoUploadResponse {
    url: string;
}

export const usePhotoUpload = () => {
    return useMutation({
        mutationFn: async (file: File): Promise<string> => {
            try {
                // Compress image before upload
                const compressedFile = await compressImage(file);

                // Create FormData
                const formData = new FormData();
                formData.append("photo", compressedFile);

                // Upload to backend
                const response = await api.post<PhotoUploadResponse>(
                    "/auth/uploadPhoto",
                    formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );

                return response.data.url;
            } catch (error) {
                console.error("Error uploading photo:", error);
                throw new Error("Falha ao fazer upload da foto");
            }
        },
        onSuccess: () => {
            toast.success("Foto carregada com sucesso!");
        },
        onError: (error: Error) => {
            toast.error(error.message || "Erro ao carregar imagem");
        },
    });
};
