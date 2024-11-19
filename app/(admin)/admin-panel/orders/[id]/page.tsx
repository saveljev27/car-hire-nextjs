import { findOrder } from '@/app/actions';
import { Container } from '@/shared/components';
import { AdminBtn, OrderListBtn } from '@/shared/components/Admin/NavButtons';
import { OrderInfo } from '@/shared/components/Profile/OrderInfo';
import { PageHeader } from '@/shared/components/UI';

export default async function AdminSingleOrderPage({
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
          <div className="flex gap-3 justify-center mb-4">
            <OrderListBtn />
            <AdminBtn />
          </div>
          <OrderInfo order={order} admin />
        </>
      ) : (
        <div>No Order Found</div>
      )}
    </Container>
  );
}
