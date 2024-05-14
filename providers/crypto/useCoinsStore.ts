import { flow } from 'mobx';
import { useLocalObservable } from 'mobx-react-lite';
import { CRYPTOCURRENCIES } from '@/lib/constants/cryptocurrencies';

export type ChartData = {
  circulationSupply: string;
  date: string;
  priceUsd: string;
  time: number;
}[];

export type Coin = {
  id: string;
  name: string;
  icon: React.ReactNode;
  symbol: string;
  priceUsd: number;
  marketCapUsd: number;
  changePercent24Hr: number;
  maxSupply: number;
  supply: number;
  volumeUsd24Hr: number;
  rank: number;
  vwap24Hr: number;
  chartData: ChartData;
};

export type Store = {
  page: number;
  hasNextPage: boolean;
  coins: Coin[];
  socket: WebSocket | null;
  setCoinsData: (data: Coin[]) => void;
  changeCoinsPrice: (data: Record<string, number>) => void;
  fetchCoins: () => any;
  startSocket: () => void;
  readSocket: () => void;
  updateCoinsData: (data: any) => void;
  fetchNextPage: () => void;
  getOffset: () => number;
};

const useCoinsStore = () => {
  const limit = 10;

  const store = useLocalObservable<Store>(() => ({
    coins: [],
    socket: null,
    page: 1,
    hasNextPage: true,

    setCoinsData: (data: Coin[]) => {
      for (let i = 0; i < data.length; i++) {
        const index = store.coins.findIndex(c => c.id === data[i].id);
        if (index === -1) {
          store.coins.push(data[i]);
        }
      }
    },
    changeCoinsPrice: (data: Record<string, number>) => {
      for (const coinId in data) {
        const index = store.coins.findIndex(c => c.id === coinId);
        if (index !== -1) {
          store.coins[index].priceUsd = data[coinId];
        }
      }
    },

    fetchCoins: flow(function* () {
      const coinsData = yield fetch(`https://api.coincap.io/v2/assets?limit=${limit}`)
        .then(res => res.json())
        .then(data => data.data);

      const finalCoinsData = yield Promise.all(
        coinsData.map(async (currency: any) => {
          const currentTime = new Date().getTime();
          const startTime = new Date(Date.now() - 1000 * 60 * 60 * 24).getTime();

          const chartsData = fetch(`https://api.coincap.io/v2/assets/${currency.id}/history?interval=m5&start=${startTime}&end=${currentTime}`)
            .then(res => res.json())
            .then(data => data.data);

          const resolvedChartsData = await chartsData;

          return { ...currency, chartData: resolvedChartsData, icon: CRYPTOCURRENCIES.find(c => c.id === currency.id)?.icon };
        })
      );

      store.setCoinsData(finalCoinsData);
    }),

    getOffset(): number {
      return store.page * limit;
    },

    fetchNextPage: flow(function* () {
      if (!store.hasNextPage) return;

      const offset = store.getOffset() as number;
      const newCoins = yield fetch(`https://api.coincap.io/v2/assets?limit=${limit}&offset=${offset}`)
        .then(res => {
          console.info(res);
          return res.json();
        })
        .then(data => data.data);

      const currentTime = new Date().getTime();
      const startTime = new Date(Date.now() - 1000 * 60 * 60 * 24).getTime();

      const finalCoinsData = yield Promise.all(
        newCoins.map(async (currency: any) => {
          const chartsData = fetch(`https://api.coincap.io/v2/assets/${currency.id}/history?interval=m5&start=${startTime}&end=${currentTime}`)
            .then(res => res.json())
            .then(data => {
              console.info(data);
              return data.data;
            });

          const resolvedChartsData = await chartsData;

          return { ...currency, chartData: resolvedChartsData, icon: CRYPTOCURRENCIES.find(c => c.id === currency.id)?.icon };
        })
      );

      store.updateCoinsData(finalCoinsData);

      if (newCoins.length < limit) {
        store.hasNextPage = false;
      }
      store.page += 1;
    }),

    updateCoinsData: (data: Coin[]) => {
      for (let i = 0; i < data.length; i++) {
        const index = store.coins.findIndex(c => c.id === data[i].id);
        if (index === -1) {
          store.coins.push(data[i]);
        }
      }
    },

    startSocket: () => {
      store.socket = new WebSocket(`wss://ws.coincap.io/prices?assets=ALL`);
      store.socket.onclose = () => setTimeout(() => store.startSocket(), 5000);
    },

    readSocket: () => {
      if (!store.socket) {
        console.error('socket not initialized');
        return;
      }

      store.socket.onmessage = (event: any) => {
        const newPrices = JSON.parse(event.data);
        store.changeCoinsPrice(newPrices);
      };
    },
  }));

  return store;
};

export default useCoinsStore;
