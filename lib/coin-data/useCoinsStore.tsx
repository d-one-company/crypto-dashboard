'use client';

import { useLocalObservable } from 'mobx-react-lite';
import type { Coin } from '../types/coins';
import WebSocket from 'isomorphic-ws';
import { WebsocketClient, DefaultLogger } from 'okx-api';
import { Bitcoin } from '@/components/icons';

const API_KEY = '3927b85d-4a49-4f85-bd75-06f72e280b68';
const API_SECRET = '171B1804C7B84C9CCD589DF8767889F3';
const API_PASSPHRASE = 'Admin@123123';

const logger = {
  ...DefaultLogger,
};

const publicWebSocket = 'wss://ws.okx.com:8443/ws/v5/public';

const useCoinsStore = () => {
  const store = useLocalObservable(() => ({
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
      store.socket = new WebSocket(`${publicWebSocket}`, undefined, {
        op: 'subscribe',
        args: [
          {
            channel: 'instruments',
            instType: 'SPOT',
          },
        ],
      });
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

  return store;
};

export default useCoinsStore;
