'use client';

import { TbCalendarCancel, MdSupportAgent, GrMapLocation } from './UI';

export const Hero = () => {
  return (
    <div className="hero">
      <div className="pt-36 padding-x">
        <h1 className="hero__title">
          Choose, Book, or Rent Your Ideal Car — Fast and Simple!
        </h1>
        <div className="flex justify-between mt-5 max-xl:flex-col">
          <p className="hero__subtitle flex flex-col gap-2 items-center">
            Free cancellations on most bookings
            <span className="text-black text-3xl">
              {<TbCalendarCancel size={50} />}
            </span>
          </p>
          <p className="hero__subtitle flex flex-col gap-2 items-center">
            Customer support 24/7
            <span className="text-black text-3xl">
              {<MdSupportAgent size={50} />}
            </span>
          </p>
          <p className="hero__subtitle flex flex-col gap-2 items-center">
            Drop car on different locations
            <span className="text-black text-3xl">
              {<GrMapLocation size={50} />}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};
