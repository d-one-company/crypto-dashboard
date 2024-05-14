'use client';

import { useCoinsContext } from '@/providers/crypto/CoinsProvider';
import AssetsTable from '../Assets/AssetsTable';

const Market = () => {
  const {
    coinsStore: { coins, hasNextPage, fetchNextPage },
  } = useCoinsContext();

  return (
    <div className="flex w-full flex-col gap-10">
      <h1 className="mt-20 self-center text-2xl font-bold">Today&apos;s Crypto Prices by Market Cap</h1>
      <AssetsTable coins={coins} />
      <button onClick={() => hasNextPage && fetchNextPage()} className="bg-red-500 px-4 py-2">
        Load More
      </button>
    </div>
  );
};

export default Market;
