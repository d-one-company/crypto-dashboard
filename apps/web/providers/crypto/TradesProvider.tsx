'use client';

import { PropsWithChildren, createContext, useContext, useEffect, useState } from 'react';
import { TradesData } from 'shared';
import useTradesStore, { Store } from './useTradesStore';

const TradesContext = createContext<{
  tradesStore: Store;
  isLoading: boolean;
  error: string | null;
}>({
  tradesStore: undefined as any,
  isLoading: true,
  error: null,
});

export const useTradesContext = () => useContext(TradesContext);

type Props = PropsWithChildren<{
  initialTrades?: TradesData[];
}>;

const TradesProvider = ({ initialTrades, children }: Props) => {
  const trades = useTradesStore({ initialTrades });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { startSocket, readSocket } = trades;

  useEffect(() => {
    async function run() {
      try {
        startSocket();
        readSocket();
        setIsLoading(false);
      } catch (err) {
        setError(err as string);
        setIsLoading(false);
      }
    }

    run();
  }, [startSocket, readSocket]);

  return <TradesContext.Provider value={{ tradesStore: trades, isLoading, error }}>{children}</TradesContext.Provider>;
};

export default TradesProvider;
