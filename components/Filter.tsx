'use client';

import { Fragment, useState } from 'react';
import Image from 'next/image';
import { Listbox, Transition } from '@headlessui/react';

import { CustomFilterProps } from '@/types';

export default function CustomFilter({
  options,
  onFilterUpdate,
}: CustomFilterProps) {
  const [selected, setSelected] = useState(options[0]);

  const handleUpdateParams = async (e: { title: string; value: string }) => {
    const searchQuery = e.value.toLowerCase();
    const queryParam = new URLSearchParams({ filter: searchQuery }).toString();
    try {
      const data = await fetch(`/api/cars?${searchQuery ? queryParam : ''}`);
      const cars = await data.json();
      onFilterUpdate(cars);
    } catch (error) {}
  };

  return (
    <div className="w-fit">
      <Listbox
        value={selected}
        onChange={(e) => {
          setSelected(e);
          handleUpdateParams(e);
        }}
      >
        <div className="relative w-fit z-10">
          <Listbox.Button className="custom-filter__btn">
            <span className="block truncate">{selected.title}</span>
            <Image
              src="/images/chevron-up-down.svg"
              width={20}
              height={20}
              className="ml-4 object-contain"
              alt="chevron_up-down"
            />
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="custom-filter__options">
              {options.map((option) => (
                <Listbox.Option
                  key={option.title}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 px-4 ${
                      active ? 'bg-primary-red text-white' : 'text-gray-900'
                    }`
                  }
                  value={option}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {option.title}
                      </span>
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
