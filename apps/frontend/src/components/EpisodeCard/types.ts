import type { ThumbnailProps } from '../Thumbnail';

export type EpisodeCardSize = 'lg' | 'md' | 'sm';

export type EpisodeCardThumbnail = Omit<ThumbnailProps, 'size'>;

export interface EpisodeCardProps extends React.HTMLAttributes<HTMLDivElement> {
  size: EpisodeCardSize;
  thumbnail?: EpisodeCardThumbnail;
  episodeTitle: string;
  podcastTitle: string;
  description?: string;
  timestamps?: string;
  duration?: string;
}
