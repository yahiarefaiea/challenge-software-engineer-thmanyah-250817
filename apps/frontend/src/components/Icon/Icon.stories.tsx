import type { IconName } from './types';
import { Icon } from './Icon';
import { collections } from './collections';

export default {
  title: 'Components/Icon',
};

export const IconStory = () => (
  <div className="flex justify-center items-center min-h-screen py-400">
    <div className="flex flex-wrap gap-100">
      {Object.keys(collections.custom.icons).map((icon) => {
        const iconName = `custom:${icon}` as IconName;
        return (
          <div key={iconName} title={iconName}>
            <Icon icon={iconName} />
          </div>
        );
      })}
    </div>
  </div>
);

IconStory.storyName = 'Icon';
