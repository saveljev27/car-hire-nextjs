'use client';

import { ChangeEvent, FormEventHandler, useEffect, FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { clearItems } from '@/redux/order/slice';
import { useRouter } from 'next/navigation';

import Input from '../Input';
import CustomButton from '../CustomButton';
import {
  calculateCarRent,
  getSumFromDate,
  todayDate,
  updateDateFormat,
} from '@/utils';

import { UserInfo } from '@/lib/models/User';
import { orderCard } from '@/redux/order/selectors';
import OrderEmpty from './OrderEmpty';
import Alert from '../UI/Alert';

type Props = {
  profileInfo: UserInfo | null;
};

const ClientInputs: FC<Props> = ({ profileInfo }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { items } = useSelector(orderCard);
  const formattedToday = todayDate();

  const [name, setName] = useState(profileInfo?.name || '');
  const [orderEmail, setOrderEmail] = useState(profileInfo?.email || '');
  const [phone, setPhone] = useState(profileInfo?.phone || '');
  const [pickupLocation, setPickupLocation] = useState('');
  const [pickupDate, setPickupDate] = useState('');
  const [pickupTime, setPickupTime] = useState('');
  const [dropDate, setDropDate] = useState('');
  const [dropTime, setDropTime] = useState('');
  const [rentPerDay, setRentPerDay] = useState<number>(0);
  const [rentValue, setRentValue] = useState<number>(0);
  const [rentDays, setRentDays] = useState<number>(0);
  const [carMake, setCarMake] = useState('');
  const [carModel, setCarModel] = useState('');

  useEffect(() => {
    if (pickupDate && dropDate) {
      const days = getSumFromDate(pickupDate, dropDate);
      const { year, city_consumption, make, model } = items[0];
      const pricePerDay = parseFloat(calculateCarRent(city_consumption, year));
      setRentDays(days);
      setRentPerDay(pricePerDay);
      setCarMake(make);
      setCarModel(model);
    }
    const calculateTotalPrice = rentDays * rentPerDay;
    if (!isNaN(calculateTotalPrice)) setRentValue(calculateTotalPrice);
  }, [pickupDate, dropDate, rentDays, rentPerDay]);

  const handleOrder: FormEventHandler<HTMLFormElement> = async (ev) => {
    ev.preventDefault();
    const response = await fetch('/api/order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        orderEmail,
        phone,
        pickupLocation,
        pickupDate,
        pickupTime,
        dropDate,
        dropTime,
        rentPerDay,
        rentValue,
        rentDays,
        carMake,
        carModel,
      }),
    });
    if (response.ok) {
      router.push('/success');
      dispatch(clearItems());
    }
  };

  const formattedPickupDate = updateDateFormat(pickupDate);
  const formattedDropDate = updateDateFormat(dropDate);
  const isPickupDateValid = pickupDate && formattedPickupDate >= formattedToday;
  const isDropDateValid =
    dropDate && pickupDate && formattedDropDate > formattedPickupDate;

  if (!items.length) {
    return <OrderEmpty />;
  }

  return (
    <form onSubmit={handleOrder}>
      <div className="grid grid-cols-2 gap-4 max-[540px]:block">
        <Input
          id="name"
          name="name"
          label="Fullname"
          defaultValue={name}
          onChange={(ev: ChangeEvent<HTMLInputElement>) =>
            setName(ev.target.value)
          }
        />
        <Input
          id="email"
          name="email"
          label="Email"
          defaultValue={orderEmail}
          onChange={(ev: ChangeEvent<HTMLInputElement>) =>
            setOrderEmail(ev.target.value)
          }
        />
      </div>
      <Input
        id="phone"
        name="phone"
        label="Phone"
        defaultValue={phone}
        onChange={(ev: ChangeEvent<HTMLInputElement>) =>
          setPhone(ev.target.value)
        }
        required
      />
      <Input
        id="pickupLocation"
        name="pickupLocation"
        label="Pick-up location"
        defaultValue={pickupLocation}
        required
        onChange={(ev: ChangeEvent<HTMLInputElement>) =>
          setPickupLocation(ev.target.value)
        }
      />
      <Input
        id="pickupDate"
        name="pickupDate"
        type="date"
        label="Pick-up date"
        defaultValue={pickupDate}
        required
        onChange={(ev: ChangeEvent<HTMLInputElement>) =>
          setPickupDate(ev.target.value)
        }
      />
      <Input
        id="pickupTime"
        name="pickupTime"
        type="time"
        label="Pick-up time"
        defaultValue={pickupTime}
        required
        onChange={(ev: ChangeEvent<HTMLInputElement>) =>
          setPickupTime(ev.target.value)
        }
      />
      <Input
        id="dropDate"
        name="dropDate"
        type="date"
        label="Drop-off date"
        defaultValue={dropDate}
        required
        onChange={(ev: ChangeEvent<HTMLInputElement>) =>
          setDropDate(ev.target.value)
        }
      />
      <Input
        id="dropTime"
        name="dropTime"
        type="time"
        label="Drop-off time"
        defaultValue={dropTime}
        required
        onChange={(ev: ChangeEvent<HTMLInputElement>) =>
          setDropTime(ev.target.value)
        }
      />
      <div>
        <h1 className="subtitle__text">Car price breakdown</h1>
        <div className="mt-4 *:max-[540px]:text-sm">
          <div className="flex border-b-2 gap-1 *:max-[540px]:text-sm">
            {pickupDate && dropDate ? (
              <>
                <p className="text-xl mt-3 font-bold ">
                  Date: {formattedPickupDate} -
                </p>
                <p className="text-xl mt-3 font-bold">{formattedDropDate}</p>
              </>
            ) : (
              <>
                <p className="text-xl mt-3 font-bold ">Date: 0 - 0 day/s</p>
              </>
            )}
          </div>
          <p className="booking__text">Hire duration: {rentDays} day/s</p>
          <p className="booking__text">Price per day: {rentPerDay}€</p>
          <p className="booking__text">Total Price: {rentValue}€</p>
        </div>
        <>
          {pickupDate && dropDate && !isDropDateValid && (
            <Alert>Drop-off date should be later than the pick-up date.</Alert>
          )}
          {pickupDate && !isPickupDateValid && (
            <Alert>Pick-up date should not be in the past.</Alert>
          )}
          {isPickupDateValid && isDropDateValid && (
            <div>
              <CustomButton
                title={`Book ${rentValue}€`}
                containerStyles="w-full py-[8px] mt-6 rounded-full bg-primary-red"
                textStyles="text-white"
                btnType="submit"
              />
            </div>
          )}
        </>
      </div>
    </form>
  );
};

export default ClientInputs;
