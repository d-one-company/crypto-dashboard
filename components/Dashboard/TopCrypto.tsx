'use client';

import { useCoinsContext } from '@/providers/crypto/CoinsProvider';
import { Observer } from 'mobx-react-lite';

const TopCrypto = () => {
  const {
    coinsStore: { coins },
  } = useCoinsContext();

  const threeCoinsIds = ['bitcoin', 'ethereum', 'binance-coin'];

  return (
    <Observer>
      {() => (
        <div className="min-w-[400px] rounded-xl bg-card-dark p-5 shadow-card">
          <div className="flex items-center justify-between">
            <p className="text-sm">Top cryptocurrencies</p>
            <p className="text-sm">Price</p>
          </div>
          <div className="flex h-full flex-col justify-between gap-2 py-5 text-xs">
            {coins
              .filter(coin => threeCoinsIds.includes(coin.id))
              .slice(0, 3)
              .map(coin => (
                <div key={coin?.id} className="flex items-center gap-3">
                  {coin.icon}
                  <p className="flex grow justify-between gap-2 text-white">
                    <span>
                      {coin?.name} ({coin?.symbol})
                    </span>
                    <span>${new Intl.NumberFormat('en').format(coin?.priceUsd ?? 0)}</span>
                  </p>
                </div>
              ))}
          </div>
        </div>
      )}
    </Observer>
  );
};

export default TopCrypto;
