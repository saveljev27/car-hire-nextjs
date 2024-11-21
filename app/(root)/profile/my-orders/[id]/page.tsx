import { findOrder } from '@/app/actions';
import { Container } from '@/shared/components';
import { BookingInfo } from '@/shared/components/Profile/BookingInfo';
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
          <BookingInfo order={order} />
        </>
      ) : (
        <div>No Order Found</div>
      )}
    </Container>
  );
}
