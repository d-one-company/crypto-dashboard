import { type ReactNode } from 'react';

export type Coin = {
  symbol: string;
  instId: string;
  priceUsdt: number;
  volume24h: number;
  marketCapUsdt: number;
  low24h: number;
  high24h: number;
  change24h: number;
  icon: ReactNode;
};
