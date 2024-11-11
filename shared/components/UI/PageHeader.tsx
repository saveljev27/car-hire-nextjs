import React, { ReactNode } from 'react';

export const PageHeader = ({ children }: { children: ReactNode }) => {
  return <h1 className="page__title">{children}</h1>;
};
