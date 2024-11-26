import { findCars } from '@/app/actions/car';
import { CarList, Container } from '@/shared/components';
import {
  AddCarBtn,
  AdminBtn,
  BackBtn,
} from '@/shared/components/Admin/NavButtons';
import { PageHeader } from '@/shared/components/UI';

export default async function AllCars() {
  const { cars, count } = await findCars({}, true);

  return (
    <Container flexCol>
      <PageHeader>All cars ({count})</PageHeader>
      <div className="flex gap-3 justify-center">
        <BackBtn />
        <AdminBtn />
        <AddCarBtn />
      </div>
      <CarList cars={cars} count={count} admin />
    </Container>
  );
}
