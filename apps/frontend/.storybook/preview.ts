import type { Preview } from '@storybook/react';
import { addCollections } from '../src/components/Icon/Icon';
import '../src/styles/index.scss';
import './preview.scss';

addCollections();

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
