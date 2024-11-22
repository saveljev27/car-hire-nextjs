'use client';

import { useSelector } from 'react-redux';
import Image from 'next/image';
import { orderCard } from '@/shared/redux';
import { CarInfoSkeleton } from './CarInfoSkeleton';
import { useEffect, useState } from 'react';
import { CarProps } from '@/types';

export const CarInfo = () => {
  const [carItems, setCarItems] = useState<CarProps[]>([]);
  const { items } = useSelector(orderCard);

  useEffect(() => {
    if (items && items.length > 0) {
      setCarItems(items);
    }
  }, [items]);

  return (
    <div className="section">
      <h1 className="subtitle__text">1. Car Information</h1>
      {carItems.length === 0 ? (
        <CarInfoSkeleton />
      ) : (
        <>
          {items.map((model, index) => (
            <div className="flex flex-col gap-3" key={index}>
              <div className="flex justify-center">
                <Image
                  src={model.image}
                  alt="Car"
                  width={150}
                  height={160}
                ></Image>
              </div>
              <div className="grid grid-cols-2 gap-6 bg-primary-red p-3 rounded-md text-white max-sm:grid-cols-1">
                <p className="car__text">
                  Make:<span className="font-bold ml-1">{model.make}</span>
                </p>
                <p className="car__text">
                  Model:
                  <span className="font-bold ml-1">{model.model}</span>
                </p>
                <p className="car__text">
                  Year:<span className="font-bold ml-1">{model.year}</span>
                </p>
                <p className="car__text">
                  Drive:<span className="font-bold ml-1">{model.drive}</span>
                </p>
                <p className="car__text">
                  Consumption:
                  <span className="font-bold ml-1">
                    {model.city_consumption}
                    <span className="normal-case">L/100 km</span>
                  </span>
                </p>
                <p className="car__text">
                  Transmission:
                  <span className="font-bold ml-1">{model.transmission}</span>
                </p>
                <p className="car__text">
                  Fuel Type:
                  <span className="font-bold ml-1">{model.fuel_type}</span>
                </p>
                <p className="car__text">
                  Seats:
                  <span className="font-bold ml-1">{model.seats}</span>
                </p>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};
