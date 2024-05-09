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
            <RecentTransaction key={coin?.id || idx} chance={123} icon={coin?.icon} symbol={coin.id} marketCap={coin.marketCap} label={coin.name} />
          ))}
        </>
      )}
    </Observer>
  );
};

export default RecentTransactionsList;
