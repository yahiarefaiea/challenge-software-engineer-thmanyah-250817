import type { ButtonSize } from './types';
import { Button } from './Button';

const buttonSizes: ButtonSize[] = ['md', 'sm'];

export default {
  title: "Components/Button",
};

export const ButtonStory = () => (
  <div className="flex justify-center items-center min-h-screen py-400">
    <div className="flex flex-col gap-100">
      {buttonSizes.map((size) => (
        <div key={size} className="flex items-start gap-100">
          <Button
            size={size}
            iconButton="custom:menu-dots-vertical"
          />

          <Button size={size}>Button</Button>

          <Button
            size={size}
            icons={{ end: 'custom:alt-arrow-down' }}
          >
            Button
          </Button>
        </div>
      ))}
    </div>
  </div>
);

ButtonStory.storyName = "Button";
