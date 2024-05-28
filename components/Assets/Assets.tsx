'use client';

import { useCoinsContext } from '@/providers/crypto/CoinsProvider';
import AssetsTable from './AssetsTable';

const Assets = () => {
  const {
    coinsStore: { assets },
  } = useCoinsContext();

  return (
    <div className="flex flex-col gap-3 rounded-lg border border-baltic-sea px-7 py-5">
      <p className="text-xl text-grayish-white">Assets</p>
      <AssetsTable coins={assets} />
    </div>
  );
};

export default Assets;
