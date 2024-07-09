import { ReactNode } from 'react';

const Alert = ({ children }: { children: ReactNode }) => {
  return <div className="mt-4 text-red-500">{children}</div>;
};

export default Alert;
