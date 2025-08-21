import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export interface Podcast {
  id: string;
  itunesId: number;
  title: string;
  author: string;
  description: string;
  artworkUrl: string;
  genre: string;
  episodeCount: number;
}

export interface Episode {
  id: string;
  itunesId: number;
  podcastTitle: string;
  title: string;
  description: string;
  audioUrl: string;
  artworkUrl: string;
  duration: number;
  releaseDate: string;
}

export interface SearchResponse {
  query: string;
  podcasts: Podcast[];
  episodes: Episode[];
  totalPodcasts: number;
  totalEpisodes: number;
  cached: boolean;
}

export const searchPodcasts = async (query: string, cache: boolean = true): Promise<SearchResponse> => {
  const response = await api.get('/search', {
    params: { q: query, cache }
  });
  return response.data;
};

export const searchPodcastsOnly = async (query: string): Promise<SearchResponse> => {
  const response = await api.get('/search/podcasts', {
    params: { q: query }
  });
  return response.data;
};

export const searchEpisodesOnly = async (query: string): Promise<SearchResponse> => {
  const response = await api.get('/search/episodes', {
    params: { q: query }
  });
  return response.data;
};
