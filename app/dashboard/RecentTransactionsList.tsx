'use client';

import { useCoinsContext } from '@/providers/crypto/CoinsProvider';
import RecentTransaction from './RecentTransaction';
import { Observer } from 'mobx-react-lite';

const RecentTransactionsList = () => {
  const {
    coinsStore: { coins },
  } = useCoinsContext();

  return (
    <Observer>
      {() => (
        <>
          {coins.slice(0, 3).map((coin, idx) => (
            <RecentTransaction key={coin?.id || idx} coin={coin} />
          ))}
        </>
      )}
    </Observer>
  );
};

export default RecentTransactionsList;
