import { WebsocketClient, DefaultLogger } from 'okx-api';
import { env } from '@/env';

const logger = { ...DefaultLogger };

const wsClient = new WebsocketClient(
  {
    accounts: [{ apiKey: env.OKX_API_KEY, apiSecret: env.OKX_API_SECRET, apiPass: env.OKX_API_PASSPHRASE }],
  },
  logger
);

export default wsClient;
