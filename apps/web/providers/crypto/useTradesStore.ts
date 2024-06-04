import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';
import { useLocalObservable } from 'mobx-react-lite';
import { BASE, MAX_BARS, QUOTE, type Trade, type TradesData } from 'shared';

dayjs.extend(utc);

export type Store = {
  trades: TradesData[];
  socket: WebSocket | null;
  startSocket: () => void;
  readSocket: () => void;
};

type Props = {
  initialTrades?: TradesData[];
};

const useTradesStore = ({ initialTrades }: Props) => {
  const store = useLocalObservable<Store>(() => ({
    trades: initialTrades || [],
    socket: null,

    startSocket: () => {
      store.socket = new WebSocket(`wss://ws.coincap.io/trades/huobi?base=${BASE}&quote=${QUOTE}`);
      store.socket.onclose = () => setTimeout(() => store.startSocket(), 5000);
    },

    readSocket: () => {
      if (!store.socket) {
        console.error('Socket not initialized');
        return;
      }

      store.socket.onmessage = event => {
        const trade = JSON.parse(event.data) as Trade;
        const date = dayjs(trade.timestamp).utc();
        const interval = date.format('mm');

        const index = store.trades.findIndex(t => t.interval === interval);
        if (index === -1) {
          if (store.trades.length >= MAX_BARS) store.trades.shift();
          store.trades.push({
            interval,
            timestamp: trade.timestamp,
            open: trade.price,
            close: trade.price,
            buy: {
              count: 0,
              volume: 0,
              price: 0,
              priceUsd: 0,
            },
            sell: {
              count: 0,
              volume: 0,
              price: 0,
              priceUsd: 0,
            },
          });
        }

        const tradesData = store.trades[index];
        if (tradesData) {
          if (trade.direction === 'buy') {
            tradesData.buy.count += 1;
            tradesData.buy.volume += trade.volume;
            tradesData.buy.price += trade.price;
            if (trade.priceUsd) tradesData.buy.priceUsd += trade.priceUsd;
          } else {
            tradesData.sell.count += 1;
            tradesData.sell.volume += trade.volume;
            tradesData.sell.price += trade.price;
            if (trade.priceUsd) tradesData.sell.priceUsd += trade.priceUsd;
          }

          tradesData.close = trade.price;
        }

        store.trades[index] = tradesData;
      };

      store.socket.onclose = () => {
        setTimeout(() => store.startSocket(), 5000);
      };
    },
  }));

  return store;
};

export default useTradesStore;
