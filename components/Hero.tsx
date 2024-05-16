'use client';

import CustomButton from './CustomButton';

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
        <p className="hero__subtitle">
          Simplify Your Journey with Our Streamlined Car Rental Booking.
        </p>
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
