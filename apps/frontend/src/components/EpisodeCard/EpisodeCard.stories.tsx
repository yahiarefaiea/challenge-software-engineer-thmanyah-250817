import { EpisodeCard } from './EpisodeCard';

export default {
  title: 'Components/Episode card',
};

export const EpisodeCardStory = () => {
  const episodeTitle = 'Episode title';
  const podcastTitle = 'Podcast title';
  const description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis accumsan scelerisque orci ut vestibulum.';
  const timestamps = 'Aug, 17, 2025';
  const duration = '30 min';

  return (
    <div className="flex justify-center items-center min-h-screen py-400">
      <div className="flex flex-col gap-100 items-start">
        <EpisodeCard
          size="lg"
          episodeTitle={episodeTitle}
          podcastTitle={podcastTitle}
          description={description}
          timestamps={timestamps}
          duration={duration}
          style={{ maxWidth: 28 * 18.5 }}
        />
        <EpisodeCard
          size="md"
          episodeTitle={episodeTitle}
          podcastTitle={podcastTitle}
          timestamps={timestamps}
          duration={duration}
          style={{ maxWidth: 28 * 12 }}
        />
        <EpisodeCard
          size="sm"
          episodeTitle={episodeTitle}
          podcastTitle={podcastTitle}
          style={{ maxWidth: 28 * 12 }}
        />
      </div>
    </div>
  );
};

EpisodeCardStory.storyName = 'Episode card';
