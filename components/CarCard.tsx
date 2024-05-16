'use client';

import { useState } from 'react';
import Image from 'next/image';

import CustomButton from './CustomButton';
import CarDetails from './CarDetails';

import { addItem } from '@/redux/order/slice';
import { useDispatch } from 'react-redux';
import { CarProps } from '@/lib/models/Cars';
import { calculateCarRent } from '@/utils';
import Link from 'next/link';

interface CarCard {
  car: CarProps;
}

const CarCard = ({ car }: CarCard) => {
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
  } = car;

  const [isOpen, setIsOpen] = useState(false);

  const carRent = calculateCarRent(city_consumption, year);

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
          {carRent}
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
            <Image
              src="/steering-wheel.svg"
              width={20}
              height={20}
              alt="steering wheel"
            />
            <p className="text-[14px]">
              {transmission === 'a' ? 'Automatic' : 'Manual'}
            </p>
          </div>
          <div className="flex flex-col justify-center items-center gap-2">
            <Image src="/tire.svg" width={20} height={20} alt="tire" />
            <p className="text-[14px]">{drive.toUpperCase()}</p>
          </div>
          <div className="flex flex-col justify-center items-center gap-2">
            <Image src="/gas.svg" width={20} height={20} alt="gas" />
            <p className="text-[14px]">{city_consumption} L/100 KM</p>
          </div>
        </div>
        <div className="car-card__btn-container">
          <CustomButton
            title="View"
            containerStyles="w-full py-[8px] rounded-full bg-primary-red"
            textStyles="text-white text-[14px] leading-[17px] font-bold"
            rightIcon="/right-arrow.svg"
            handleClick={() => setIsOpen(true)}
          />
          <>
            <Link href="/order">
              <CustomButton
                title="Book"
                containerStyles="w-full py-[8px] rounded-full bg-green-500"
                textStyles="text-white text-[14px] leading-[17px] font-bold"
                rightIcon="/cart.svg"
                handleClick={onClickAddButton}
              />
            </Link>
          </>
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

export default CarCard;
