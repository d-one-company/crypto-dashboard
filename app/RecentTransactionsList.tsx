'use client';

import { useCoinsContext } from '@/providers/crypto/CoinsProvider';
import { Observer } from 'mobx-react-lite';
import RecentTransaction from './RecentTransaction';

const RecentTransactionsList = () => {
  const {
    coinsStore: { recentCoins },
  } = useCoinsContext();

  return (
    <Observer>
      {() => (
        <>
          {recentCoins.map((coin, idx) => (
            <RecentTransaction key={coin?.id || idx} coin={coin} />
          ))}
        </>
      )}
    </Observer>
  );
};

export default RecentTransactionsList;
