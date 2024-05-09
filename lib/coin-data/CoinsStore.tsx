'use client';

import React, { createContext } from 'react';
import { useLocalStore } from 'mobx-react-lite';
import { pid } from 'process';

const API_KEY = '3927b85d-4a49-4f85-bd75-06f72e280b68';
const API_SECRET = '171B1804C7B84C9CCD589DF8767889F3';
const API_PASSPHRASE = 'Admin@123123';

const publicWebSocket = 'wss://ws.okx.com:8443/ws/v5/public';
const privateWebSocket = 'wss://ws.okx.com:8443/ws/v5/private';

const CoinsContext = createContext<any>(null);

export const CoinsProvider = ({ children }: { children: React.ReactNode }) => {
  const store = useLocalStore(() => ({
    coins: {} as any,
    socket: null as any,

    setCoinsData(data: any) {
      console.info('set coins data', data);
      for (let i = 0; i < data.length; i++) {
        store.coins['BTC'] = data[i];
      }
    },

    changeCoinsPrices(newPrices: any) {
      console.log(newPrices);
      for (let coinId in newPrices) {
        if (store.coins[coinId]) {
          store.coins[coinId].priceUsd = newPrices[coinId];
        }
      }
    },

    fetchCoins() {
      return fetch('https://api.coincap.io/v2/assets')
        .then(res => res.json())
        .then(json => {
          console.info('set coins data', json.data);
          return store.setCoinsData(json.data);
        });
    },

    startSocket() {
      console.info('start socket');
      store.socket = new WebSocket(`${publicWebSocket}?instId=BTC-USDT`);
      store.socket.onclose = () => setTimeout(() => store.startSocket(), 5000);
    },

    readSocket() {
      store.socket.onmessage = (event: any) => {
        console.log(event);
        const newPrices = JSON.parse(event.data.data);
        store.changeCoinsPrices(newPrices);
      };
    },
  }));

  return <CoinsContext.Provider value={store}>{children}</CoinsContext.Provider>;
};
