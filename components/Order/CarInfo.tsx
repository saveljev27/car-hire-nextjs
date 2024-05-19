'use client';

import { useSelector, useDispatch } from 'react-redux';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { orderCard } from '@/redux/order/selectors';
import { removeItem } from '@/redux/order/slice';

const CarInfo = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { items } = useSelector(orderCard);
  const [data] = items;

  const onClickRemove = () => {
    if (window.confirm('Are you sure?')) {
      dispatch(removeItem(data._id));
      router.push('/');
    }
  };

  if (!items.length) {
    return <div>No information</div>;
  }

  return (
    <>
      <h1 className="subtitle__text">Car Info</h1>
      {items.map((model, index) => (
        <div className="car__info" key={index}>
          <div>
            <p className="car__text">
              <span className="font-bold">Make: </span> {model.make}
            </p>
            <p className="car__text">
              <span className="font-bold">Model: </span>
              {model.model}
            </p>
            <p className="car__text">
              <span className="font-bold">Year: </span> {model.year}
            </p>
            <p className="car__text">
              <span className="font-bold">Drive: </span> {model.drive}
            </p>
            <p className="car__text">
              <span className="font-bold">City Consumption: </span>
              {model.city_consumption}
            </p>
            <p className="car__text">
              <span className="font-bold">Transmission: </span>
              {model.transmission}
            </p>
            <p className="car__text">
              <span className="font-bold">Fuel Type: </span>
              {model.fuel_type}
            </p>
            <p className="car__text">
              <span className="font-bold">Seats: </span>
              {model.seats}
            </p>
          </div>
          <div>
            <Image src={model.image} alt="Car" width={400} height={160}></Image>
          </div>
        </div>
      ))}
      <button
        className="text-right hover:text-primary-red"
        onClick={onClickRemove}
      >
        Cancel booking
      </button>
    </>
  );
};

export default CarInfo;
