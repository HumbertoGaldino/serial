'use client'

import { useState, useEffect, useRef } from 'react';
import { SearchMulti } from '@/app/actions/searchMulti';
import { Athiti } from "next/font/google";
import Link from 'next/link';
import Image from 'next/image';

const athiti = Athiti({
  subsets: ["latin"],
  weight: ["400", "700"],
});

type SearchResult = {
  id: number;
  title?: string;
  name?: string;
  media_type: 'movie' | 'tv' | 'person';
  poster_path?: string;
  profile_path?: string;
  release_date?: string;
  first_air_date?: string;
};

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedTerm, setDebouncedTerm] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [showResults, setShowResults] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 1500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    if (debouncedTerm) {
      SearchMulti(debouncedTerm, 1, 'pt-BR')
        .then((data) => {
          setResults(data.results.slice(0, 5)); // Show only first 5 results
          setShowResults(true);
        })
        .catch((error) => {
          console.error('Search failed:', error);
          setResults([]);
        });
    } else {
      setResults([]);
      setShowResults(false);
    }
  }, [debouncedTerm]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getMediaLink = (result: SearchResult) => {
    const mediaType = result.media_type;
    return mediaType === 'movie' ? `/movie/${result.id}` : `/tv/${result.id}`;
  };

  const getTitle = (result: SearchResult) => {
    return result.title || result.name || 'Untitled';
  };

  const getImageUrl = (result: SearchResult) => {
    const path = result.poster_path || result.profile_path;
    return path ? `https://image.tmdb.org/t/p/w92${path}` : null;
  };

  const getYear = (result: SearchResult) => {
    const date = result.release_date || result.first_air_date;
    return date ? new Date(date).getFullYear() : null;
  };

  return (
    <div className="relative" ref={searchContainerRef}>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onFocus={() => setShowResults(true)}
        placeholder="Pesquisar"
        className={`${athiti.className} px-4 py-1 rounded-full bg-slate-900/90 text-white focus:outline-none w-64`}
        aria-label="Search User"
        tabIndex={0}
      />
      <button
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-purple-600 text-white rounded-full p-1 hover:bg-purple transition-colors duration-300"
        aria-label="Search"
        tabIndex={0}
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="white"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-4.35-4.35M16.5 10.5A6 6 0 1110.5 4.5a6 6 0 016 6z"
          />
        </svg>
      </button>

      {showResults && results.length > 0 && (
        <div 
          className="absolute top-full left-0 mt-2 w-full bg-slate-900/95 rounded-lg shadow-lg overflow-hidden z-50"
          onMouseDown={(e) => e.preventDefault()} // Prevent input blur when clicking results
        >
          {results.map((result) => (
            <Link 
              key={result.id} 
              href={getMediaLink(result)}
              className="flex items-center p-2 hover:bg-slate-800/80 transition-colors duration-200"
            >
              {getImageUrl(result) && (
                <Image
                  src={getImageUrl(result)!}
                  alt={getTitle(result)}
                  width={40}
                  height={56}
                  className="object-cover rounded mr-3"
                  unoptimized // Since we're using TMDB's optimized images
                />
              )}
              <div className="flex flex-col">
                <span className="text-white font-semibold">{getTitle(result)}</span>
                {getYear(result) && (
                  <span className="text-gray-400 text-sm">{getYear(result)}</span>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}