import { deleteCar } from '@/app/actions/car';
import { CarProps } from '@/types';
import { useRouter } from 'next/navigation';

export const useCar = (car?: CarProps) => {
  const router = useRouter();

  const handleDelete = async ({ id }: { id: string }) => {
    const confirm = window.confirm('Are you sure you want to delete this car?');
    if (!confirm) return;
    const response = await deleteCar(id);
    if (response.success) {
      router.replace('/admin-panel/all-cars');
    }
  };

  const carNewFields = {
    city_consumption: { value: '', type: 'number' },
    highway_consumption: { value: '', type: 'number' },
    combination_consumption: { value: '', type: 'number' },
    seats: { value: '', type: 'number' },
    displacement: { value: '', type: 'number' },
    price: { value: '', type: 'number' },
    make: { value: '', type: 'text' },
    model: { value: '', type: 'text' },
    year: { value: '', type: 'number' },
  };

  const carFields = {
    city_consumption: { value: car?.city_consumption || '', type: 'number' },
    highway_consumption: {
      value: car?.highway_consumption || '',
      type: 'number',
    },
    combination_consumption: {
      value: car?.combination_consumption || '',
      type: 'number',
    },
    seats: { value: car?.seats || '', type: 'number' },
    displacement: { value: car?.displacement || '', type: 'number' },
    price: { value: car?.price || '', type: 'number' },
    make: { value: car?.make || '', type: 'text' },
    model: { value: car?.model || '', type: 'text' },
    year: { value: car?.year || '', type: 'number' },
  };

  const carSelectFields = {
    drive: car?.drive || '',
    fuel_type: car?.fuel_type || '',
    class: car?.class || '',
    transmission: car?.transmission || '',
  };

  return {
    carNewFields,
    carFields,
    carSelectFields,
    handleDelete,
  };
};
