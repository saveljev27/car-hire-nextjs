import { ReactNode } from 'react';

export const Alert = ({ children }: { children: ReactNode }) => {
  return <div className="mt-4 text-red-500">{children}</div>;
};
