import { PodcastModel, EpisodeModel, SearchCacheModel, SearchHistoryModel } from './models';
import { searchITunesPodcasts, searchITunesEpisodes } from './itunes';
import { ITunesPodcast, ITunesEpisode, Podcast, Episode, SearchResult } from './types';

export const savePodcast = async (itunesData: ITunesPodcast): Promise<Podcast> => {
  const podcastData = {
    itunesId: itunesData.trackId,
    title: itunesData.trackName,
    author: itunesData.artistName,
    description: itunesData.description || '',
    artworkUrl: itunesData.artworkUrl600 || '',
    genre: itunesData.primaryGenreName,
    episodeCount: itunesData.trackCount || 0
  };

  return await PodcastModel.findOneAndUpdate(
    { itunesId: podcastData.itunesId },
    podcastData,
    { upsert: true, new: true }
  ) as Podcast;
};

export const saveEpisode = async (itunesData: ITunesEpisode): Promise<Episode> => {
  const episodeData = {
    itunesId: itunesData.trackId,
    podcastItunesId: itunesData.collectionId,
    podcastTitle: itunesData.collectionName,
    title: itunesData.trackName,
    description: itunesData.description || '',
    audioUrl: itunesData.episodeUrl || '',
    // Use episode artwork if available, otherwise use podcast artwork
    artworkUrl: itunesData.artworkUrl600 || itunesData.collectionArtworkUrl || '',
    duration: Math.floor((itunesData.trackTimeMillis || 0) / 1000),
    releaseDate: new Date(itunesData.releaseDate)
  };

  return await EpisodeModel.findOneAndUpdate(
    { itunesId: episodeData.itunesId },
    episodeData,
    { upsert: true, new: true }
  ) as Episode;
};

export const saveSearchHistory = async (
  query: string,
  userIP: string,
  userAgent: string,
  resultsCount: number,
  searchTime: number,
  cached: boolean
): Promise<void> => {
  const searchHistory = new SearchHistoryModel({
    query: query.toLowerCase().trim(),
    userIP,
    userAgent,
    resultsCount,
    searchTime,
    cached
  });

  await searchHistory.save();
};

export const searchAndSave = async (
  query: string,
  type: 'all' | 'podcasts' | 'episodes' = 'all',
  useCache: boolean = true
): Promise<SearchResult> => {
  const normalizedQuery = query.toLowerCase().trim();

  // Check cache first if enabled
  if (useCache) {
    const cachedResult = await SearchCacheModel.findOne({
      query: normalizedQuery,
      expiresAt: { $gt: new Date() }
    }).populate('podcasts').populate('episodes');

    if (cachedResult) {
      let podcasts: Podcast[] = [];
      let episodes: Episode[] = [];

      if (type === 'all' || type === 'podcasts') {
        // Handle both populated and non-populated cases
        const cachedPodcasts = cachedResult.podcasts;
        if (Array.isArray(cachedPodcasts) && cachedPodcasts.length > 0) {
          // Check if it's populated (has title property) or just ObjectIds
          if (typeof cachedPodcasts[0] === 'object' && 'title' in cachedPodcasts[0]) {
            podcasts = cachedPodcasts as unknown as Podcast[];
          } else {
            // Not populated, fetch manually
            podcasts = await PodcastModel.find({ _id: { $in: cachedPodcasts } }) as Podcast[];
          }
        }
      }

      if (type === 'all' || type === 'episodes') {
        // Handle both populated and non-populated cases
        const cachedEpisodes = cachedResult.episodes;
        if (Array.isArray(cachedEpisodes) && cachedEpisodes.length > 0) {
          // Check if it's populated (has title property) or just ObjectIds
          if (typeof cachedEpisodes[0] === 'object' && 'title' in cachedEpisodes[0]) {
            episodes = cachedEpisodes as unknown as Episode[];
          } else {
            // Not populated, fetch manually
            episodes = await EpisodeModel.find({ _id: { $in: cachedEpisodes } }) as Episode[];
          }
        }
      }

      return { podcasts, episodes, cached: true };
    }
  }

  // Not in cache or cache disabled - fetch from iTunes
  let podcasts: Podcast[] = [];
  let episodes: Episode[] = [];

  if (type === 'all' || type === 'podcasts') {
    const itunesPodcasts = await searchITunesPodcasts(query);
    podcasts = await Promise.all(itunesPodcasts.map(savePodcast));
  }

  if (type === 'all' || type === 'episodes') {
    const itunesEpisodes = await searchITunesEpisodes(query);
    episodes = await Promise.all(itunesEpisodes.map(saveEpisode));
  }

  // Save to cache for future requests
  if (useCache && (podcasts.length > 0 || episodes.length > 0)) {
    await SearchCacheModel.findOneAndUpdate(
      { query: normalizedQuery },
      {
        query: normalizedQuery,
        podcasts: podcasts.map(p => p._id),
        episodes: episodes.map(e => e._id),
        expiresAt: new Date(Date.now() + 30 * 60 * 1000) // 30 minutes
      },
      { upsert: true }
    );
  }

  return { podcasts, episodes, cached: false };
};
