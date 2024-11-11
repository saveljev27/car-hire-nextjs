import { findCars } from '@/app/actions';
import { CarList, Container } from '@/shared/components';
import { CustomButton, PageHeader } from '@/shared/components/UI';
import Link from 'next/link';

export default async function AllCars() {
  const { cars, count } = await findCars({}, true);

  return (
    <Container flexCol>
      <PageHeader>All cars ({count})</PageHeader>
      <div className="flex gap-3 justify-center">
        <Link href="/admin-panel/">
          <CustomButton
            title="Back to admin panel"
            containerStyles="showmore__btn"
          />
        </Link>
        <Link href="/admin-panel/all-cars/new">
          <CustomButton title="Add car" containerStyles="showmore__btn" />
        </Link>
      </div>
      <CarList cars={cars} count={count} />
    </Container>
  );
}
