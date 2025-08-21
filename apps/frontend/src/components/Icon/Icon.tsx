import React from 'react';
import classNames from 'classnames';
import { Icon as IconifyIcon, addCollection } from '@iconify/react';
import { collections } from './collections';
import type { IconProps } from './types';
import './Icon.scss';

export const addCollections = () => {
  Object.values(collections).forEach((collection) => {
    addCollection(collection);
  });
};

export const Icon: React.FC<IconProps> = ({
  icon,
  size = 'md',
  className,
  ...props
}) => {
  const classes = classNames('icon', `icon--${size}`, className);

  return <IconifyIcon icon={icon} className={classes} {...props} />;
};
