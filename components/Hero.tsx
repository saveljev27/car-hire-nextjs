'use client';

import CustomButton from './CustomButton';
import { IoMdCheckbox } from 'react-icons/io';

const Hero = () => {
  const handleScroll = () => {
    const nextSection = document.getElementById('discover');

    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="hero">
      <div className="pt-36 padding-x">
        <h1 className="hero__title">
          Choose, Book, or Rent Your Ideal Car — Fast and Simple!
        </h1>
        <div className="flex justify-between">
          <p className="hero__subtitle flex flex-col gap-2 items-center ">
            Free cancellations on most bookings
            <span className="text-black text-3xl">{<IoMdCheckbox />}</span>
          </p>
          <p className="hero__subtitle flex flex-col gap-2 items-center">
            Customer support 24/7
            <span className="text-black text-3xl">{<IoMdCheckbox />}</span>
          </p>
          <p className="hero__subtitle flex flex-col gap-2 items-center">
            Drop car on different locations
            <span className="text-black text-3xl">{<IoMdCheckbox />}</span>
          </p>
        </div>
        <CustomButton
          title="Explore Cars"
          containerStyles="bg-primary-red text-white rounded-full mt-10"
          handleClick={handleScroll}
        />
      </div>
    </div>
  );
};

export default Hero;
