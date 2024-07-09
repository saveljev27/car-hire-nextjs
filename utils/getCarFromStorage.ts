import { CarProps } from '@/lib/models/Cars';

const getCarFromStorage = () => {
  if (typeof window !== 'undefined') {
    const data = localStorage.getItem('car');
    const items = data ? JSON.parse(data) : [];

    return {
      items: items as CarProps[],
    };
  } else {
    // Возвращаем пустое значение, если localStorage недоступен (например, на сервере)
    return {
      items: [] as CarProps[],
    };
  }
};

export default getCarFromStorage;
