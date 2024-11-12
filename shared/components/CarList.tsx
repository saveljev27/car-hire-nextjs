import { CarProps } from '@/types';
import { CarCard } from './CarCard';

interface CarListProps {
  cars: CarProps[];
  count?: number;
  admin?: boolean;
}

export const CarList = ({ cars, count, admin = false }: CarListProps) => {
  return (
    <section>
      <div className="home__cars-wrapper">
        {cars.length > 0 ? (
          cars.map((car: CarProps) => (
            <CarCard key={car._id} car={car} admin={admin} />
          ))
        ) : (
          <div className="row min-h-[40vh]">
            <h1>No cars found</h1>
          </div>
        )}
      </div>
    </section>
  );
};
