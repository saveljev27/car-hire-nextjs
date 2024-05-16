'use client';

import { store } from '@/redux/store';
import { Provider } from 'react-redux';
import { SessionProvider } from 'next-auth/react';

const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <Provider store={store}>{children}</Provider>;
    </SessionProvider>
  );
};

export default StoreProvider;
