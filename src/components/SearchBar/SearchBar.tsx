'use client'

import { useState, useEffect, useRef, KeyboardEvent } from 'react';
import { SearchMulti } from '@/app/actions/searchMulti';
import { Athiti } from "next/font/google";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { MdImageNotSupported } from 'react-icons/md';

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
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedTerm, setDebouncedTerm] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 1500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    if (debouncedTerm) {
      setIsLoading(true);
      setError(null);
      SearchMulti(debouncedTerm, 1, 'pt-BR')
        .then((data) => {
          // Filter out person results to exlude them from the search results
          const filteredResults = data.results
            .filter((result: SearchResult) => result.media_type !== 'person')
            .slice(0, 5);
          setResults(filteredResults);
          setShowResults(true);
        })
        .catch((error) => {
          console.error('Search failed:', error);
          setError('Falha ao buscar resultados');
          setResults([]);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setResults([]);
      setShowResults(false);
      setError(null);
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

  const handleKeyDown = (e: KeyboardEvent) => {
    if (!showResults) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < results.length ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > -1 ? prev - 1 : prev);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex === results.length) {
          router.push(`/search?q=${searchTerm}`);
        } else if (selectedIndex >= 0 && results[selectedIndex]) {
          const result = results[selectedIndex];
          router.push(getMediaLink(result));
        }
        break;
      case 'Escape':
        setShowResults(false);
        setSelectedIndex(-1);
        break;
    }
  };

  // Reset selected index when results change
  useEffect(() => {
    setSelectedIndex(-1);
  }, [results]);

  const getMediaLink = (result: SearchResult) => {
    const mediaType = result.media_type;
    return mediaType === 'movie' ? `/movie/${result.id}` : `/tv/${result.id}`;
  };

  const getTitle = (result: SearchResult) => {
    return result.title || result.name || 'Untitled';
  };

  const getImageUrl = (result: SearchResult) => {
    const path = result.poster_path;
    return path ? `https://image.tmdb.org/t/p/w92${path}` : null;
  };

  const getYear = (result: SearchResult) => {
    const date = result.release_date || result.first_air_date;
    return date ? new Date(date).getFullYear() : null;
  };

  return (
    <div className="relative" ref={searchContainerRef}>
      <div className="relative flex items-center">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setShowResults(true)}
          placeholder="Pesquisar"
          className={`${athiti.className} px-4 pr-10 py-1 rounded-full bg-slate-900/90 text-white focus:outline-none w-64`}
          aria-label="Search User"
          tabIndex={0}
          onKeyDown={handleKeyDown}
        />
        <div className="absolute right-2 w-6 h-6 flex items-center justify-center">
          <button
            className={`w-full h-full rounded-full ${
              isLoading ? 'text-purple-600' : 'bg-purple-600'
            } text-white hover:bg-purple transition-colors duration-300`}
            aria-label={isLoading ? "Loading" : "Search"}
            tabIndex={0}
            disabled={isLoading}
          >
            {isLoading ? (
              <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            ) : (
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
            )}
          </button>
        </div>
      </div>

      {showResults && (
        <div 
          className="absolute top-full left-0 mt-2 w-full bg-slate-900/95 rounded-lg shadow-lg overflow-hidden z-50"
          onMouseDown={(e) => e.preventDefault()}
        >
          {error ? (
            <div className="p-4 text-red-400 text-center">
              <span>{error}</span>
            </div>
          ) : results.length > 0 ? (
            <>
              {results.map((result, index) => (
                <button 
                  key={result.id}
                  onClick={() => router.push(getMediaLink(result))}
                  className={`w-full flex items-center p-2 text-left transition-colors duration-200 ${
                    index === selectedIndex ? 'bg-slate-800/80' : 'hover:bg-slate-800/80'
                  }`}
                  onMouseEnter={() => setSelectedIndex(index)}
                  onMouseLeave={() => setSelectedIndex(-1)}
                >
                  {getImageUrl(result) != null ? (
                    <Image
                      src={getImageUrl(result)!}
                      alt={getTitle(result)}
                      width={40}
                      height={56}
                      className="object-cover rounded mr-3"
                      unoptimized
                    />
                  ) : (
                    <div className="w-[40px] h-[56px] bg-transparent border border-yellow-400 rounded mr-3 flex items-center justify-center">
                      <MdImageNotSupported className="w-6 h-6 text-yellow-400" />
                    </div>
                  )}
                  <div className="flex flex-col">
                    <span className="text-white font-semibold">{getTitle(result)}</span>
                    {getYear(result) && (
                      <span className="text-gray-400 text-sm">{getYear(result)}</span>
                    )}
                  </div>
                </button>
              ))}
              <button
                onClick={() => router.push(`/search?q=${searchTerm}`)}
                className={`w-full text-center py-2 text-white hover:text-yellow-500 hover:bg-slate-800/80 transition-colors duration-200 border-t border-slate-800 ${
                  selectedIndex === results.length ? 'bg-slate-800/80' : ''
                }`}
                onMouseEnter={() => setSelectedIndex(results.length)}
                onMouseLeave={() => setSelectedIndex(-1)}
              >
                Ver mais resultados
              </button>
            </>
          ) : !isLoading && (
            <div className="p-4 text-gray-400 text-center">
              <span>Nenhum resultado encontrado</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}