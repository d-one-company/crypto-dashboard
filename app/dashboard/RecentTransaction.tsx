'use client';

import { Bitcoin } from '@/components/icons';
import PriceChart from '@/components/PriceChart';
import Supply from '@/components/supply/Supply';
import { cn } from '@/lib/utils';
import generateChartData from '@/lib/utils/generateChartData';
import { Coin } from '@/providers/crypto/useCoinsStore';
import { Observer } from 'mobx-react-lite';

type Props = { coin: Coin };

const RecentTransaction = ({ coin }: Props) => {
  return (
    <div className="grid w-full grid-cols-5 gap-5 rounded-xl bg-card-dark p-5 shadow-card xl:grid-cols-6">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-4">
          <span className="text-sm text-foreground-dark">{coin.rank}</span>
          {coin?.icon ? coin.icon : <Bitcoin />}
        </div>
        <div className="flex flex-col gap-0.5 text-xs">
          <p className="text-white">{coin.name}</p>
          <p className="text-foreground-dark">{coin.symbol}</p>
        </div>
      </div>
      <Observer>
        {() => (
          <div className="flex flex-col justify-center gap-0.5 text-xs">
            <span className="text-white">Price</span>
            <span className="text-foreground-dark">{Intl.NumberFormat('en', { style: 'currency', currency: 'USD' }).format(coin.priceUsd)}</span>
          </div>
        )}
      </Observer>
      <div className="hidden flex-col justify-center gap-0.5 text-xs xl:flex">
        <p className="text-white">Market Cap</p>
        <p className={cn('text-foreground-dark')}>{Intl.NumberFormat('en', { currency: 'USD' }).format(coin.marketCapUsd)}</p>
      </div>
      <Supply supply={coin.supply} maxSupply={coin.maxSupply} symbol={coin.symbol} />
      <div className="flex flex-col justify-center gap-0.5 text-xs">
        <p className="text-white">24h</p>
        <p className={cn(coin.changePercent24Hr > 0 ? 'text-green-500' : 'text-red-500')}>{Intl.NumberFormat('en').format(coin.changePercent24Hr)}%</p>
      </div>
      <div className="flex flex-col gap-0.5 text-xs">
        <PriceChart data={[generateChartData(coin)]} curve="basis" />
      </div>
    </div>
  );
};

export default RecentTransaction;
