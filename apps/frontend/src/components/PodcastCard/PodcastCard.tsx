import React from 'react';
import classNames from 'classnames';

import type { PodcastCardProps } from './types';

import { Button } from '../Button';
import { Dropdown } from '../Dropdown';
import { Thumbnail } from '../Thumbnail';

import './PodcastCard.scss';

export const PodcastCard: React.FC<PodcastCardProps> = ({
  thumbnail,
  title,
  author,
  className,
  ...props
}) => {
  const classes = classNames('podcast-card', className);

  return (
    <div className={classes} {...props}>
      <Thumbnail
        {...thumbnail}
        size="lg"
        className="podcast-card--thumbnail"
      />

      <div className="podcast-card--content">
        <div className="podcast-card--button-group">
          <Dropdown
            trigger={
              <Button
                size="sm"
                iconButton="custom:menu-dots-vertical"
              />
            }
            anchor={{ to: 'bottom end' }}
            items={[
              { label: 'Add to my podcasts' },
              { label: 'Go to podcast' },
              { label: 'Share podcast' },
              { label: 'Hide podcast' },
            ]}
          />
        </div>

        <div className="podcast-card--title">{title}</div>
        <span className="podcast-card--author">{author}</span>
      </div>
    </div>
  );
};
