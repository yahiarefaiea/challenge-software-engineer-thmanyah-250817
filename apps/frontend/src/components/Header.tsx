'use client';

import { useRef, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useScreenSize } from '@/hooks';
import { Button, Dropdown, SearchField } from "@/components";
import { useSearchStore } from '@/context/SearchContext';

export const Header = () => {
  const { isScreenSize } = useScreenSize();
  const router = useRouter();
  const pathname = usePathname();
  const { query, setQuery, performSearch } = useSearchStore();
  const searchFieldRef = useRef<HTMLInputElement>(null);

  const handleSearchSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && query.length >= 2) {
      await performSearch('all', query);
      router.push('/search');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim() && pathname !== '/search') {
      router.push('/search');
    }
  };

  useEffect(() => {
    if (pathname === '/search') {
      const timer = setTimeout(() => {
        searchFieldRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [pathname]);

  useEffect(() => {
    const timer = setTimeout(() => {
      searchFieldRef.current?.focus();
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <header>
      <div className="header--button-group !hidden lg:!flex">
        <Button size="sm" iconButton="custom:alt-arrow-left" />
        <Button size="sm" iconButton="custom:alt-arrow-right" />
      </div>

      <form onSubmit={handleSearchSubmit} className="flex-1">
        <SearchField
          ref={searchFieldRef}
          value={query}
          onChange={handleInputChange}
          placeholder={
            isScreenSize.xl ? 'Search through over 70 million podcasts and episodes...'
            : isScreenSize.sm ? 'Search podcasts and episodes...'
            : 'Search'
          }
        />
      </form>

      <div className="header--button-group !hidden sm:!flex">
        <Button>Log in</Button>
        <Button>Sign up</Button>

        <Dropdown
          trigger={
            <Button
              size="sm"
              iconButton="custom:menu-dots-vertical"
            />
          }
          anchor={{ to: 'bottom end' }}
          items={[
            {
              as: 'a',
              target: '_blank',
              href: 'https://yahiarefaiea.com/about/',
              label: 'About Yahia',
            },
            {
              onClick: () => alert("I would be delighted to share details of my recent projects when I am shortlisted ^^"),
              label: 'Some of my recent projects',
            },
            {
              as: 'a',
              target: '_blank',
              href: 'https://projects-beta.yahiarefaiea.com/',
              label: 'Some of my old projects',
            },
            {
              as: 'a',
              target: '_blank',
              href: 'https://codepen.io/yahiarefaiea',
              label: 'Codepen',
            },
            {
              as: 'a',
              target: '_blank',
              href: 'https://linkedin.com/in/yahiarefaiea',
              label: 'LinkedIn',
            },
            {
              as: 'a',
              target: '_blank',
              href: 'https://github.com/yahiarefaiea',
              label: 'GitHub',
            },
            {
              as: 'a',
              target: '_blank',
              href: 'https://github.com/yahiarefaiea/challenge-software-engineer-thmanyah-250817',
              label: 'Link to repo',
            },
            {
              as: 'a',
              target: '_blank',
              href: 'https://www.figma.com/design/YgnA4a0IlQTcsVuHNPs0DG/Untitled?node-id=0-1&t=PnnwuaXFXSuXhisd-1',
              label: 'Link to Figma file',
            },
            {
              as: 'a',
              target: '_blank',
              href: 'https://drive.google.com/drive/folders/1UK_Y5X2XPp-ffJsG3U8PQkOi0-75Mdyz?usp=sharing',
              label: 'Time-lapse video while designing',
            },
          ]}
        />
      </div>
    </header>
  );
};
