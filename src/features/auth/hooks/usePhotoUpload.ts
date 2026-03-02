import { api } from "@/libs/api";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { compressImage } from "@/utils/compressImage";
import { useUserStore } from "@/stores/userSessionStore";

interface PhotoUploadResponse {
    url: string;
}

export const usePhotoUpload = () => {
    const { idUser } = useUserStore();
    return useMutation({
        mutationFn: async (file: File): Promise<string> => {
            try {
                // Compress image before upload
                const compressed = await compressImage(file);
                const compressedFile = compressed instanceof File
                    ? compressed
                    : new File([compressed], file.name, { type: (compressed as Blob).type || file.type });

                // Create FormData
                const formData = new FormData();
                // Backend expects field name: profilePhoto
                formData.append("profilePhoto", compressedFile, compressedFile.name);
                if (!idUser) {
                    throw new Error("Usuário não identificado (userId ausente)");
                }
                formData.append("userId", idUser);

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
