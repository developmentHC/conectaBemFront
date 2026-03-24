import { useState } from "react";
import { usePhotoUpload } from "./usePhotoUpload";

type UseProfilePhotoUploadProps = {
    onUpload: (url: string) => void;
    onClear: () => void;
};

export const useProfilePhotoUpload = ({ onUpload, onClear }: UseProfilePhotoUploadProps) => {
    const [isUploading, setIsUploading] = useState(false);
    const { mutate: uploadPhoto } = usePhotoUpload();

    const onChangeImage = (file: File | null) => {
        if (!file) {
            onClear();
            return;
        }

        setIsUploading(true);
        uploadPhoto(file, {
            onSuccess: (photoUrl) => {
                onUpload(photoUrl);
            },
            onSettled: () => {
                setIsUploading(false);
            },
        });
    };

    return { isUploading, onChangeImage };
};
