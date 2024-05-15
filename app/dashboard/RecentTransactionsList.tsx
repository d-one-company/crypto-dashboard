'use client';

import { useCoinsContext } from '@/providers/crypto/CoinsProvider';
import { Observer } from 'mobx-react-lite';
import RecentTransaction from './RecentTransaction';

const RecentTransactionsList = () => {
  const {
    coinsStore: { coins },
  } = useCoinsContext();

  const threeCoinsIds = ['bitcoin', 'solana', 'dogecoin'];
  return (
    <Observer>
      {() => (
        <>
          {coins
            .filter(coin => threeCoinsIds.includes(coin.id))
            .slice(0, 3)
            .map((coin, idx) => (
              <RecentTransaction key={coin?.id || idx} coin={coin} />
            ))}
        </>
      )}
    </Observer>
  );
};

export default RecentTransactionsList;
