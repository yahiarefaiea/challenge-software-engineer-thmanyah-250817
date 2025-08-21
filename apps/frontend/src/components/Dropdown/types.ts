import React from 'react';
import { Menu, MenuItems } from '@headlessui/react';
import type { ButtonProps } from '../Button';

type HeadlessMenuProps = React.ComponentProps<typeof Menu>;
type HeadlessMenuItemsProps = React.ComponentProps<typeof MenuItems>;

export interface DropdownItem extends Omit<
  ButtonProps,
  'size' | 'iconButton' | 'icons'
> {
  label?: string;
}

export interface DropdownProps extends HeadlessMenuProps {
  trigger: React.ReactNode;
  anchor?: HeadlessMenuItemsProps['anchor'];
  items?: DropdownItem[];
  children?: React.ReactNode;
}
