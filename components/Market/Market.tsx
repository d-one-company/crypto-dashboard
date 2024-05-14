'use client';

import { useCoinsContext } from '@/providers/crypto/CoinsProvider';
import AssetsTable from '../Assets/AssetsTable';
import InfoContainer from './InfoContainer';

const formatNumber = (number: number): string => {
  return number.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
};

const Market = () => {
  const {
    coinsStore: { coins },
  } = useCoinsContext();

  const totalMarketCap = coins.reduce((acc, coin) => {
    const marketCapValue = parseFloat(String(coin.marketCapUsd));
    return acc + (marketCapValue || 0);
  }, 0);

  const totalVolume24Hr = coins.reduce((acc, coin) => {
    const volumeValue = parseFloat(String(coin.volumeUsd24Hr));
    return acc + (volumeValue || 0);
  }, 0);

  const btc = coins.find(coin => coin.id === 'bitcoin');

  const btcMarketCap = btc ? btc.marketCapUsd : 0;
  const btcDominance = (btcMarketCap / totalMarketCap) * 100;

  return (
    <div className="flex w-full flex-col gap-10">
      <h1 className="mt-20 self-center text-2xl font-bold">Today&apos;s Crypto Prices by Market Cap</h1>
      <div className="flex w-full justify-between gap-10">
        <InfoContainer text="Market Cap" percentage={12} value={`$${formatNumber(totalMarketCap)}`} />
        <InfoContainer text="Volume 24h" percentage={12} value={`$${formatNumber(totalVolume24Hr)}`} />
        <InfoContainer text="BTC Dominance" percentage={12} value={`${formatNumber(btcDominance)}%`} />
      </div>
      <AssetsTable coins={coins} />
    </div>
  );
};

export default Market;
