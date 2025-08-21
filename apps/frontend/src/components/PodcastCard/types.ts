import type { ThumbnailProps } from '../Thumbnail';

export type PodcastCardThumbnail = Omit<ThumbnailProps, 'size'>;

export interface PodcastCardProps extends React.HTMLAttributes<HTMLDivElement> {
  thumbnail?: PodcastCardThumbnail;
  title: string;
  author: string;
}
