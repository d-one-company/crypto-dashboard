'use client';

import { cn } from '@/lib/utils';
import { Coin } from '@/providers/crypto/useCoinsStore';
import generateChartData from '@/lib/utils/generateChartData';
import PriceChart from '@/components/PriceChart';

type Props = {
  coin: Coin;
};

const RecentTransaction = ({ coin }: Props) => {
  return (
    <div className="grid grid-cols-5 items-center gap-5 rounded-xl bg-card-dark p-5 shadow-card">
      <div className="flex items-center gap-6">
        {coin.icon}

        <div className="flex flex-col gap-0.5 text-xs">
          <p className="text-white">{coin.name}</p>
          <p className="text-foreground-dark">{coin.symbol}</p>
        </div>
      </div>
      <div className="flex flex-col gap-0.5 text-xs">
        <p className="text-white">Market Cap</p>
        <p className={cn('text-foreground-dark')}>{Intl.NumberFormat('en', { currency: 'USD' }).format(coin.marketCapUsd)}</p>
      </div>
      <div className="flex flex-col gap-0.5 text-xs">
        <p className="text-white">24h chance</p>
        <p className={cn(coin.changePercent24Hr > 0 ? 'text-green-500' : 'text-red-500')}>{Intl.NumberFormat('en').format(coin.changePercent24Hr)}%</p>
      </div>
      <div className="flex flex-col gap-0.5 text-xs">
        <PriceChart data={[generateChartData(coin)]} curve="basis" />
      </div>
      <button className="ml-auto w-fit rounded-xl bg-white px-4 py-2 text-black shadow-button">Trade</button>
    </div>
  );
};

export default RecentTransaction;
