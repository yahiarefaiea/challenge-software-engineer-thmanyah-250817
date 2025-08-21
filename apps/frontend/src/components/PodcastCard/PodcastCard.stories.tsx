import { PodcastCard } from './PodcastCard';

export default {
  title: 'Components/Podcast card',
};

export const PodcastCardStory = () => {
  // const src = `https://picsum.photos/${182 * 3}/${182 * 3}`;

  return (
    <div className="flex justify-center items-center min-h-screen py-400">
      <PodcastCard
        // thumbnail={{ src }}
        title="Podcast title"
        author="Podcast author"
        style={{ maxWidth: 28 * 10 }}
      />
    </div>
  );
};

PodcastCardStory.storyName = 'Podcast card';
