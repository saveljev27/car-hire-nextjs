'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useDebounce } from 'react-use';
import { useRouter } from 'next/navigation';
import { updateSearchParams } from '../lib/update-search-params';
import { RxCross2 } from './UI';

export const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = async (searchQuery: string) => {
    const newPathName = updateSearchParams(
      'search',
      searchQuery.toLowerCase().trim()
    );
    router.push(newPathName, { scroll: false });
  };

  useDebounce(
    () => {
      handleSearch(searchQuery);
    },
    350,
    [searchQuery]
  );

  return (
    <div className="searchbar">
      <div className="searchbar__item">
        <Image
          src="/images/car-logo.svg"
          width={20}
          height={20}
          className="absolute left-3"
          alt="Car logo"
        />
        <input
          className="search-manufacturer__input"
          placeholder="Volkswagen"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchQuery && (
          <button
            className="absolute top-1/3 right-3 hover:text-primary-red"
            onClick={() => setSearchQuery('')}
          >
            {<RxCross2 />}
          </button>
        )}
      </div>
    </div>
  );
};
