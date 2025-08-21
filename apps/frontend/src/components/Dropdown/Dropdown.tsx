import React from 'react';
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/react';
import classNames from 'classnames';

import type { DropdownItem, DropdownProps } from './types';

import { Button } from '../Button';
import './Dropdown.scss';

export const Dropdown: React.FC<DropdownProps> = ({
  trigger,
  anchor = { to: 'bottom start' },
  items = [],
  className,
  children,
  ...props
}) => {
  const classes = classNames('dropdown', className);

  const renderItems = () => {
    return items.map((item, idx) => (
      <MenuItem key={idx} as="div">
        <DropdownButton item={item} />
      </MenuItem>
    ));
  };

  const content = children || renderItems();

  const renderContent = () => {
    return Array.isArray(content) ? (
      <div className="flex flex-col gap-0d50">{content}</div>
    ) : (
      content
    );
  };

  return (
    <Menu as="div" className={classes} {...props}>
      <MenuButton as="div" className="dropdown--trigger">{trigger}</MenuButton>
      <MenuItems className="dropdown--menu" anchor={anchor}>
        {renderContent()}
      </MenuItems>
    </Menu>
  );
};

interface DropdownButtonProps {
  item: DropdownItem;
}

const DropdownButton: React.FC<DropdownButtonProps> = ({ item }) => {
  const { label, className, ...buttonProps } = item;
  const { ref, ...safeButtonProps } = buttonProps;
  const classes = classNames('dropdown--button', className);

  return (
    <Button
      size="sm"
      className={classes}
      {...safeButtonProps}
    >
      {label}
    </Button>
  );
};
