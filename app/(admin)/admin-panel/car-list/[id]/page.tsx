import { findCar, updateCarInfo } from '@/app/actions';
import { Container, Input } from '@/shared/components';
import { CarInfo } from '@/shared/components/Admin/CarInfo';

import Image from 'next/image';

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
