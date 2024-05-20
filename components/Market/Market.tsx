'use client';

import { useCoinsContext } from '@/providers/crypto/CoinsProvider';
import TableSkeleton from '../Assets/TableSkeleton';
import CoinsList from './CoinsList';
import PageControl from './PageControl';

const Market = () => {
  const {
    coinsStore: { coins },
    isLoading,
  } = useCoinsContext();

  return (
    <div className="flex w-full flex-col">
      <h1 className="my-20 text-2xl font-bold">Today&apos;s Crypto Prices by Market Cap</h1>
      {isLoading ? <TableSkeleton /> : <CoinsList coins={coins} />}
      <PageControl />
    </div>
  );
};

export default Market;
