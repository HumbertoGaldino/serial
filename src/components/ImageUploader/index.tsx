"use client";

import { useState, useRef } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { BsCameraFill } from "react-icons/bs";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

interface ImageUploaderProps {
  onImageSelected: (imageUrl: string) => void;
  isLoading?: boolean;
}

export default function ImageUploader({ onImageSelected, isLoading }: ImageUploaderProps) {
  const [error, setError] = useState<string | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <CldUploadWidget
      uploadPreset="serial_profile"
      options={{
        maxFiles: 1,
        resourceType: "image",
        clientAllowedFormats: ["image"],
        maxFileSize: 10000000, // 10MB
        croppingAspectRatio: 1,
        croppingShowDimensions: true,
        croppingValidateDimensions: true,
        cropping: true,
        showSkipCropButton: false,
        folder: "profiles",
      }}
      onSuccess={(result) => {
        if (result.info && typeof result.info === "object" && "secure_url" in result.info) {
          const url = result.info.secure_url as string;
          onImageSelected(url);
          setError(null);
        }
      }}
      onError={(error) => {
        console.error("Upload error:", error);
        setError("Failed to upload image. Please try again.");
      }}
    >
      {({ open }) => (
        <button
          ref={buttonRef}
          onClick={() => open()}
          disabled={isLoading}
          className="absolute bottom-0 right-0 bg-[#6b41b6] p-2 rounded-full text-white hover:bg-[#553291] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          title="Upload profile picture"
        >
          {isLoading ? (
            <LoadingSpinner size="tiny" />
          ) : (
            <BsCameraFill className="w-4 h-4" />
          )}
          {error && (
            <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-red-500 text-xs whitespace-nowrap">
              {error}
            </span>
          )}
        </button>
      )}
    </CldUploadWidget>
  );
}
