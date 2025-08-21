import React from 'react';
import classNames from 'classnames';
import type { ThumbnailProps } from './types';
import './Thumbnail.scss';

export const Thumbnail: React.FC<ThumbnailProps> = ({
  size = 'md',
  src,
  className,
  ...props
}) => {
  const classes = classNames('thumbnail', `thumbnail--${size}`, className);

  return (
    <div className={classes} {...props}>
      <img src={src} alt="Image alt text" className="thumbnail--image" />
    </div>
  );
};
