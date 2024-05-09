import { RestClient } from 'okx-api';
import { env } from '@/env';

const restClient = new RestClient({
  apiKey: env.OKX_API_KEY,
  apiSecret: env.OKX_API_SECRET,
  apiPass: env.OKX_API_PASSPHRASE,
});

export default restClient;
