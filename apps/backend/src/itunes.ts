import axios from 'axios';
import { ITunesPodcast, ITunesEpisode } from './types';

const ITUNES_API_URL = process.env.ITUNES_API_URL || 'https://itunes.apple.com/search';

export const searchITunesPodcasts = async (query: string): Promise<ITunesPodcast[]> => {
  try {
    const response = await axios.get(ITUNES_API_URL, {
      params: {
        term: query,
        media: 'podcast',
        limit: 10
      }
    });
    return response.data.results || [];
  } catch (error) {
    console.error('iTunes podcast search error:', error);
    return [];
  }
};

export const searchITunesEpisodes = async (query: string): Promise<ITunesEpisode[]> => {
  try {
    const response = await axios.get(ITUNES_API_URL, {
      params: {
        term: query,
        entity: 'podcastEpisode',
        limit: 10
      }
    });
    return response.data.results || [];
  } catch (error) {
    console.error('iTunes episode search error:', error);
    return [];
  }
};
