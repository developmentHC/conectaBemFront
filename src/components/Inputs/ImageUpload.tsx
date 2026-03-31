import Image from "next/image";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { FaUser } from "react-icons/fa";
import { MdEdit } from "react-icons/md";

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
  const previewUrlRef = useRef<string | null>(null);

  useEffect(() => {
    if (!value && previewUrlRef.current) {
      URL.revokeObjectURL(previewUrlRef.current);
      previewUrlRef.current = null;
      setPreview(null);
    } else if (value && !value.startsWith("blob:")) {
      if (previewUrlRef.current) {
        URL.revokeObjectURL(previewUrlRef.current);
        previewUrlRef.current = null;
      }
      setPreview(value);
    }
  }, [value]);

  useEffect(() => {
    return () => {
      if (previewUrlRef.current) {
        URL.revokeObjectURL(previewUrlRef.current);
      }
    };
  }, []);

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

    // Revoke previous preview URL before creating a new one
    if (previewUrlRef.current) {
      URL.revokeObjectURL(previewUrlRef.current);
    }

    // Create preview
    const objectUrl = URL.createObjectURL(file);
    previewUrlRef.current = objectUrl;
    setPreview(objectUrl);
    onChange(file, objectUrl);

    // Reset input so the same file can be selected again
    e.target.value = "";
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
        onKeyDown={(e) => e.key === 'Enter' || e.key === ' ' ? handleClick() : undefined}
        role="button"
        tabIndex={0}
        aria-label="Editar foto de perfil"
        className="relative flex h-[120px] w-[120px] cursor-pointer flex-col items-center justify-center rounded-full bg-blue-600"
      >
        {preview ? (
          <Image
            src={preview}
            className="h-full w-full rounded-full object-cover"
            width={120}
            height={120}
            alt="profile"
          />
        ) : (
          <FaUser className="text-6xl text-[#D7FF7B]" />
        )}

        <div
          role="presentation"
          className="absolute mt-16 ml-24 flex h-[35px] w-[35px] cursor-pointer items-center justify-center rounded-full bg-white shadow-lg"
        >
          <MdEdit className="text-3xl text-blue-600" />
        </div>
      </div>
    </div>
  );
};
