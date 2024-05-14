'use client';

import { ReactNode, createContext, useContext, useEffect } from 'react';
import type { Store } from './useCoinsStore';
import useCoinsStore from './useCoinsStore';

const CoinsContext = createContext<{ coinsStore: Store }>(undefined as any);
export const useCoinsContext = () => useContext(CoinsContext);

const CoinsProvider = ({ children }: { children: ReactNode }) => {
  const coinsStore = useCoinsStore();
  const { fetchCoins, startSocket, readSocket } = coinsStore;

  useEffect(() => {
    async function run() {
      await fetchCoins();
      startSocket();
      readSocket();
    }

    run();
  }, [fetchCoins, startSocket, readSocket]);

  return <CoinsContext.Provider value={{ coinsStore: coinsStore }}>{children}</CoinsContext.Provider>;
};

export default CoinsProvider;
