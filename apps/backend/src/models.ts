import mongoose from 'mongoose';

const PodcastSchema = new mongoose.Schema({
  itunesId: { type: Number, required: true, unique: true, index: true },
  title: { type: String, required: true },
  author: { type: String, required: true },
  description: { type: String, default: '' },
  artworkUrl: { type: String, required: true },
  genre: { type: String, required: true },
  episodeCount: { type: Number, default: 0 }
}, { timestamps: true });

const EpisodeSchema = new mongoose.Schema({
  itunesId: { type: Number, required: true, unique: true, index: true },
  podcastItunesId: { type: Number, required: true, index: true },
  podcastTitle: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, default: '' },
  audioUrl: { type: String, required: true },
  artworkUrl: { type: String, default: '' },
  duration: { type: Number, default: 0 },
  releaseDate: { type: Date, required: true }
}, { timestamps: true });

const SearchCacheSchema = new mongoose.Schema({
  query: { type: String, required: true, unique: true, index: true },
  podcasts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Podcast' }],
  episodes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Episode' }],
  expiresAt: { type: Date, default: () => new Date(Date.now() + 30 * 60 * 1000) } // 30 minutes
}, { timestamps: true });

const SearchHistorySchema = new mongoose.Schema({
  query: { type: String, required: true, index: true },
  userIP: { type: String, required: true },
  userAgent: { type: String },
  resultsCount: { type: Number, default: 0 },
  searchTime: { type: Number, default: 0 },
  cached: { type: Boolean, default: false }
}, { timestamps: true });

export const PodcastModel = mongoose.model('Podcast', PodcastSchema);
export const EpisodeModel = mongoose.model('Episode', EpisodeSchema);
export const SearchCacheModel = mongoose.model('SearchCache', SearchCacheSchema);
export const SearchHistoryModel = mongoose.model('SearchHistory', SearchHistorySchema);
