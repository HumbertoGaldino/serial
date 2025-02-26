"use client";

import { Marvel } from "next/font/google";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { TbDeviceTvOldFilled } from "react-icons/tb";
import { MdLocalMovies } from "react-icons/md";
import { BiTime } from "react-icons/bi";
import { BsFillCalendarDateFill } from "react-icons/bs";
import { useState, useEffect } from "react";
import MediaCard from "./MediaCard";
import ImageUploader from "../ImageUploader";
import { updateProfileImage } from "@/app/actions/updateProfileImage";
import FavoriteMoviesCards from "../FavoriteMoviesCards";

const marvel = Marvel({
  subsets: ["latin"],
  weight: ["400"],
});

interface ProfileData {
  id: number;
  email: string;
  name: string;
  lastname: string;
  username: string;
  imgProfile: string | null;
  imgBackground: string | null;
  createdAt: string;
  updatedAt: string;
  movies: {
    id: number;
    title: string;
    poster_path: string;
    release_date: string;
  }[];
  castTvShow: {
    id: number;
    name: string;
    poster_path: string;
    first_air_date: string;
  }[];
  genres: string[];
  episodesCount: number;
  totalRunTime: number;
}

interface ProfileContentProps {
  profileData: ProfileData;
}

const formatTime = (totalSeconds: number) => {
  const months = Math.floor(totalSeconds / (60 * 60 * 24 * 30));
  const days = Math.floor((totalSeconds / (60 * 60 * 24)) % 30);
  const hours = Math.floor((totalSeconds / (60 * 60)) % 24);
  const minutes = Math.floor((totalSeconds / 60) % 60);

  return { months, days, hours, minutes };
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("pt-BR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export default function ProfileContent({ profileData: initialProfileData }: ProfileContentProps) {
  const [profileData, setProfileData] = useState<ProfileData>(initialProfileData);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setProfileData(initialProfileData);
  }, [initialProfileData]);

  const handleImageUpload = async (imageUrl: string) => {
    try {
      setIsUploading(true);
      setError(null);
      
      // Then update server in background
      const updatedProfile = await updateProfileImage(imageUrl);
      
      // Only update the imgProfile field if the server request was successful
      if (updatedProfile && typeof updatedProfile === 'object') {
        setProfileData(prev => ({
          ...prev,
          imgProfile: updatedProfile.imgProfile || imageUrl
        }));
      } else {
        throw new Error('Invalid server response');
      }
    } catch (err) {
      console.error("Failed to update profile image:", err);
      setError("Failed to update profile image. Please try again.");
      
      // No need to revert the entire profile data, just the image
      setProfileData(prev => ({
        ...prev,
        imgProfile: initialProfileData.imgProfile
      }));
    } finally {
      setIsUploading(false);
    }
  };

  const t = useTranslations("Profile");

  if (!profileData) return null;

  return (
    <main className="flex flex-col w-full min-h-[90vh] bg-slate-950">
      {/* Background Image */}
      <div className="relative w-full h-[300px] bg-slate-900">
        {profileData.imgBackground ? (
          <Image
            src={profileData.imgBackground}
            alt="Background"
            fill
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 to-slate-800" />
        )}
      </div>

      {/* Profile Section */}
      <div className="flex flex-row relative px-8 py-6">
        {/* Profile Image Container */}
        <div className="group relative -top-20 left-8 w-40 h-40">
          <div className="relative w-full h-full rounded-full border-4 border-[#6b41b6] overflow-hidden bg-slate-800 transition-all duration-300 group-hover:border-opacity-75">
            {profileData.imgProfile ? (
              <Image
                src={`${profileData.imgProfile}?w_400,h_400,c_fill,g_face,f_auto,q_auto`}
                alt={profileData.name || "Profile"}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 160px, 160px"
                priority
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-4xl text-slate-600">
                {profileData?.name?.charAt(0)?.toUpperCase() || "U"}
              </div>
            )}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-300" />
            <div className="absolute bottom-2 right-2 z-20">
              <ImageUploader handleImageUpload={handleImageUpload} isLoading={isUploading} />
            </div>
          </div>
        </div>

        {error && (
          <div className="absolute -bottom-8 left-0 right-0 text-center">
            <p className="text-red-500 text-sm">{error}</p>
          </div>
        )}

        {/* Profile Info */}
        <div className="relative top-[-20] left-16">
          <h1 className={`${marvel.className} text-4xl text-white mb-2`}>
            {profileData.name} {profileData.lastname}
          </h1>
          <p className="text-gray-400 mb-1">@{profileData.username}</p>
          <div className="flex items-center text-gray-400 mb-4">
            <BsFillCalendarDateFill className="mr-2" />
            {t("joined")} {formatDate(profileData.createdAt)}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-8 py-6">
        {/* Movies */}
        <div className="bg-slate-900 rounded-lg p-6 flex items-center shadow-lg">
          <div className="bg-[#6b41b6] p-4 rounded-full mr-4">
            <MdLocalMovies className="text-2xl text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white">
              {profileData.movies?.length || 0}
            </h2>
            <p className="text-gray-400 text-sm uppercase tracking-wider">
              {t("movies")}
            </p>
          </div>
        </div>

        {/* TV Shows */}
        <div className="bg-slate-900 rounded-lg p-6 flex items-center shadow-lg">
          <div className="bg-[#6b41b6] p-4 rounded-full mr-4">
            <TbDeviceTvOldFilled className="text-2xl text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white">
              {profileData.episodesCount || 0}
            </h2>
            <p className="text-gray-400 text-sm uppercase tracking-wider">
              {t("episodes")}
            </p>
          </div>
        </div>

        {/* Watch Time */}
        <div className="bg-slate-900 rounded-lg p-6 flex items-center shadow-lg">
          <div className="bg-[#6b41b6] p-4 rounded-full mr-4">
            <BiTime className="text-2xl text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white">
              {formatTime(profileData.totalRunTime || 0).hours}h{" "}
              {formatTime(profileData.totalRunTime || 0).minutes}m
            </h2>
            <p className="text-gray-400 text-sm uppercase tracking-wider">
              {t("watchTime")}
            </p>
          </div>
        </div>
      </div>

      {/* Genres */}
      {profileData.genres?.length > 0 && (
        <div className="px-8 py-6">
          <h2 className={`${marvel.className} text-2xl text-white mb-4`}>
            {t("favoriteGenres")}
          </h2>
          <div className="flex flex-wrap gap-2">
            {profileData.genres.map((genre) => (
              <span
                key={genre}
                className="bg-[#6b41b6] text-white px-4 py-2 rounded-full text-sm"
              >
                {genre}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Favorites Section */}
      <div className="w-full px-8 py-6">
        <div className="w-full flex flex-wrap gap-6">
          {/* Favorite Movies */}
          {profileData.movies?.length > 0 && (
            <div className="w-full bg-slate-900 rounded-lg p-6 shadow-lg">
              <h2 className={`${marvel.className} text-2xl text-white mb-4`}>
                {t("favoriteMovies")}
              </h2>
              <div className="flex flex-row rounded-2xl bg-slate-800 p-4">
                <FavoriteMoviesCards movies={profileData.movies} />
              </div>
            </div>
          )}

          {/* Favorite TV Shows */}
          {profileData.castTvShow?.length > 0 && (
            <div className="w-full bg-slate-900 rounded-lg p-6 shadow-lg">
              <h2 className={`${marvel.className} text-2xl text-white mb-4`}>
                {t("favoriteTVShows")}
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {profileData.castTvShow.map((show) => (
                  <MediaCard
                    key={show.id}
                    type="tv"
                    id={show.id}
                    title={show.name}
                    poster_path={show.poster_path}
                    date={show.first_air_date}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
