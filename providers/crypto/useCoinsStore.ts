import { CRYPTOCURRENCIES } from '@/lib/constants/cryptocurrencies';
import { flow } from 'mobx';
import { useLocalObservable } from 'mobx-react-lite';

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
  recentCoins: Coin[];
  assets: Coin[];
  socket: WebSocket | null;
  cachedCoins: Map<string, Coin[]>;
  setCoinsData: (data: Coin[]) => void;
  setAssetsData: (data: Coin[]) => void;
  setRecentCoinsData: (data: Coin[]) => void;
  changeCoinsPrice: (data: Record<string, number>) => void;
  fetchCoins: () => any;
  startSocket: () => void;
  readSocket: () => void;
  updateCoinsData: (data: any) => void;
  fetchNextPage: () => void;
  fetchPrevPage: () => void;
  getOffset: () => number;
  increasePage: () => void;
  decreasePage: () => void;
  pageControl: {
    page: number;
    limit: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
};

const useCoinsStore = () => {
  const store = useLocalObservable<Store>(() => ({
    coins: [],
    recentCoins: [],
    assets: [],
    socket: null,
    page: 0,
    hasNextPage: true,
    hasPrevPage: false,
    cachedCoins: new Map<string, Coin[]>(),
    pageControl: {
      page: 0,
      limit: 10,
      hasNextPage: true,
      hasPrevPage: false,
    },

    setAssetsData: (data: Coin[]) => {
      for (let i = 0; i < data.length; i++) {
        const index = store.assets.findIndex(c => c.id === data[i].id);
        if (index === -1) {
          store.assets.push(data[i]);
        }
      }
    },

    setRecentCoinsData: (data: Coin[]) => {
      for (let i = 0; i < data.length; i++) {
        const index = store.recentCoins.findIndex(c => c.id === data[i].id);
        if (index === -1) {
          store.recentCoins.push(data[i]);
        }
      }
    },

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
        const recentIndex = store.recentCoins.findIndex(c => c.id === coinId);
        if (recentIndex !== -1) {
          store.recentCoins[recentIndex].priceUsd = data[coinId];
        }

        const assetsIndex = store.assets.findIndex(c => c.id === coinId);
        if (assetsIndex !== -1) {
          store.assets[assetsIndex].priceUsd = data[coinId];
        }
      }
    },

    fetchCoins: flow(function* () {
      const limit = store.pageControl.limit as number;
      const coinsData: Coin[] = yield fetch(`https://api.coincap.io/v2/assets?limit=${limit}`)
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

      const recentCoinsData = yield fetch(`https://api.coincap.io/v2/assets?ids=bitcoin,solana,dogecoin`)
        .then(res => res.json())
        .then(data => data.data);
      const finalRecentCoinsData = yield Promise.all(
        recentCoinsData.map(async (currency: any) => {
          const currentTime = new Date().getTime();
          const startTime = new Date(Date.now() - 1000 * 60 * 60 * 24).getTime();

          const chartsData = fetch(`https://api.coincap.io/v2/assets/${currency.id}/history?interval=m5&start=${startTime}&end=${currentTime}`)
            .then(res => res.json())
            .then(data => data.data);

          const resolvedChartsData = await chartsData;

          return { ...currency, chartData: resolvedChartsData, icon: CRYPTOCURRENCIES.find(c => c.id === currency.id)?.icon };
        })
      );

      store.setRecentCoinsData(finalRecentCoinsData);

      const assetsCoinsData = yield fetch(`https://api.coincap.io/v2/assets?ids=monero,xrp,litecoin`)
        .then(res => res.json())
        .then(data => data.data);

      const finalAssetsCoinsDat = yield Promise.all(
        assetsCoinsData.map(async (currency: any) => {
          const currentTime = new Date().getTime();
          const startTime = new Date(Date.now() - 1000 * 60 * 60 * 24).getTime();

          const chartsData = fetch(`https://api.coincap.io/v2/assets/${currency.id}/history?interval=m5&start=${startTime}&end=${currentTime}`)
            .then(res => res.json())
            .then(data => data.data);

          const resolvedChartsData = await chartsData;

          return { ...currency, chartData: resolvedChartsData, icon: CRYPTOCURRENCIES.find(c => c.id === currency.id)?.icon };
        })
      );

      store.setAssetsData(finalAssetsCoinsDat);
    }),

    getOffset(): number {
      return store.pageControl.page * store.pageControl.limit;
    },

    increasePage() {
      store.pageControl.page += 1;
      Object.assign(store.pageControl, { hasPrevPage: true });
    },

    decreasePage() {
      store.pageControl.page -= 1;
      if (store.pageControl.page === 0) {
        Object.assign(store.pageControl, { hasPrevPage: false });
      }
    },

    fetchPrevPage: flow(function* () {
      if (!store.pageControl.hasPrevPage) return;
      store.decreasePage();
      const offset = store.getOffset() as number;
      const limit = store.pageControl.limit as number;
      const newCoins: Coin[] = yield fetch(`https://api.coincap.io/v2/assets?limit=${limit}&offset=${offset}`)
        .then(res => res.json())
        .then(data => data.data);

      const currentTime = new Date().getTime();
      const startTime = new Date(Date.now() - 1000 * 60 * 60 * 24).getTime();

      const finalCoinsData = yield Promise.all(
        newCoins.map(async (currency: any) => {
          const chartsData = fetch(`https://api.coincap.io/v2/assets/${currency.id}/history?interval=m5&start=${startTime}&end=${currentTime}`)
            .then(res => res.json())
            .then(data => data.data);

          const resolvedChartsData = await chartsData;

          return { ...currency, chartData: resolvedChartsData, icon: CRYPTOCURRENCIES.find(c => c.id === currency.id)?.icon };
        })
      );

      store.updateCoinsData(finalCoinsData);
    }),

    fetchNextPage: flow(function* () {
      if (!store.pageControl.hasNextPage) return;
      store.increasePage();
      const cachedData = store.cachedCoins.get(store.pageControl.page.toString());
      if (cachedData) {
        store.updateCoinsData(cachedData);
        return;
      }

      const offset = store.getOffset() as number;
      const limit = store.pageControl.limit as number;
      const newCoins = yield fetch(`https://api.coincap.io/v2/assets?limit=${limit}&offset=${offset}`)
        .then(res => {
          return res.json();
        })
        .then(data => data.data);

      const currentTime = new Date().getTime();
      const startTime = new Date(Date.now() - 1000 * 60 * 60 * 24).getTime();

      const finalCoinsData = yield Promise.all(
        newCoins.map(async (currency: any) => {
          const chartsData = fetch(`https://api.coincap.io/v2/assets/${currency.id}/history?interval=m5&start=${startTime}&end=${currentTime}`)
            .then(res => res.json())
            .then(data => data.data);

          const resolvedChartsData = await chartsData;

          return { ...currency, chartData: resolvedChartsData, icon: CRYPTOCURRENCIES.find(c => c.id === currency.id)?.icon };
        })
      );

      store.updateCoinsData(finalCoinsData);
      if (newCoins.length < limit) {
        Object.assign(store.pageControl, { hasNextPage: false });
      }
    }),

    updateCoinsData: (data: Coin[]) => {
      // Update cached coins with old coins
      store.cachedCoins.set(store.pageControl.page.toString(), [...store.coins]);
      // Restart coins array
      store.coins.length = 0;
      // Add new coins to the coins array
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
        console.error('Socket not initialized');
        return;
      }

      store.socket.onmessage = event => {
        const newPrices = JSON.parse(event.data);
        store.changeCoinsPrice(newPrices);
      };

      store.socket.onclose = () => {
        setTimeout(() => store.startSocket(), 5000);
      };
    },
  }));

  return store;
};

export default useCoinsStore;
