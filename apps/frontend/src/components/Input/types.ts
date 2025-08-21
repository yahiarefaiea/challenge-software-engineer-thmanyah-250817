import React from 'react';
import { Input as HeadlessInput } from '@headlessui/react';

export type InputSize = 'sm';

type NativeInputProps =
  Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>;

type HeadlessInputProps = Omit<
  React.ComponentProps<typeof HeadlessInput>,
  keyof NativeInputProps
>;

export interface InputProps extends NativeInputProps, HeadlessInputProps {
  size?: InputSize;
}
