'use client';

import { useState } from 'react';
import { useKeenSlider } from 'keen-slider/react';
import moment from 'moment';
import 'keen-slider/keen-slider.min.css';

import {
  Advertisement,
  Button,
  Divider,
  Dropdown,
  EpisodeCard,
  PodcastCard,
} from '@/components';
import { useSearchStore } from '@/context/SearchContext';

type PodcastLayout = 'scroll' | 'grid';
type EpisodeLayout = 'detailed' | 'comfortable' | 'compact';

export default function Search() {
  const { results, loading, error } = useSearchStore();
  const [podcastLayout, setPodcastLayout] = useState<PodcastLayout>('scroll');
  const [episodeLayout, setEpisodeLayout] = useState<EpisodeLayout>('compact');

  // Keen Slider for horizontal scroll
  const [sliderRef, instanceRef] = useKeenSlider({
    loop: false,
    mode: "free",
    slides: {
      perView: "auto",
      spacing: 21,
    },
  });

  const episodeSizeMap = {
    detailed: 'lg' as const,
    comfortable: 'md' as const,
    compact: 'sm' as const,
  };

  const getEpisodeGridCols = () => {
    switch (episodeLayout) {
      case 'detailed': return 'grid-cols-1 2xl:grid-cols-2';
      case 'comfortable': return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3';
      case 'compact': return 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4';
    }
  };

  const formatDuration = (seconds: number) => {
    return moment.duration(seconds, 'seconds').humanize();
  };

  const formatDate = (dateString: string) => {
    return moment(dateString).format('MMM DD, YYYY');
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center gap-100 py-400">
        <p className="text-h3 font-regular">
          Loading...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center gap-100 py-400">
        <p className="text-h3 font-regular">{error}</p>
      </div>
    );
  }

  if (!results) {
    return (
      <div className="flex flex-col justify-center items-center gap-100 py-400">
        <p className="text-h3 font-regular">
          Enter a search query to find podcasts and episodes
        </p>
      </div>
    );
  }

  const hasResults = results.podcasts.length > 0 || results.episodes.length > 0;

  if (!hasResults) {
    return (
      <div className="flex flex-col justify-center items-center gap-100 py-400">
        <p className="text-h3 font-regular">
          No results found for “<b>{results.query}</b>”
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-400">
      {/* Podcast results */}
      {results.podcasts.length > 0 && (
        <section className="flex flex-col gap-150">
          <div className="flex flex-col md:flex-row items-center gap-0d50 md:gap-200 px-[20px] pl-[27px]">
            <h3 className="flex-1 text-b1 font-bold">
              Top podcast results for “<b>{results.query}</b>”
            </h3>

            <div className="flex items-center gap-100">
              {podcastLayout === 'scroll' && (
                <div className="flex items-center gap-0d50">
                  <Button
                    size="sm"
                    iconButton="custom:alt-arrow-left"
                    onClick={() => instanceRef.current?.prev()}
                  />
                  <Button
                    size="sm"
                    iconButton="custom:alt-arrow-right"
                    onClick={() => instanceRef.current?.next()}
                  />
                </div>
              )}

              <Button
                size="sm"
                onClick={() => setPodcastLayout(podcastLayout === 'scroll' ? 'grid' : 'scroll')}
              >
                Switch layout to {podcastLayout === 'scroll' ? 'Grid' : 'Scroll'}
              </Button>
            </div>
          </div>

          <Divider />

          {podcastLayout === 'scroll' ? (
            <div ref={sliderRef} className="keen-slider pl-[20px]">
              {results.podcasts.map((podcast) => (
                <div
                  key={podcast.id}
                  className="keen-slider__slide min-w-1500 max-w-1500"
                >
                  <PodcastCard
                    thumbnail={{ src: podcast.artworkUrl }}
                    title={podcast.title}
                    author={podcast.author}
                    className="min-w-0"
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-150 px-[20px]">
              {results.podcasts.map((podcast) => (
                <PodcastCard
                  key={podcast.id}
                  thumbnail={{ src: podcast.artworkUrl }}
                  title={podcast.title}
                  author={podcast.author}
                  className="min-w-0"
                />
              ))}
            </div>
          )}
        </section>
      )}

      {results.podcasts.length > 0 && results.episodes.length > 0 && (
        <div className="flex justify-center">
          <Advertisement />
        </div>
      )}

      {/* Episode results */}
      {results.episodes.length > 0 && (
        <section className="flex flex-col gap-150">
          <div className="flex flex-col md:flex-row items-center gap-0d50 md:gap-200 px-[20px] pl-[27px]">
            <h3 className="flex-1 text-b1 font-bold">
              Top episode results for “<b>{results.query}</b>”
            </h3>

            <div className="flex items-center gap-0d50">
              <Dropdown
                trigger={
                  <Button
                    size="sm"
                    icons={{ end: 'custom:alt-arrow-down' }}
                  >
                    Selected layout: {episodeLayout.charAt(0).toUpperCase() + episodeLayout.slice(1)}
                  </Button>
                }
                anchor={{ to: 'bottom end' }}
                items={[
                  {
                    label: 'Detailed',
                    onClick: () => setEpisodeLayout('detailed')
                  },
                  {
                    label: 'Comfortable',
                    onClick: () => setEpisodeLayout('comfortable')
                  },
                  {
                    label: 'Compact',
                    onClick: () => setEpisodeLayout('compact')
                  },
                ]}
              />
            </div>
          </div>

          <Divider />

          <div className={`grid ${getEpisodeGridCols()} gap-150 px-[20px]`}>
            {results.episodes.map((episode) => (
              <EpisodeCard
                key={episode.id}
                size={episodeSizeMap[episodeLayout]}
                thumbnail={{ src: episode.artworkUrl }}
                episodeTitle={episode.title}
                podcastTitle={episode.podcastTitle}
                description={episode.description}
                timestamps={formatDate(episode.releaseDate)}
                duration={formatDuration(episode.duration)}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
