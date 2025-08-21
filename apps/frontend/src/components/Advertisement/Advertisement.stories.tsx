import { Advertisement } from './Advertisement';

export default {
  title: 'Components/Advertisement',
};

export const AdvertisementStory = () => (
  <div className="flex justify-center items-center min-h-screen py-400">
    <Advertisement />
  </div>
);

AdvertisementStory.storyName = 'Advertisement';
