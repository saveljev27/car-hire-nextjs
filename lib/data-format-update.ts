export const dateFormatUpdate = (date: string) => {
  const formattedDate = new Date(date).toLocaleDateString('en-GB', {
    timeZone: 'UTC',
  });
  return formattedDate;
};
