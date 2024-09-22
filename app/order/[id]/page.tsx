'use server';

import { connectToDB } from '@/lib';
import { Order } from '@/models/Order';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import OrderConfirmation from '@/components/Order/OrderConfirmation';

const OrderPage = async ({ params }: { params: { id: string } }) => {
  const cookiesStore = cookies();
  const token = cookiesStore.get('orderToken');
  await connectToDB();

  if (!token && !params.id) {
    redirect('/');
  }

  const findOrder = JSON.parse(
    JSON.stringify(await Order.findOne({ token: token?.value }))
  );

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
