import { flow } from 'mobx';
import { useLocalObservable } from 'mobx-react-lite';

export type Exchange = {
  id: string;
  name: string;
  rank: number;
  percentTotalVolume: number;
  volumeUsd: number;
  tradingPairs: string;
};

export type Store = {
  exchanges: Exchange[];
  fetchExchanges: () => any;
  setExchangesData: (data: Exchange[]) => void;
};

const useExchangesStore = () => {
  const store = useLocalObservable<Store>(() => ({
    exchanges: [],

    setExchangesData: (data: Exchange[]) => {
      store.exchanges = data;
    },

    fetchExchanges: flow(function* () {
      const response = yield fetch('https://api.coincap.io/v2/exchanges');
      const json = yield response.json();

      store.setExchangesData(json.data);
    }),
  }));

  return store;
};

export default useExchangesStore;
