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

/**
 * <RecentTransaction icon={<Bitcoin />} label="Bitcoin" symbol="BTC" chance={1.41} marketCap={24413.23} marketCapColor="text-red-500" />
      <RecentTransaction icon={<Ethereum />} label="Ethereum" symbol="ETH" chance={1.41} marketCap={1253.23} marketCapColor="text-blue-500" />
      <RecentTransaction icon={<Tether />} label="Tether" symbol="USDT" chance={1.41} marketCap={314224.12} marketCapColor="text-green-500" />
 */
