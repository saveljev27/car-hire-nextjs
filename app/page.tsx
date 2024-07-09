'use client';

import { useEffect, useState, ChangeEvent } from 'react';

import Hero from '@/components/Hero';
import CarCard from '@/components/CarCard';
import type { CarProps } from '@/lib/models/Cars';
import Image from 'next/image';

function Home() {
  const [allCars, setAllCars] = useState<CarProps[]>([]);

  const [searchCar, setSearchCar] = useState<string>('');
  const [searchedCars, setSearchedCars] = useState<CarProps[]>([]);

  const fetchCars = async () => {
    const response = await fetch('/api/cars');
    const data = await response.json();
    setAllCars(data);
  };
  useEffect(() => {
    fetchCars();
  }, []);

  const filterPrompts = (searchtext: string) => {
    const regex = new RegExp(searchtext, 'i');
    return allCars.filter((car) => {
      return regex.test(car.make);
    });
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchCar(event.target.value);
    const searchResult = filterPrompts(event.target.value);
    setSearchedCars(searchResult);
  };

  const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars;

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
              src="/car-logo.svg"
              width={20}
              height={20}
              className="absolute left-3"
              alt="Car logo"
            />
            <input
              className="search-manufacturer__input"
              placeholder="Volkswagen"
              value={searchCar}
              onChange={handleSearchChange}
            />
          </div>
        </div>
        {searchCar ? (
          <section>
            <div id="cars" className="home__cars-wrapper">
              {searchedCars.map((car: CarProps) => (
                <CarCard key={car._id} car={car} />
              ))}
            </div>
          </section>
        ) : (
          <section>
            <div className="home__cars-wrapper">
              {isDataEmpty ? (
                <Image
                  src={'/images/loading.gif'}
                  alt="Loading"
                  width={30}
                  height={30}
                  unoptimized
                />
              ) : (
                allCars.map((car) => <CarCard key={car._id} car={car} />)
              )}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

export default Home;
