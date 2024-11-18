import { Container } from '@/shared/components';
import { CarEdit } from '@/shared/components/Admin/CarEdit';

export default async function SingeCarPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <Container>
      <CarEdit carId={params.id} />
    </Container>
  );
}
