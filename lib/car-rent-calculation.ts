export const carRentCalculation = (city_mpg: number, year: number) => {
  const basePricePerDay = 50;
  const kmFactor = 0.2;
  const ageFactor = 10;

  const kmRate = city_mpg * kmFactor;
  const ageRate = (new Date().getFullYear() - year) * ageFactor;

  const rentalRatePerDay = basePricePerDay + kmRate + ageRate;

  return rentalRatePerDay.toFixed(0);
};
