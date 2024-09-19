import { CarProps } from '@/models/Cars';

export const getCarFromLocalStorage = () => {
  if (typeof window !== 'undefined') {
    const data = localStorage.getItem('car');
    const items = data ? JSON.parse(data) : [];

    return {
      items: items as CarProps[],
    };
  } else {
    return {
      items: [] as CarProps[],
    };
  }
};
