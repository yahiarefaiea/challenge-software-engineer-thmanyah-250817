import React from 'react';
import { Button } from '@headlessui/react';

type ButtonProps = React.ComponentProps<typeof Button>;

export interface HeadlessButtonProps extends ButtonProps {
  children?: React.ReactNode;
  href?: string;
  target?: string;
}
