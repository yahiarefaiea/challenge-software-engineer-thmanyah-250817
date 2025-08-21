import { forwardRef } from 'react';
import { Button } from '@headlessui/react';
import type { HeadlessButtonProps } from './types';

export const HeadlessButton = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  HeadlessButtonProps
>(
  (
    {
      as: Component = 'button',
      href,
      target,
      disabled = false,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <Button
        ref={ref}
        as={Component}
        {...(Component === 'a' && { href, target })}
        {...(Component === 'button' && { disabled })}
        {...props}
      >
        {children}
      </Button>
    );
  },
);

HeadlessButton.displayName = 'HeadlessButton';
