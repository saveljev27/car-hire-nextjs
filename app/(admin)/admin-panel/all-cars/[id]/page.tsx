import { Container } from '@/shared/components';
import { CarInfo } from '@/shared/components/Admin/CarInfo';

export default async function SingeCarPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <Container>
      <CarInfo carId={params.id} />
    </Container>
  );
}
