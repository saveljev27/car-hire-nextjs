'use client';

import { removeItem } from '@/shared/redux';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { orderCard } from '@/shared/redux';
import { findAndDeleteOrder } from '@/app/actions';
import { useState } from 'react';
import { Modal } from './Modal';
import { CustomButton } from './CustomButton';

interface CancelProps {
  title: string;
  orderId?: string;
}

export const Cancel = ({ title, orderId }: CancelProps) => {
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