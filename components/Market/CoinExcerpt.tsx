'use client';

import { Coin } from '@/providers/crypto/useCoinsStore';
import { Bitcoin } from '../icons';
import PriceChart from '../PriceChart';
import generateChartData from '@/lib/utils/generateChartData';
import { Observer } from 'mobx-react-lite';

type CoinExcerptProps = {
  coin: Coin;
};

const CoinExcerpt = ({ coin }: CoinExcerptProps) => {
  return (
    <div className="grid h-[65px] grid-cols-5 items-center border-b border-b-gray-jumbo text-sm">
      <div className="flex items-center gap-2">
        <div className="">{coin.icon ? coin.icon : <Bitcoin />}</div>
        <div className="flex flex-col text-xs">
          <span className="text-white">{coin.name}</span>
          <span className="text-foreground-dark">{coin.symbol}</span>
        </div>
      </div>
      <Observer>{() => <div>{new Intl.NumberFormat('en').format(coin.priceUsd)}</div>}</Observer>
      <div>
        <span className="w-fit rounded-xl bg-white px-1.5 text-black">{new Intl.NumberFormat('en').format(coin.changePercent24Hr)}%</span>
      </div>
      <div>{new Intl.NumberFormat('en').format(coin.volumeUsd24Hr)}</div>
      <div>
        <PriceChart data={[generateChartData(coin)]} curve="basis" />
      </div>
    </div>
  );
};

export default CoinExcerpt;
