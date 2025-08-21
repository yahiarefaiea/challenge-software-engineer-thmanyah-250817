import React from 'react';
import classNames from 'classnames';

import type { EpisodeCardSize, EpisodeCardProps } from './types';
import type { ThumbnailSize } from '../Thumbnail';

import { Button } from '../Button';
import { Dropdown } from '../Dropdown';
import { Thumbnail } from '../Thumbnail';

import './EpisodeCard.scss';

const thumbnailSizeMap: Record<EpisodeCardSize, ThumbnailSize> = {
  lg: 'md',
  md: 'md',
  sm: 'sm',
};

export const EpisodeCard: React.FC<EpisodeCardProps> = ({
  size,
  thumbnail,
  episodeTitle,
  podcastTitle,
  description,
  timestamps,
  duration,
  className,
  ...props
}) => {
  const classes = classNames(
    'episode-card',
    `episode-card--${size}`,
    className,
  );

  const renderDropdown = () => (
    <Dropdown
      trigger={
        <Button
          size="sm"
          iconButton="custom:menu-dots-vertical"
        />
      }
      anchor={{ to: 'bottom end' }}
      items={[
        ...(size === 'sm' ? [{ label: 'Play episode' }] : []),
        { label: 'Add to my queue' },
        { label: 'Go to episode' },
        { label: 'Go to podcast' },
        { label: 'Download file' },
        { label: 'Hide podcast' },
      ]}
    />
  );

  const renderTimestampsAndDuration = () => {
    if (!timestamps && !duration) return null;
    return (
      <div className="flex gap-150">
        {timestamps && (
          <small className="episode-card--timestamps">{timestamps}</small>
        )}
        {duration && (
          <small className="episode-card--duration">{duration}</small>
        )}
      </div>
    );
  };

  return (
    <div className={classes} {...props}>
      <Thumbnail
        {...thumbnail}
        size={thumbnailSizeMap[size]}
        className="episode-card--thumbnail"
      />

      <div className="episode-card--content">
        <div className="episode-card--button-group">
          {renderDropdown()}

          {size === 'lg' && <Button size="sm">Play episode</Button>}
        </div>

        {/* Size LG & MD */}
        {(size === 'lg' || size === 'md') && (
          <>
            <div className="flex flex-col gap-0d50">
              <div className="flex flex-col">
                <span className="episode-card--podcast-title">{podcastTitle}</span>
                <div className="episode-card--episode-title">{episodeTitle}</div>
              </div>

              {size === 'lg' && (
                <p className="episode-card--description">{description}</p>
              )}

              {size === 'md' && renderTimestampsAndDuration()}
            </div>

            {size === 'lg' && renderTimestampsAndDuration()}

            {size === 'md' && <Button size="sm">Play episode</Button>}
          </>
        )}

        {/* Size SM */}
        {size === 'sm' && (
          <div className="flex flex-col">
            <div className="episode-card--episode-title">{episodeTitle}</div>
            <span className="episode-card--podcast-title">{podcastTitle}</span>
          </div>
        )}
      </div>
    </div>
  );
};
