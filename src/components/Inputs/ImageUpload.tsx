import React, { useState, useRef } from "react";
import Image from "next/image";
import { FaUser } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import toast from "react-hot-toast";

interface ImageUploadProps {
    value?: string | null;
    onChange: (file: File | null, previewUrl: string | null) => void;
    maxSizeMB?: number;
    acceptedFormats?: string[];
    className?: string;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
    value,
    onChange,
    maxSizeMB = 5,
    acceptedFormats = ["image/jpeg", "image/png"],
    className = "",
}) => {
    const [preview, setPreview] = useState<string | null>(value || null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (!file) return;

        // Validate type
        if (!acceptedFormats.includes(file.type)) {
            toast.error(`Formato inválido. Aceitos: ${acceptedFormats.join(", ")}`);
            return;
        }

        // Validate size
        if (file.size > maxSizeMB * 1024 * 1024) {
            toast.error(`Arquivo muito grande. Máximo: ${maxSizeMB} MB`);
            return;
        }

        // Create preview
        const objectUrl = URL.createObjectURL(file);
        setPreview(objectUrl);
        onChange(file, objectUrl);
    };

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className={`flex flex-col items-center gap-4 ${className}`}>
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept={acceptedFormats.join(",")}
                className="hidden"
            />

            <div
                onClick={handleClick}
                className="bg-blue-600 h-[120px] w-[120px] rounded-full items-center justify-center flex flex-col relative cursor-pointer"
            >
                {preview ? (
                    <Image
                        src={preview}
                        className="w-full h-full rounded-full object-cover"
                        width={120}
                        height={120}
                        alt="profile"
                    />
                ) : (
                    <FaUser className="text-[#D7FF7B] text-6xl" />
                )}

                <div className="bg-white h-[35px] w-[35px] flex items-center justify-center rounded-full ml-24 mt-16 absolute shadow-lg cursor-pointer">
                    <MdEdit className="text-blue-600 text-3xl" />
                </div>
            </div>
        </div>
    );
};
