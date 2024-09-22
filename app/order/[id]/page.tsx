'use server';

import OrderConfirmation from '@/components/Order/OrderConfirmation';
import { findConfirmationOrder } from '@/actions';

const OrderPage = async ({ params }: { params: { id: string } }) => {
  const findOrder = await findConfirmationOrder({ params });

  return (
    <div className="flex-1 pt-36 pb-36 padding-x min-h-[100vh]">
      <div className="flex justify-center flex-col w-full mx-auto mt-8">
        <h1 className="page__title">Confirmation Page</h1>
        <div className="section">
          <OrderConfirmation findOrder={findOrder} params={params} />
        </div>
      </div>
    </div>
  );
};

export default OrderPage;