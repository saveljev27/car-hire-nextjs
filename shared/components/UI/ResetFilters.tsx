'use client';
import { useRouter } from 'next/navigation';
import { updateSearchParams } from '../../lib';

export const ResetFilters = () => {
  const router = useRouter();
  const handleReset = () => {
    const newPath = updateSearchParams('all', '');
    console.log(newPath);
    router.push(newPath, { scroll: false });
  };

  return (
    <div className="ml-4">
      <button onClick={handleReset} className="custom-filter-reset__btn">
        Reset
      </button>
    </div>
  );
};
