import React from 'react';
import type { ThumbnailSize } from './types';
import { Thumbnail } from './Thumbnail';

const thumbnailSizes: ThumbnailSize[] = ['sm', 'md', 'lg'];

export default {
  title: 'Components/Thumbnail',
};

export const ThumbnailStory = () => {
  const renderThumbnailRow = (size: ThumbnailSize) => {
    const thumbnailProps = { size };
    const src = `https://picsum.photos/${182 * 3}/${182 * 3}`;

    return (
      <div key={size} className="flex gap-100">
        <Thumbnail {...thumbnailProps} src={src} />
        <Thumbnail {...thumbnailProps} />
      </div>
    );
  };

  return (
    <div className="flex justify-center items-center min-h-screen py-400">
      <div className="flex flex-col gap-100">
        {thumbnailSizes.map((size) => (
          <React.Fragment key={size}>{renderThumbnailRow(size)}</React.Fragment>
        ))}
      </div>
    </div>
  );
};

ThumbnailStory.storyName = "Thumbnail";
