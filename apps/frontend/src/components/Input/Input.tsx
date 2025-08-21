import { forwardRef } from 'react';
import classNames from 'classnames';
import type { InputProps } from './types';
import { Input as HeadlessInput } from '@headlessui/react';
import './Input.scss';

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      size = 'sm',
      className,
      ...props
    },
    ref,
  ) => {
    const classes = classNames(
      'input-wrapper',
      `input-wrapper--${size}`,
      className,
    );

    return (
      <div className={classes}>
        {/* Input */}
        <HeadlessInput ref={ref} className="input" {...props} />
      </div>
    );
  },
);

Input.displayName = 'Input';
