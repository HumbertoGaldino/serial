'use client';

import { useEffect, useState, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { SearchMulti } from '@/app/actions/searchMulti';
import Image from 'next/image';
import { Athiti, Marvel } from "next/font/google";

const athiti = Athiti({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const marvel = Marvel({
  subsets: ["latin"],
  weight: ["400"],
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
  overview?: string;
};

export default function SearchPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const pageParam = searchParams.get('page') || '1';
  const currentPage = parseInt(pageParam, 10);

  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [showShortcuts, setShowShortcuts] = useState(false);

  const handleBack = useCallback(() => {
    try {
      // Check if we can go back in history
      if (window.history.state !== null && window.history.length > 2) {
        router.back();
      } else {
        // If no history, go to homepage
        router.push('/');
      }
    } catch {
      // Fallback to homepage if any error occurs with history
      router.push('/');
    }
  }, [router]);

  const handleKeyNavigation = useCallback((e: globalThis.KeyboardEvent) => {
    if (e.key === '?') {
      e.preventDefault();
      setShowShortcuts(prev => !prev);
      return;
    }

    if (e.key === 'Backspace' && e.altKey) {
      e.preventDefault();
      handleBack();
      return;
    }

    if (!totalPages || totalPages === 1) return;

    switch (e.key) {
      case 'ArrowLeft':
        if (currentPage > 1) {
          e.preventDefault();
          router.push(`/search?q=${query}&page=${currentPage - 1}`, { scroll: false });
        }
        break;
      case 'ArrowRight':
        if (currentPage < totalPages) {
          e.preventDefault();
          router.push(`/search?q=${query}&page=${currentPage + 1}`, { scroll: false });
        }
        break;
      case 'Home':
        if (currentPage !== 1) {
          e.preventDefault();
          router.push(`/search?q=${query}&page=1`, { scroll: false });
        }
        break;
      case 'End':
        if (currentPage !== totalPages) {
          e.preventDefault();
          router.push(`/search?q=${query}&page=${totalPages}`, { scroll: false });
        }
        break;
    }
  }, [query, currentPage, totalPages, router, handleBack]);

  const handleShortcutsKeyPress = useCallback((e: globalThis.KeyboardEvent) => {
    if (e.key === 'Escape' && showShortcuts) {
      setShowShortcuts(false);
    }
  }, [showShortcuts]);

  // Add keyboard event listener
  useEffect(() => {
    const keyNavHandler = (e: globalThis.KeyboardEvent) => handleKeyNavigation(e);
    const shortcutsHandler = (e: globalThis.KeyboardEvent) => handleShortcutsKeyPress(e);

    document.addEventListener('keydown', keyNavHandler);
    document.addEventListener('keydown', shortcutsHandler);
    
    return () => {
      document.removeEventListener('keydown', keyNavHandler);
      document.removeEventListener('keydown', shortcutsHandler);
    };
  }, [handleKeyNavigation, handleShortcutsKeyPress]);

  // Update document title and metadata
  useEffect(() => {
    // Update just the document title since we're in a client component
    document.title = query 
      ? `${totalResults} resultados para "${query}" - Página ${currentPage} - Serial`
      : 'Busca - Serial';
  }, [query, totalResults, currentPage]);

  useEffect(() => {
    if (query) {
      setIsLoading(true);
      setError(null);
      SearchMulti(query, currentPage, 'pt-BR')
        .then((data) => {
          const filteredResults = data.results.filter(
            (result: SearchResult) => result.media_type !== 'person'
          );
          setResults(filteredResults);
          setTotalPages(data.total_pages);
          setTotalResults(data.total_results);
        })
        .catch((error) => {
          console.error('Search failed:', error);
          setError('Falha ao buscar resultados');
          setResults([]);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [query, currentPage]);

  const validatePageNumber = useCallback((page: number) => {
    if (page < 1) return 1;
    if (page > totalPages) return totalPages;
    return page;
  }, [totalPages]);

  useEffect(() => {
    const page = validatePageNumber(currentPage);
    if (page !== currentPage) {
      router.push(`/search?q=${query}&page=${page}`, { scroll: false });
    }
  }, [currentPage, query, validatePageNumber, router]);

  const getMediaLink = (result: SearchResult) => {
    return result.media_type === 'movie' ? `/movie/${result.id}` : `/tv/${result.id}`;
  };

  const getTitle = (result: SearchResult) => {
    return result.title || result.name || 'Untitled';
  };

  const getImageUrl = (result: SearchResult) => {
    const path = result.poster_path || result.profile_path;
    return path ? `https://image.tmdb.org/t/p/w300${path}` : null;
  };

  const getYear = (result: SearchResult) => {
    const date = result.release_date || result.first_air_date;
    return date ? new Date(date).getFullYear() : null;
  };

  const PaginationButton = ({ page, isActive, disabled }: { page: number | string, isActive?: boolean, disabled?: boolean }) => (
    <button
      onClick={() => {
        const newPage = typeof page === 'string' 
          ? (page === 'Previous' ? currentPage - 1 : currentPage + 1) 
          : page;
        router.push(`/search?q=${query}&page=${newPage}`, { scroll: false });
      }}
      className={`px-4 py-2 rounded-md ${
        isActive 
          ? 'bg-purple-600 text-white' 
          : disabled
            ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
            : 'bg-slate-800 text-white hover:bg-purple-600 transition-colors'
      }`}
      aria-current={isActive ? 'page' : undefined}
      aria-disabled={disabled}
      aria-label={typeof page === 'string' 
        ? page === 'Previous' ? 'Página anterior' : 'Próxima página'
        : `Ir para página ${page}`
      }
      tabIndex={disabled ? -1 : 0}
      disabled={disabled}
    >
      {page}
    </button>
  );

  const ResultCard = ({ result, loading }: { result: SearchResult; loading?: boolean }) => (
    <div 
      className={`bg-slate-900 rounded-lg overflow-hidden transition-opacity duration-200 ${
        loading ? 'animate-pulse opacity-50' : 'hover:scale-105 transition-transform duration-200'
      }`}
    >
      {getImageUrl(result) ? (
        <Image
          src={getImageUrl(result)!}
          alt={getTitle(result)}
          width={300}
          height={450}
          className="w-full object-cover"
          unoptimized
        />
      ) : (
        <div className="w-full h-[450px] bg-slate-800 flex items-center justify-center">
          <span className="text-gray-400">No image</span>
        </div>
      )}
      <div className="p-4">
        <h2 className="text-lg font-semibold">{getTitle(result)}</h2>
        {getYear(result) && (
          <p className="text-gray-400">{getYear(result)}</p>
        )}
        {result.overview && (
          <p className="text-gray-400 mt-2 line-clamp-3">{result.overview}</p>
        )}
      </div>
    </div>
  );

  const LoadingSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {[...Array(8)].map((_, index) => (
        <div 
          key={index}
          className="bg-slate-900 rounded-lg overflow-hidden animate-pulse"
        >
          <div className="w-full h-[450px] bg-slate-800" />
          <div className="p-4 space-y-3">
            <div className="h-6 bg-slate-800 rounded w-3/4" />
            <div className="h-4 bg-slate-800 rounded w-1/4" />
            <div className="space-y-2">
              <div className="h-4 bg-slate-800 rounded" />
              <div className="h-4 bg-slate-800 rounded w-5/6" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className={`${athiti.className} min-h-screen bg-slate-950 text-white px-8 py-6`}>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <button
              onClick={handleBack}
              className="text-gray-400 hover:text-white transition-colors p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2 focus:ring-offset-slate-950"
              aria-label="Voltar para a página anterior ou página inicial"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>
            <h1 className={`${marvel.className} text-3xl`}>
              {query ? `Resultados para "${query}"` : 'Busca'}
            </h1>
          </div>
          <button
            onClick={() => setShowShortcuts(prev => !prev)}
            className="text-gray-400 hover:text-white transition-colors p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2 focus:ring-offset-slate-950"
            aria-label={showShortcuts ? "Esconder atalhos do teclado" : "Mostrar atalhos do teclado"}
            aria-expanded={showShortcuts}
          >
            <span className="sr-only">Teclas de atalho</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        </div>

        {showShortcuts && (
          <div 
            className="bg-slate-800 rounded-lg p-4 mb-6 text-sm"
            role="dialog"
            aria-label="Atalhos do teclado"
          >
            <h2 className="font-semibold mb-2">Atalhos do teclado:</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <li><kbd className="bg-slate-700 px-2 py-1 rounded">Alt</kbd> + <kbd className="bg-slate-700 px-2 py-1 rounded">Backspace</kbd> Voltar</li>
              <li><kbd className="bg-slate-700 px-2 py-1 rounded">←</kbd> Página anterior</li>
              <li><kbd className="bg-slate-700 px-2 py-1 rounded">→</kbd> Próxima página</li>
              <li><kbd className="bg-slate-700 px-2 py-1 rounded">Home</kbd> Primeira página</li>
              <li><kbd className="bg-slate-700 px-2 py-1 rounded">End</kbd> Última página</li>
              <li><kbd className="bg-slate-700 px-2 py-1 rounded">?</kbd> Mostrar/esconder atalhos</li>
              <li><kbd className="bg-slate-700 px-2 py-1 rounded">Esc</kbd> Fechar atalhos</li>
            </ul>
          </div>
        )}
        
        {isLoading && !results.length ? (
          <LoadingSkeleton />
        ) : error ? (
          <div className="text-red-400 text-center py-8" role="alert">{error}</div>
        ) : results.length > 0 ? (
          <>
            <div className="text-gray-400 mb-6">
              <span className="sr-only">Total de </span>
              {totalResults} resultados encontrados
              {query && (
                <>
                  <span className="sr-only"> para a busca </span>
                  para &ldquo;{query}&rdquo;
                </>
              )}
              <span className="sr-only">. Página {currentPage} de {totalPages}</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {results.map((result) => (
                <button
                  key={result.id}
                  onClick={() => router.push(getMediaLink(result), { scroll: false })}
                  className={`text-left ${isLoading ? 'pointer-events-none' : ''}`}
                >
                  <ResultCard result={result} loading={isLoading} />
                </button>
              ))}
            </div>
            
            {totalPages > 1 && (
              <div className={`flex justify-center gap-2 mt-8 transition-opacity duration-200 ${
                isLoading ? 'opacity-50 pointer-events-none' : ''
              }`}>
                <PaginationButton 
                  page="Previous"
                  disabled={currentPage <= 1}
                />
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }
                  return (
                    <PaginationButton
                      key={pageNum}
                      page={pageNum}
                      isActive={pageNum === currentPage}
                    />
                  );
                })}
                <PaginationButton 
                  page="Next"
                  disabled={currentPage >= totalPages}
                />
              </div>
            )}
          </>
        ) : query && (
          <div className="text-center py-8 text-gray-400" role="status">
            Nenhum resultado encontrado para &ldquo;{query}&rdquo;
          </div>
        )}
      </div>
    </div>
  );
}