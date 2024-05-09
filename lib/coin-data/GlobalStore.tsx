'use client';

import React, { createContext } from 'react';

import useCoinsStore from './useCoinsStore';

export const GlobalContext = createContext<any>(null);

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const coinsStore = useCoinsStore();

  return <GlobalContext.Provider value={{ coinsStore }}>{children}</GlobalContext.Provider>;
};

export default GlobalProvider;
