'use client';

import { useCoinsContext } from '@/providers/crypto/CoinsProvider';
import AssetsTable from '../Assets/AssetsTable';

const Market = () => {
  const {
    coinsStore: { coins },
  } = useCoinsContext();

  return (
    <div className="flex w-full flex-col gap-10">
      <h1 className="mt-20 text-2xl font-bold">Today&apos;s Crypto Prices by Market Cap</h1>
      <AssetsTable coins={coins} />
    </div>
  );
};

export default Market;
