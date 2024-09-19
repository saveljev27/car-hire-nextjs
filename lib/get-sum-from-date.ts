export const getSumFromDate = (pickupDate: any, dropDate: any) => {
  const date1 = new Date(pickupDate);
  const date2 = new Date(dropDate);

  const diffreneceInMs: number = Math.abs(date2.getTime() - date1.getTime());
  const differenceInDays: number = Math.ceil(
    diffreneceInMs / (1000 * 60 * 60 * 24)
  );
  return differenceInDays;
};
