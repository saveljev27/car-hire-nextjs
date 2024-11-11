import { CarProps } from '@/types';
import { CarCard } from './CarCard';

interface CarListProps {
  cars: CarProps[];
  count?: number;
}

export const CarList = ({ cars, count }: CarListProps) => {
  return (
    <section>
      <div className="home__cars-wrapper">
        {cars.length > 0 ? (
          cars.map((car: CarProps) => <CarCard key={car._id} car={car} admin />)
        ) : (
          <div className="row min-h-[40vh]">
            <h1>No cars found</h1>
          </div>
        )}
      </div>
    </section>
  );
};
