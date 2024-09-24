import { BsFillFuelPumpFill } from 'react-icons/bs';
import { FaCarAlt } from 'react-icons/fa';
import { CarProps } from '@/types';
import { fuels, bodyClass } from '@/shared/constants';
import { CarCard, Filter, Hero, SearchBar } from '@/shared/components';
import { SearchParams } from '@/shared/lib/find-cars';
import { findCars } from '@/shared/lib/find-cars';

export default async function Home({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const allCars = await findCars(searchParams);

  return (
    <main className="overflow-hidden">
      <Hero />
      <div className="mt-12 padding-x padding-y max-width" id="discover">
        <div className="home__text-container">
          <h1 className="text-4x1 font-extrabold">Catalogue</h1>
          <p>Investigate these ideal cars that might suit your style.</p>
        </div>
        <div className="home__filters">
          <SearchBar />
          <div className="home__filter-container">
            <BsFillFuelPumpFill />
            <Filter title="fuel" options={fuels} />
            <FaCarAlt />
            <Filter title="class" options={bodyClass} />
          </div>
        </div>

        <section>
          <div className="home__cars-wrapper">
            {allCars.length > 0 ? (
              allCars.map((car: CarProps) => (
                <CarCard key={car._id} car={car} />
              ))
            ) : (
              <div className="row min-h-[40vh]">
                <h1>No cars found</h1>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
