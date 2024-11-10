import { CarCard, Container } from '@/shared/components';
import { findCars } from '@/shared/lib/find-cars';
import { CarProps } from '@/types';

export default async function CarList() {
  const { cars, count } = await findCars({}, true);

  return (
    <Container>
      <div>
        <h1 className="page__title">Car List</h1>
        <section>
          <div className="home__cars-wrapper">
            {cars.length > 0 ? (
              cars.map((car: CarProps) => (
                <CarCard key={car._id} car={car} admin />
              ))
            ) : (
              <div className="row min-h-[40vh]">
                <h1>No cars found</h1>
              </div>
            )}
          </div>
        </section>
      </div>
    </Container>
  );
}
