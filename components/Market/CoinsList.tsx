'use client';

import { Coin } from '@/providers/crypto/useCoinsStore';
import { Observer } from 'mobx-react-lite';
import CoinExcerpt from './CoinExcerpt';

type CoinsListProps = { coins: Coin[] };

const CoinsList = ({ coins }: CoinsListProps) => {
  return (
    <>
      <div className="grid h-[48px] grid-cols-5">
        <div className="text-sm text-gray-200/60">Coin</div>
        <div className="text-sm text-gray-200/60">Latest Price</div>
        <div className="text-sm text-gray-200/60">Dynamic</div>
        <div className="text-sm text-gray-200/60">Volume</div>
        <div className="text-sm text-gray-200/60">Chart</div>
      </div>
      <Observer>{() => <div className="flex flex-col">{coins?.map((coin, idx) => <CoinExcerpt key={`${coin.id}-${idx}`} coin={coin} />)}</div>}</Observer>
    </>
  );
};

export default CoinsList;
