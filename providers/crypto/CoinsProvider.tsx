'use client';

import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import type { Store } from './useCoinsStore';
import useCoinsStore from './useCoinsStore';

const CoinsContext = createContext<{
  coinsStore: Store;
  isLoading: boolean;
  error: string | null;
}>({
  coinsStore: undefined as any,
  isLoading: true,
  error: null,
});

export const useCoinsContext = () => useContext(CoinsContext);

const CoinsProvider = ({ children }: { children: ReactNode }) => {
  const coinsStore = useCoinsStore();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { fetchCoins, startSocket, readSocket } = coinsStore;

  useEffect(() => {
    async function run() {
      try {
        await fetchCoins();
        startSocket();
        readSocket();
        setIsLoading(false);
      } catch (err) {
        setError(err as string);
        setIsLoading(false);
      }
    }

    run();
  }, [fetchCoins, startSocket, readSocket]);

  return <CoinsContext.Provider value={{ coinsStore, isLoading, error }}>{children}</CoinsContext.Provider>;
};

export default CoinsProvider;
