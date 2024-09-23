'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

import { BsFillFuelPumpFill } from 'react-icons/bs';
import SearchBar from '@/components/SearchBar';
import Filter from '@/components/Filter';
import Hero from '@/components/Hero';
import CarCard from '@/components/CarCard';
import { CarProps } from '@/types';
import { fuels } from '@/constants';

function Home() {
  const [allCars, setAllCars] = useState<CarProps[]>([]);
  const [displayedCars, setDisplayedCars] = useState<CarProps[]>([]);

  const fetchCars = async () => {
    const response = await fetch('/api/cars');
    const data = await response.json();
    setAllCars(data);
  };

  const handleSearch = async (searchedCars: CarProps[]) => {
    setDisplayedCars(searchedCars);
  };

  const handleFilterUpdate = async (filteredCars: CarProps[]) => {
    setDisplayedCars(filteredCars);
  };

  useEffect(() => {
    fetchCars();
  }, []);

  return (
    <main className="overflow-hidden">
      <Hero />
      <div className="mt-12 padding-x padding-y max-width" id="discover">
        <div className="home__text-container">
          <h1 className="text-4x1 font-extrabold">Catalogue</h1>
          <p>Investigate these ideal cars that might suit your style.</p>
        </div>
        <div className="home__filters">
          <SearchBar onSearch={handleSearch} />
          <div className="home__filter-container">
            <BsFillFuelPumpFill />
            <Filter
              title="fuel"
              options={fuels}
              onFilterUpdate={handleFilterUpdate}
            />
          </div>
        </div>
        {displayedCars && displayedCars.length > 0 ? (
          <section>
            <div id="cars" className="home__cars-wrapper">
              {displayedCars.map((car: CarProps) => (
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
