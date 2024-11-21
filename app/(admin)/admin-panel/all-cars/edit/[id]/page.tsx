import { findCar } from '@/app/actions';
import { Container } from '@/shared/components';
import { CarEdit } from '@/shared/components/Admin/CarEdit';

export default async function SingeCarPage({
  params,
}: {
  params: { id: string };
}) {
  const car = await findCar(params?.id);
  return (
    <Container>
      <CarEdit car={car} />
    </Container>
  );
}
