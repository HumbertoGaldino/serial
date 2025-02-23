"use client";

import { useState, useRef } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { BsCameraFill } from "react-icons/bs";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

interface ImageUploaderProps {
  handleImageUpload: (imageUrl: string) => void;
  isLoading?: boolean;
}

type CloudinarySecureURL = {
  info: {
    secure_url: string;
  };
}

export default function ImageUploader({ handleImageUpload, isLoading }: ImageUploaderProps) {
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
        theme: "purple",
        styles: {
          palette: {
            window: "#0f172a",
            windowBorder: "#6b41b6",
            tabIcon: "#6b41b6",
            menuIcons: "#6b41b6",
            textDark: "#FFFFFF",
            textLight: "#fcfcfc",
            link: "#6b41b6",
            action: "#6b41b6",
            inactiveTabIcon: "#8E8E8E",
            error: "#F44235",
            inProgress: "#6b41b6",
            complete: "#20B832",
            sourceBg: "#0f172a"
          },
          frame: {
            background: "#0f172a"
          },
          fonts: {
            default: null,
            "'Space Grotesk', sans-serif": {
              url: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap",
              active: true
            }
          }
        },
      }}
      onSuccess={(result) => {
        if (result.info && typeof result.info === "object" && "secure_url" in result.info) {
          const url = result.info.secure_url as string;
          handleImageUpload(url);
          setError(null);
        }
      }}
      onError={(error) => {
        setError("Image upload failed. Please try again.");
      }}
    >
      {({ open }) => (
        <button
          ref={buttonRef}
          onClick={() => open()}
          disabled={isLoading}
          className="absolute bottom-3 right-3 bg-[#6b41b6] p-2.5 rounded-full text-white hover:bg-[#553291] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-110 active:scale-95"
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
