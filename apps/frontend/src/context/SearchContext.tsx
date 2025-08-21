'use client';

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
} from 'react';
import { useDebounce } from 'react-use';
import {
  searchPodcasts,
  searchPodcastsOnly,
  searchEpisodesOnly,
  SearchResponse,
} from '@/services/api';

interface SearchContextType {
  query: string;
  setQuery: (query: string) => void;
  results: SearchResponse | null;
  loading: boolean;
  error: string | null;
  performSearch: (searchType?: 'all' | 'podcasts' | 'episodes', customQuery?: string) => Promise<void>;
  debouncedQuery: string;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Debounce search query by 500ms
  const [debouncedQuery, setDebouncedQuery] = useState('');
  useDebounce(() => {
    if (query.trim()) {
      setDebouncedQuery(query);
    }
  }, 500, [query]);

  const performSearch = useCallback(async (searchType: 'all' | 'podcasts' | 'episodes' = 'all', customQuery?: string) => {
    const searchQuery = customQuery || debouncedQuery || query;

    if (!searchQuery.trim() || searchQuery.length < 2) {
      setResults(null);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      let response: SearchResponse;

      switch (searchType) {
        case 'podcasts':
          response = await searchPodcastsOnly(searchQuery);
          break;
        case 'episodes':
          response = await searchEpisodesOnly(searchQuery);
          break;
        default:
          response = await searchPodcasts(searchQuery);
      }

      setResults(response);
    } catch (err: any) {
      console.error('Search error:', err);
      setError(err.response?.data?.message || 'Search failed. Please try again.');
      setResults(null);
    } finally {
      setLoading(false);
    }
  }, [debouncedQuery, query]);

  // Auto-search when debounced query changes
  React.useEffect(() => {
    if (debouncedQuery && debouncedQuery.length >= 2) {
      performSearch();
    }
  }, [debouncedQuery, performSearch]);

  return (
    <SearchContext.Provider value={{
      query,
      setQuery,
      results,
      loading,
      error,
      performSearch,
      debouncedQuery
    }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchStore = () => {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearchStore must be used within a SearchProvider');
  }
  return context;
};
