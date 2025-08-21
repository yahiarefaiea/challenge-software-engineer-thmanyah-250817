import { Dropdown } from './Dropdown';
import { Button } from '../Button';
import type { DropdownItem } from './types';

export default {
  title: 'Components/Dropdown',
};

export const DropdownStory = () => (
  <div className="flex justify-center items-center min-h-screen py-400">
    <Dropdown
      trigger={<Button icons={{ end: 'custom:alt-arrow-down' }}>Dropdown</Button>}
      items={Array.from({ length: 3 }, (_, i): DropdownItem => ({
        label: `Action ${i + 1}`,
      }))}
    />
  </div>
);

DropdownStory.storyName = 'Dropdown';
