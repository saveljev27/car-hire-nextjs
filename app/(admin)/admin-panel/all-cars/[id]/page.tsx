import { findCar } from '@/app/actions';
import { Container } from '@/shared/components';
import { CarInfo } from '@/shared/components/Admin/CarInfo';

export default async function SingeCarPage({
  params,
}: {
  params: { id: string };
}) {
  const car = await findCar(params.id);

  return (
    <Container>
      <CarInfo car={car} carId={params.id} />
    </Container>
  );
}
