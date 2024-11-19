import { CarProps } from '@/types';

export const useCar = (car?: CarProps) => {
  const carNewFields = {
    city_consumption: '',
    highway_consumption: '',
    combination_consumption: '',
    seats: '',
    displacement: '',
    price: '',
    make: '',
    model: '',
    year: '',
    image: '',
  };

  const carFields = {
    city_consumption: car?.city_consumption || '',
    highway_consumption: car?.highway_consumption || '',
    combination_consumption: car?.combination_consumption || '',
    seats: car?.seats || '',
    displacement: car?.displacement || '',
    price: car?.price || '',
    make: car?.make || '',
    model: car?.model || '',
    year: car?.year || '',
    image: car?.image || '',
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
  };
};
