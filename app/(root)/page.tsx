import { CarProps, SearchParams } from '@/types';
import { fuels, bodyClass, transmissions } from '@/shared/constants';
import { CarCard, CarList, Filter, Hero, SearchBar } from '@/shared/components';
import {
  BsFillFuelPumpFill,
  FaCarAlt,
  GiGearStick,
} from '@/shared/components/UI';
import { Showmore } from '@/shared/components/UI/ShowMore';
import { ResetFilters } from '@/shared/components/UI/ResetFilters';
import { findCars } from '../actions';

export default async function Home({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { cars, count } = await findCars(searchParams);
  const limit = searchParams.limit ? parseInt(searchParams.limit) : 8;

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
            <div className="home__filter-element">
              <BsFillFuelPumpFill />
              <Filter title="fuel" options={fuels} />
            </div>
            <div className="home__filter-element">
              <FaCarAlt />
              <Filter title="class" options={bodyClass} />
            </div>
            <div className="home__filter-element">
              <GiGearStick />
              <Filter title="transmission" options={transmissions} />
            </div>
            <ResetFilters />
          </div>
        </div>
        <CarList cars={cars} count={count} />
        {count > cars.length && <Showmore limit={limit} />}
      </div>
    </main>
  );
}
