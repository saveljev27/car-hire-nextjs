'use client';
import { useRouter } from 'next/navigation';
import { updateSearchParams } from '../../lib';

export const Showmore = ({ limit }: { limit: number }) => {
  const router = useRouter();
  const handleShowMore = () => {
    const checkLimit = limit ? limit : 8;
    const nextShowLimit = checkLimit + 8;

    const newPath = updateSearchParams('limit', `${nextShowLimit.toString()}`);
    router.push(newPath, { scroll: false });
  };

  return (
    <div className="text-center justify-center mt-8">
      <button onClick={handleShowMore} className="interface_btn">
        Show more
      </button>
    </div>
  );
};
