import { CarProps } from '@/lib/models/Cars';

const getCarFromStorage = () => {
  const data = localStorage.getItem('car');
  const items = data ? JSON.parse(data) : [];

  return {
    items: items as CarProps[],
  };
};

export default getCarFromStorage;
