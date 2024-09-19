'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

import Hero from '@/components/Hero';
import CarCard from '@/components/CarCard';

import { CarProps } from '@/types';
import { search } from '@/actions';
import { useDebounce } from 'react-use';

function Home() {
  const [allCars, setAllCars] = useState<CarProps[]>([]);
  const [searchCars, setSearchCars] = useState<CarProps[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchCars = async () => {
    const response = await fetch('/api/cars');
    const data = await response.json();
    setAllCars(data);
  };
  useEffect(() => {
    fetchCars();
  }, []);

  useDebounce(
    async () => {
      try {
        const response = await search(searchQuery);
        setSearchCars(response);
      } catch (error) {}
    },
    350,
    [searchQuery]
  );

  return (
    <main className="overflow-hidden">
      <Hero />

      <div className="mt-12 padding-x padding-y max-width" id="discover">
        <div className="home__text-container">
          <h1 className="text-4x1 font-extrabold">Catalogue</h1>
          <p>Investigate these ideal cars that might suit your style.</p>
        </div>
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
        {searchCars && searchCars.length > 0 ? (
          <section>
            <div id="cars" className="home__cars-wrapper">
              {searchCars.map((car: CarProps) => (
                <CarCard key={car._id} car={car} />
              ))}
            </div>
          </section>
        ) : (
          <section>
            <div className="home__cars-wrapper">
              {allCars.length > 0 ? (
                allCars.map((car) => <CarCard key={car._id} car={car} />)
              ) : (
                <div className="row">
                  <Image
                    src={'/images/loading.gif'}
                    alt="Loading"
                    width={30}
                    height={30}
                  />
                </div>
              )}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

export default Home;
