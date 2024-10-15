'use client';

import { ChangeEvent } from 'react';
import { Select } from '@headlessui/react';

import { CustomFilterProps } from '@/types';
import { useRouter } from 'next/navigation';
import { updateSearchParams } from '../lib';

export function Filter({ title, options }: CustomFilterProps) {
  const router = useRouter();

  const handleUpdateParams = (e: ChangeEvent<HTMLSelectElement>) => {
    const newPathName = updateSearchParams(title, e.target.value.toLowerCase());
    router.push(newPathName, { scroll: false });
  };

  return (
    <div className="w-fit">
      <Select
        name="status"
        onChange={(e) => handleUpdateParams(e)}
        className="custom-filter__btn"
      >
        {options.map((option) => (
          <option key={option.title} value={option.title}>
            {option.title}
          </option>
        ))}
      </Select>
    </div>
  );
}
