'use client';

import { WebsocketClient, DefaultLogger } from 'okx-api';

const API_KEY = '3927b85d-4a49-4f85-bd75-06f72e280b68';
const API_SECRET = '171B1804C7B84C9CCD589DF8767889F3';
const API_PASSPHRASE = 'Admin@123123';

const Page = () => {
  const logger = {
    ...DefaultLogger,
  };

  const wsClient = new WebsocketClient(
    {
      accounts: [
        {
          apiKey: API_KEY,
          apiSecret: API_SECRET,
          apiPass: API_PASSPHRASE,
        },
      ],
    },
    logger
  );

  wsClient.on('update', data => {
    // console.log('ws update (raw data received)', JSON.stringify(data, null, 2));
    console.log('ws update (raw data received)', JSON.stringify(data));
  });

  wsClient.on('open', data => {
    console.log('connection opened open:', data.wsKey);
  });

  // Replies (e.g. authenticating or subscribing to channels) will arrive on the 'response' event
  wsClient.on('response', data => {
    // console.log('ws response: ', JSON.stringify(data, null, 2));
    console.log('ws response: ', JSON.stringify(data));
  });

  wsClient.on('reconnect', ({ wsKey }) => {
    console.log('ws automatically reconnecting.... ', wsKey);
  });
  wsClient.on('reconnected', data => {
    console.log('ws has reconnected ', data?.wsKey);
  });
  wsClient.on('error', data => {
    console.error('ws exception: ', data);
  });

  //
  wsClient.subscribe({
    channel: 'account',
  });

  // OR, combine multiple subscription events into one request using an array instead of an object:
  wsClient.subscribe([
    {
      channel: 'account',
    },
    {
      channel: 'positions',
      instType: 'ANY',
    },
  ]);

  /**
   * Examples for each private channel listed in the API docs:
   * https://www.okx.com/docs-v5/en/#websocket-api-private-channel
   */

  // Account events for all symbols
  wsClient.subscribe({
    channel: 'account',
  });

  // Balance & position channel
  wsClient.subscribe([
    {
      channel: 'mark-price',
      instId: 'BTC-USDT',
    },
    {
      channel: 'tickers',
      instId: 'BTC-USDT',
    },
  ]);

  // Order channel

  return <div></div>;
};

export default Page;
