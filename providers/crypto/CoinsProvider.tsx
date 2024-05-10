'use client';

import * as React from 'react';
import useCoinsStore from './useCoinsStore';
import type { Store } from './useCoinsStore';

const CoinsContext = React.createContext<{ coinsStore: Store }>(undefined as any);
export const useCoinsContext = () => React.useContext(CoinsContext);

const CoinsProvider = ({ children }: { children: React.ReactNode }) => {
  const coinsStore = useCoinsStore();
  const { fetchCoins, startSocket, readSocket } = coinsStore;

  React.useEffect(() => {
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
