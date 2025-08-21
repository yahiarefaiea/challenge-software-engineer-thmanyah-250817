import express, { Request, Response } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { searchAndSave, saveSearchHistory } from './services';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/challenge-software-engineer-thmanyah-250817')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Get client IP helper
const getClientIP = (req: Request): string => {
  return (req.headers['x-forwarded-for'] as string) ||
         req.socket.remoteAddress ||
         '127.0.0.1';
};

// Search endpoint
app.get('/api/search', async (req: Request, res: Response) => {
  try {
    const { q: query, cache = 'true' } = req.query;

    if (!query || typeof query !== 'string') {
      return res.status(400).json({ message: 'Query parameter is required' });
    }

    if (query.length < 2) {
      return res.status(400).json({ message: 'Query must be at least 2 characters long' });
    }

    const useCache = cache === 'true';
    const startTime = Date.now();
    const { podcasts, episodes, cached } = await searchAndSave(query, 'all', useCache);
    const searchTime = Date.now() - startTime;

    // Save to search history
    const userIP = getClientIP(req);
    const userAgent = req.headers['user-agent'] || '';
    const resultsCount = podcasts.length + episodes.length;
    await saveSearchHistory(query, userIP, userAgent, resultsCount, searchTime, cached);

    res.json({
      query,
      podcasts: podcasts.map(p => ({
        id: p._id,
        itunesId: p.itunesId,
        title: p.title,
        author: p.author,
        description: p.description,
        artworkUrl: p.artworkUrl,
        genre: p.genre,
        episodeCount: p.episodeCount
      })),
      episodes: episodes.map(e => ({
        id: e._id,
        itunesId: e.itunesId,
        podcastTitle: e.podcastTitle,
        title: e.title,
        description: e.description,
        audioUrl: e.audioUrl,
        artworkUrl: e.artworkUrl,
        duration: e.duration,
        releaseDate: e.releaseDate
      })),
      totalPodcasts: podcasts.length,
      totalEpisodes: episodes.length,
      cached,
      searchTime
    });
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Podcasts only endpoint
app.get('/api/search/podcasts', async (req: Request, res: Response) => {
  try {
    const { q: query, cache = 'true' } = req.query;

    if (!query || typeof query !== 'string') {
      return res.status(400).json({ message: 'Query parameter is required' });
    }

    const useCache = cache === 'true';
    const startTime = Date.now();
    const { podcasts, cached } = await searchAndSave(query, 'podcasts', useCache);
    const searchTime = Date.now() - startTime;

    // Save to search history
    const userIP = getClientIP(req);
    const userAgent = req.headers['user-agent'] || '';
    await saveSearchHistory(query, userIP, userAgent, podcasts.length, searchTime, cached);

    res.json({
      query,
      podcasts: podcasts.map(p => ({
        id: p._id,
        itunesId: p.itunesId,
        title: p.title,
        author: p.author,
        description: p.description,
        artworkUrl: p.artworkUrl,
        genre: p.genre,
        episodeCount: p.episodeCount
      })),
      episodes: [],
      totalPodcasts: podcasts.length,
      totalEpisodes: 0,
      cached,
      searchTime
    });
  } catch (error) {
    console.error('Podcast search error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Episodes only endpoint
app.get('/api/search/episodes', async (req: Request, res: Response) => {
  try {
    const { q: query, cache = 'true' } = req.query;

    if (!query || typeof query !== 'string') {
      return res.status(400).json({ message: 'Query parameter is required' });
    }

    const useCache = cache === 'true';
    const startTime = Date.now();
    const { episodes, cached } = await searchAndSave(query, 'episodes', useCache);
    const searchTime = Date.now() - startTime;

    // Save to search history
    const userIP = getClientIP(req);
    const userAgent = req.headers['user-agent'] || '';
    await saveSearchHistory(query, userIP, userAgent, episodes.length, searchTime, cached);

    res.json({
      query,
      podcasts: [],
      episodes: episodes.map(e => ({
        id: e._id,
        itunesId: e.itunesId,
        podcastTitle: e.podcastTitle,
        title: e.title,
        description: e.description,
        audioUrl: e.audioUrl,
        artworkUrl: e.artworkUrl,
        duration: e.duration,
        releaseDate: e.releaseDate
      })),
      totalPodcasts: 0,
      totalEpisodes: episodes.length,
      cached,
      searchTime
    });
  } catch (error) {
    console.error('Episode search error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
