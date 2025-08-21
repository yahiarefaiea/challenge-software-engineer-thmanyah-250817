import { SearchField } from './SearchField';

export default {
  title: 'Components/Search field',
};

export const SearchFieldStory = () => (
  <div className="flex justify-center items-center min-h-screen py-400">
    <SearchField className="max-w-1800" />
  </div>
);

SearchFieldStory.storyName = 'Search field';
