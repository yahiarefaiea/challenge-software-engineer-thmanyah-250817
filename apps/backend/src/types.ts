export interface ITunesPodcast {
  trackId: number;
  trackName: string;
  artistName: string;
  artworkUrl600: string;
  feedUrl: string;
  primaryGenreName: string;
  trackCount: number;
  description?: string;
}

export interface ITunesEpisode {
  trackId: number;
  collectionId: number;
  trackName: string;
  description: string;
  episodeUrl: string;
  trackTimeMillis: number;
  releaseDate: string;
  collectionName: string;
  artworkUrl600?: string;
  collectionArtworkUrl?: string;
}

export interface Podcast {
  _id: string;
  itunesId: number;
  title: string;
  author: string;
  description: string;
  artworkUrl: string;
  genre: string;
  episodeCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Episode {
  _id: string;
  itunesId: number;
  podcastItunesId: number;
  podcastTitle: string;
  title: string;
  description: string;
  audioUrl: string;
  artworkUrl: string;
  duration: number;
  releaseDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface SearchCache {
  _id: string;
  query: string;
  podcasts: Podcast[];
  episodes: Episode[];
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface SearchResult {
  podcasts: Podcast[];
  episodes: Episode[];
  cached: boolean;
}
