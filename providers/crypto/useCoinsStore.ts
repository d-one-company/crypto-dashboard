import { flow } from 'mobx';
import { useLocalObservable, useLocalStore } from 'mobx-react-lite';
import { WebsocketClient } from 'okx-api';
import type { Ticker, Candle, Pagination } from 'okx-api';
import { CURRENCIES } from '@/lib/constants/crypto';

import restClient from '@/lib/okx/restClient';
import wsClient from '@/lib/okx/wsClient';
import React from 'react';

type Coin = {
  id: string;
  price: number;
  name: string;
  icon: React.ReactNode;
  change: number;
  marketCap: number;
  instId: string;
  chartData: any;
};

export type Store = {
  coins: Coin[];
  socket: WebsocketClient | null;
  setCoinsData: (data: Coin[]) => void;
  changeCoinsPrice: (data: Coin[]) => void;
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

    changeCoinsPrice: (data: any) => {
      for (const coin of data) {
        const index = store.coins.findIndex(c => {
          return c.instId === coin.id;
        });
        if (index !== -1) {
          store.coins[index].price = coin.price;
        }
      }
    },

    fetchCoins: flow(function* () {
      const data: Ticker[] = yield restClient.getTickers('SPOT');
      const candleData = yield restClient.getMarkPriceCandles('ETH-USDT-SWAP', '1D');
      const filteredData = CURRENCIES.map(currency => {
        const coinData = data.find(coin => `${currency.symbol}-USDT` === `${coin.instId.split('-')[0]}-${coin.instId.split('-')[1]}`) as Ticker;
        return {
          id: currency.symbol,
          name: currency.name,
          icon: currency.icon,
          price: parseFloat(coinData.last),
          change: parseFloat(coinData.last) / parseFloat(coinData.low24h),
          marketCap: 123111123,
          instId: coinData.instId,
          chartData: [
            {
              id: coinData.instId,
              data: candleData?.map((candle: Candle, idx: number) => {
                console.info(parseFloat(candle[1]) - parseFloat(candle[4]));
                return {
                  x: candle[0],
                  y: parseFloat(candle[1]) + parseFloat(candle[4]) / 2,
                };
              }),
            },
          ],
        };
      });

      store.setCoinsData(filteredData);
    }),

    startSocket: () => {
      store.socket = wsClient;

      store.socket.subscribe(store.coins.map(coin => ({ channel: 'tickers', instId: coin.instId })));
      store.socket.subscribe(store.coins.map(coin => ({ channel: 'candle1D', instId: coin.instId })));

      store.socket.on('close', () => {
        console.info('socket closed - reconnecting in 5 seconds');
        setTimeout(() => store.startSocket(), 5000);
      });
    },

    readSocket: () => {
      if (!store.socket) {
        console.error('socket not initialized');
        return;
      }
      //
      store.socket.on('update', ({ data }) => {
        const coins = data.map((coin: any) => ({
          id: coin.instId,
          price: parseFloat(coin.last),
        }));

        store.changeCoinsPrice(coins);
      });
    },
  }));

  return store;
};

export default useCoinsStore;
