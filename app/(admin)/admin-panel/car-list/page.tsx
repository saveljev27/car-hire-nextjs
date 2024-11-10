import { CarCard, Container } from '@/shared/components';
import { CustomButton } from '@/shared/components/UI';
import { findCars } from '@/shared/lib/find-cars';
import { CarProps } from '@/types';
import Link from 'next/link';

export default async function CarList() {
  const { cars, count } = await findCars({}, true);

  return (
    <Container>
      <div>
        <h1 className="page__title">Car List</h1>
        <div className="flex gap-3 justify-center">
          <Link href="/admin-panel/">
            <CustomButton
              title="Back to admin panel"
              containerStyles="showmore__btn"
            />
          </Link>
          <Link href="/admin-panel/car-list/new">
            <CustomButton title="Add car" containerStyles="showmore__btn" />
          </Link>
        </div>
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
