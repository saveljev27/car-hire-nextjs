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
      localStorage.removeItem('car');
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
            <Image
              src={model.image}
              alt="Car"
              width={400}
              height={160}
              className="max-[1000px]:m-auto"
            ></Image>
          </div>
          <div className="grid grid-cols-2 gap-6 bg-primary-red p-3 rounded-md text-white">
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
      <div className="flex mt-2 justify-start max-[930px]:justify-center">
        <button
          className="text-right hover:text-primary-red"
          onClick={onClickRemove}
        >
          Cancel booking
        </button>
      </div>
    </>
  );
};

export default CarInfo;
