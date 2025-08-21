export type ThumbnailSize = 'sm' | 'md' | 'lg';

export interface ThumbnailProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: ThumbnailSize;
  src?: string;
}
