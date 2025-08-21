import { forwardRef } from 'react';
import classNames from 'classnames';
import type { SearchFieldProps } from './types';
import { Input } from '../Input';
import './SearchField.scss';

export const SearchField = forwardRef<HTMLInputElement, SearchFieldProps>(
  (
    {
      className,
      ...props
    },
    ref,
  ) => {
    const classes = classNames(
      'search-field',
      className,
    );

    return (
      <Input
        placeholder="Search something..."
        {...props}
        ref={ref}
        className={classes}
      />
    );
  },
);

SearchField.displayName = 'SearchField';
