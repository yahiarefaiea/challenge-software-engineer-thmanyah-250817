import type { IconProps as IconifyProps } from '@iconify/react';

export type IconName =
  | 'custom:alt-arrow-down'
  | 'custom:alt-arrow-left'
  | 'custom:alt-arrow-right'
  | 'custom:menu-dots-vertical';
export type IconSize = 'md';
export type IconSource = IconName | React.ReactElement;

export interface IconProps extends IconifyProps {
  icon: IconName;
  size?: IconSize;
}
