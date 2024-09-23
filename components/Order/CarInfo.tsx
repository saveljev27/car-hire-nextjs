'use client';

import { useSelector, useDispatch } from 'react-redux';
import Image from 'next/image';
import { orderCard } from '@/redux/order/selectors';

const CarInfo = () => {
  const { items } = useSelector(orderCard);

  if (!items.length) {
    return <div>No information</div>;
  }

  return (
    <>
      <h1 className="subtitle__text">Car Information</h1>
      {items.map((model, index) => (
        <div className="car__info" key={index}>
          <div>
            <Image
              src={model.image}
              alt="Car"
              width={400}
              height={160}
              className="max-[1000px]:m-auto"
            ></Image>
          </div>
          <div className="grid grid-cols-2 gap-6 bg-primary-red p-3 rounded-md text-white max-md:grid-cols-1">
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
  );
};

export default CarInfo;
