import { Meta, StoryFn } from '@storybook/react';
import type { InputSize } from './types';
import { Input } from './Input';

const sizes: InputSize[] = ['sm'];

export default {
  title: 'Components/Input',
  component: Input,
  argTypes: {
    size: {
      control: 'radio',
      options: sizes,
    },
    placeholder: { control: 'text' },
  },
} as Meta<typeof Input>;

const Template: StoryFn<typeof Input> = (args) => (
  <div className="flex justify-center items-center min-h-screen py-400">
    <Input {...args} className="max-w-1800" />
  </div>
);

export const InputStory = Template.bind({});
InputStory.storyName = 'Input';

InputStory.args = {
  size: 'sm',
  placeholder: 'Placeholder',
};
