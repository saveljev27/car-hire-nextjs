import { findCar } from '@/app/actions/car';
import { Container } from '@/shared/components';
import { EditCarForm } from '@/shared/components/Admin/EditCarForm';
import {
  AdminBtn,
  BackBtn,
  CarListBtn,
} from '@/shared/components/Admin/NavButtons';
import { PageHeader } from '@/shared/components/UI';

export default async function EditCar({ params }: { params: { id: string } }) {
  const car = await findCar(params?.id);
  return (
    <Container>
      <div className="flex flex-col justify-center items-center">
        <PageHeader>Edit Car {car?._id}</PageHeader>
        <div className="flex gap-3 justify-center mb-4">
          <BackBtn />
          <CarListBtn />
          <AdminBtn />
        </div>
        <EditCarForm car={car} />
      </div>
    </Container>
  );
}
