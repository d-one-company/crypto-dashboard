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
  coins: Coin[];
  socket: WebSocket | null;
  setCoinsData: (data: Coin[]) => void;
  changeCoinsPrice: (data: Record<string, number>) => void;
  fetchCoins: () => any;
  startSocket: () => void;
  readSocket: () => void;
};

const useCoinsStore = () => {
  const store = useLocalObservable<Store>(() => ({
    coins: [],
    socket: null,

    setCoinsData: (data: Coin[]) => {
      for (const coin of data) {
        store.coins.push(coin);
      }
    },

    changeCoinsPrice: (data: Record<string, number>) => {
      for (const coinId in data) {
        const index = store.coins.findIndex(c => c.id === coinId);
        store.coins[index].priceUsd = data[coinId];
      }
    },

    fetchCoins: flow(function* () {
      const coinsData = yield Promise.all(
        CRYPTOCURRENCIES.map(async currency => {
          const coinsData = fetch(`https://api.coincap.io/v2/assets/${currency.id}`)
            .then(res => res.json())
            .then(data => data.data);

          const currentTime = new Date().getTime();
          const startTime = new Date(Date.now() - 1000 * 60 * 60 * 24).getTime();

          const chartsData = fetch(`https://api.coincap.io/v2/assets/${currency.id}/history?interval=m5&start=${startTime}&end=${currentTime}`)
            .then(res => res.json())
            .then(data => data.data);

          const [resolvedCoinsData, resolvedChartsData] = await Promise.all([coinsData, chartsData]);

          return { ...resolvedCoinsData, chartData: resolvedChartsData, icon: currency.icon };
        })
      );

      store.setCoinsData(coinsData);
    }),

    startSocket: () => {
      store.socket = new WebSocket(`wss://ws.coincap.io/prices?assets=${CRYPTOCURRENCIES.map(currency => currency.id).join(',')}`);
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
