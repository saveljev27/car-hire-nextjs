import { findOrder } from '@/app/actions';
import { Container } from '@/shared/components';
import { OrderInfo } from '@/shared/components/Profile/OrderInfo';
import { PageHeader } from '@/shared/components/UI';

export default async function SingleOrderPage({
  params,
}: {
  params: { id: string };
}) {
  const order = await findOrder(params?.id);

  return (
    <Container flexCol>
      {order ? (
        <>
          <PageHeader>Order: {order._id}</PageHeader>
          <div className="flex gap-3 justify-center mb-4"></div>
          <OrderInfo order={order} />
        </>
      ) : (
        <div>No Order Found</div>
      )}
    </Container>
  );
}
