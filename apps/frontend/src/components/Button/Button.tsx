import { forwardRef } from 'react';
import classNames from 'classnames';

import type { IconSource } from '../Icon';
import type { ButtonProps } from './types';

import { HeadlessButton } from '../HeadlessButton';
import { Icon } from '../Icon';

import './Button.scss';

export const Button = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(
  (
    {
      size = 'md',
      iconButton,
      icons,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const classes = classNames(
      'button',
      `button--${size}`,
      { 'button--icon-button': !!iconButton },
      className,
    );

    const renderIcon = (icon?: IconSource) => {
      if (!icon) return null;

      return typeof icon === 'string' ? (
        <Icon icon={icon} size="md" />
      ) : (
        icon
      );
    };

    const content = iconButton && !children ? (
      <>
        {/* Icon button */}
        {renderIcon(iconButton)}
      </>
    ) : (
      <>
        {/* Button content */}
        {children && <span>{children}</span>}

        {/* End icon */}
        {icons?.end && renderIcon(icons.end)}
      </>
    );

    return (
      <HeadlessButton ref={ref} className={classes} {...props}>
        {content}
      </HeadlessButton>
    );
  },
);

Button.displayName = 'Button';
