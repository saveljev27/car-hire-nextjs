import { createCar, deleteCar, updateCarData } from '@/app/actions/car';
import { CarProps } from '@/types';
import { useRouter } from 'next/navigation';
import { transmissions, bodyClass, fuels, drive } from '@/shared/constants';
import { useRef, useState } from 'react';
import { useFormState } from 'react-dom';
import { CarContentProps } from '../components/Admin/CarContent';

export const useCar = (
  car?: CarProps,
  validation?: CarContentProps['validation']
) => {
  const router = useRouter();

  const fileRef = useRef<HTMLInputElement>(null);

  const [file, setFile] = useState<File>();
  const [carUrl, setCarUrl] = useState('');
  const [uploading, setUploading] = useState(false);

  const [updateState, handleUpdate] = useFormState(updateCarData, null);
  const [newCarState, handleNewCar] = useFormState(createCar, null);

  const validationData = validation?.errors;
  const validationErrors =
    validationData &&
    Object.entries(validationData).map(([key, value]) => ({
      id: key,
      message: value,
    }));
  const imageValidation = validationErrors?.find(
    (error) => error.id === 'image'
  )?.message._errors;

  const uploadFile = async () => {
    try {
      if (!file) {
        alert('No file selected');
        return;
      }

      setUploading(true);
      const data = new FormData();
      data.set('file', file);
      const uploadRequest = await fetch('/api/files', {
        method: 'POST',
        body: data,
      });
      const signedUrl = await uploadRequest.json();
      setCarUrl(signedUrl);
      setUploading(false);
    } catch (e) {
      console.log(e);
      setUploading(false);
      alert('Trouble uploading file');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target?.files?.[0]);
  };

  const handleDelete = async ({ id }: { id: string }) => {
    const confirm = window.confirm('Are you sure you want to delete this car?');
    if (!confirm) return;
    const response = await deleteCar(id);
    if (response.success) {
      router.replace('/admin-panel/all-cars');
    }
  };

  const carFields = {
    city_consumption: {
      value: car?.city_consumption || '',
      type: 'number',
      label: 'City consumption',
      placeholder: '10',
    },
    highway_consumption: {
      value: car?.highway_consumption || '',
      type: 'number',
      label: 'Highway consumption',
      placeholder: '7',
    },
    combination_consumption: {
      value: car?.combination_consumption || '',
      type: 'number',
      label: 'Combination consumption',
      placeholder: '8',
    },
    seats: {
      value: car?.seats || '',
      type: 'number',
      label: 'Seats',
      placeholder: '4',
    },
    displacement: {
      value: car?.displacement || '',
      type: 'number',
      label: 'Displacement',
      placeholder: '2',
    },
    price: {
      value: car?.price || '',
      type: 'number',
      label: 'Price',
      placeholder: '59',
    },
    make: {
      value: car?.make || '',
      type: 'text',
      label: 'Make',
      placeholder: 'Honda',
    },
    model: {
      value: car?.model || '',
      type: 'text',
      label: 'Model',
      placeholder: 'Civic',
    },
    year: {
      value: car?.year || '',
      type: 'number',
      label: 'Year',
      placeholder: '2022',
    },
  };

  const carSelectFields = {
    drive: { options: drive, value: car?.drive || '', title: 'drive' },
    fuel_type: {
      options: fuels,
      value: car?.fuel_type || '',
      title: 'fuel_type',
    },
    class: { options: bodyClass, value: car?.class || '', title: 'class' },
    transmission: {
      options: transmissions,
      value: car?.transmission || '',
      title: 'transmission',
    },
  };

  return {
    carFields,
    carSelectFields,
    fileRef,
    carUrl,
    uploading,
    newCarState,
    updateState,
    validationErrors,
    imageValidation,
    uploadFile,
    handleNewCar,
    handleUpdate,
    handleChange,
    handleDelete,
  };
};
