'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import Image from 'next/image';
import Link from 'next/link';
import { addItem } from '@/shared/redux';

import { CarProps } from '@/types';
import { CarDetails } from './CarDetails';
import {
  CustomButton,
  GiGearStick,
  IoSpeedometerSharp,
  PiSeatFill,
} from './UI';

interface CarCard {
  car: CarProps;
  admin?: boolean;
}

export const CarCard = ({ car, admin }: CarCard) => {
  const {
    _id,
    city_consumption,
    year,
    make,
    model,
    transmission,
    drive,
    fuel_type,
    image,
    seats,
    price,
  } = car;

  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();

  const onClickAddButton = () => {
    const order = {
      _id,
      year,
      make,
      model,
      transmission,
      drive,
      fuel_type,
      image,
      seats,
      city_consumption,
      price,
    };
    dispatch(addItem(order));
  };

  return (
    <div className="car-card group">
      <div className="car-card__content">
        <h2 className="car-card__content-title">
          {make} {model}
        </h2>
        <p className="flex mt-6 text-[32px] font-extrabold">
          <span className="self-start text-[14px] font-semibold">€</span>
          {price}
          <span className="self-end text-[14px] font-medium">/day</span>
        </p>
      </div>

      <div className="relative w-full h-40 my-3 object-contain">
        <Image
          src={image}
          alt={model}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-contain"
        />
      </div>
      <div className="relative flex w-full mt-2">
        <div className="flex w-full group-hover:invisible justify-between text-gray">
          <div className="flex flex-col justify-center items-center gap-2">
            <GiGearStick size={18} />
            <p className="text-[12px]">
              {transmission === 'automatic' ? 'Automatic' : 'Manual'}
            </p>
          </div>
          <div className="flex flex-col justify-center items-center gap-2">
            <PiSeatFill size={18} />
            <p className="text-[12px]">{seats} seats</p>
          </div>
          <div className="flex flex-col justify-center items-center gap-2">
            <IoSpeedometerSharp size={18} />
            <p className="text-[12px]">{city_consumption} L/100 km</p>
          </div>
        </div>
        <div className="car-card__btn-container">
          <CustomButton
            title="View"
            containerStyles="w-full py-[8px] rounded-full bg-primary-red"
            textStyles="text-white text-[14px] leading-[17px] font-bold"
            handleClick={() => setIsOpen(true)}
          />
          {admin ? (
            <Link href={`/admin-panel/all-cars/edit/${_id}`}>
              <CustomButton
                title="Edit"
                containerStyles="w-full py-[8px] rounded-full min-w-[180px] bg-green-500"
                textStyles="text-white text-[14px] leading-[17px] font-bold"
                handleClick={onClickAddButton}
              />
            </Link>
          ) : (
            <Link href={`/order`}>
              <CustomButton
                title="Book"
                containerStyles="w-full py-[8px] rounded-full min-w-[180px] bg-green-500"
                textStyles="text-white text-[14px] leading-[17px] font-bold"
                handleClick={onClickAddButton}
              />
            </Link>
          )}
        </div>
      </div>
      <CarDetails
        isOpen={isOpen}
        closeModal={() => setIsOpen(false)}
        car={car}
      />
    </div>
  );
};
