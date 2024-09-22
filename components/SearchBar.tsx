import { useState } from 'react';
import Image from 'next/image';
import { useDebounce } from 'react-use';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  useDebounce(
    () => {
      onSearch(searchQuery);
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
      </div>
    </div>
  );
};

export default SearchBar;
