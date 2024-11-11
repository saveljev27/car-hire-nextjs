import { Container } from '@/shared/components';

export default async function SingleOrderPage({
  params,
}: {
  params: { id: string };
}) {
  return <Container>{JSON.stringify(params)}</Container>;
}
