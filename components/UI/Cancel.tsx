'use client';

import { removeItem } from '@/redux/order/slice';
import CustomButton from '../CustomButton';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { orderCard } from '@/redux/order/selectors';
import { findAndDeleteOrder } from '@/app/actions';
import Modal from './Modal';
import { useState } from 'react';

interface CancelProps {
  title: string;
  orderId?: string;
}

const Cancel = ({ title, orderId }: CancelProps) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const { items } = useSelector(orderCard);
  const [data] = items;

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleConfirmCancel = async () => {
    try {
      dispatch(removeItem(data._id));
      localStorage.removeItem('car');
      if (orderId) {
        findAndDeleteOrder(orderId);
      }
    } catch (error) {
      console.error('Error removing order:', error);
    } finally {
      setIsModalVisible(false);
      router.push('/');
    }
  };

  return (
    <>
      <CustomButton
        title={`Cancel ${title}`}
        containerStyles=" py-[8px] mt-6 rounded bg-gray-400"
        textStyles="text-white"
        handleClick={handleOpenModal}
      />

      <Modal
        isVisible={isModalVisible}
        title={title}
        onClose={handleCloseModal}
        onConfirm={handleConfirmCancel}
      />
    </>
  );
};

export default Cancel;
