'use client';

import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import useExchangesStore, { Store } from './useExchangeStore';

const ExchangesContext = createContext<{
  exchangesStore: Store;
  isLoading: boolean;
  error: string | null;
}>({
  exchangesStore: { exchanges: [], fetchExchanges: async () => {}, setExchangesData: () => {} },
  isLoading: true,
  error: null,
});

export const useExchangesContext = () => useContext(ExchangesContext);

const ExchangesProvider = ({ children }: { children: ReactNode }) => {
  const exchanges = useExchangesStore();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { fetchExchanges } = exchanges;

  useEffect(() => {
    async function run() {
      try {
        await fetchExchanges();
        setIsLoading(false);
      } catch (err) {
        setError(err as string);
        setIsLoading(false);
      }
    }

    run();
  }, [fetchExchanges]);

  return <ExchangesContext.Provider value={{ exchangesStore: exchanges, isLoading, error }}>{children}</ExchangesContext.Provider>;
};

export default ExchangesProvider;
