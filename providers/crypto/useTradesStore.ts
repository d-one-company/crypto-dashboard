import { useLocalObservable } from 'mobx-react-lite';

const BASECOIN = 'ethereum';

export type Trade = {
  exchange: string;
  base: string;
  quote: string;
  direction: 'buy' | 'sell';
  price: number;
  volume: number;
  timestamp: number;
  priceUsd: number;
};

export type Store = {
  trades: Trade[];
  socket: WebSocket | null;
  startSocket: () => void;
  readSocket: () => void;
};

const useTradesStore = () => {
  const store = useLocalObservable<Store>(() => ({
    trades: [],
    socket: null,

    startSocket: () => {
      store.socket = new WebSocket(`wss://ws.coincap.io/trades/huobi?base=${BASECOIN}`);
      store.socket.onclose = () => setTimeout(() => store.startSocket(), 5000);
    },

    readSocket: () => {
      if (!store.socket) {
        console.error('Socket not initialized');
        return;
      }

      store.socket.onmessage = event => {
        const trade = JSON.parse(event.data) as Trade;
        if (store.trades.length > 20) store.trades.shift();
        store.trades.push(trade);
      };

      store.socket.onclose = () => {
        setTimeout(() => store.startSocket(), 5000);
      };
    },
  }));

  return store;
};

export default useTradesStore;
