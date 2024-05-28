'use client';

import { useTradesContext } from '@/providers/crypto/TradesProvider';
import { Observer } from 'mobx-react-lite';
import Chart from './Chart';
import Time from './Time';

const CoinChartCard = () => {
  const {
    tradesStore: { trades },
  } = useTradesContext();

  return (
    <div className="flex flex-col gap-3 rounded-lg border border-baltic-sea bg-card-dark py-5">
      <div className="flex items-center gap-1 px-7">
        <p className="text-xl text-grayish-white">ETH/USDT</p>
        <Time />
      </div>
      <div className="flex items-center gap-8 px-7">
        <div className="flex items-center gap-3 text-xs text-alto">
          <div className="h-[5px] w-[10px] rounded-lg bg-alto" />
          Buy
        </div>
        <div className="text-navada flex items-center gap-3 text-xs">
          <div className="bg-navada h-[5px] w-[10px] rounded-lg bg-nevada" />
          Sell
        </div>
      </div>
      <div className="h-[240px] w-[550px] px-7">
        <Observer>{() => <Chart trades={trades} />}</Observer>
      </div>
    </div>
  );
};

export default CoinChartCard;
