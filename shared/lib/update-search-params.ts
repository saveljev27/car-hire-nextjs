export const updateSearchParams = (type: string, value: string) => {
  const searchParams = new URLSearchParams(window.location.search);
  console.log(window.location);
  if (type === 'all' && value === '') return window.location.pathname;
  if (value !== 'all' && value !== '') {
    searchParams.set(type, value);
  } else {
    searchParams.delete(type);
  }
  const newPathname = `${window.location.pathname}?${searchParams.toString()}`;

  return newPathname;
};
