import TradesProvider from '@/providers/crypto/TradesProvider';
import { type TradesData } from 'shared';
import Chart from './Chart';
import Time from './Time';

export const revalidate = 0;

const CoinChartCard = async () => {
  const tradesUrl = `${process.env.NEXT_PUBLIC_TRADE_SERVER_URL}/trades`;
  const response = await fetch(tradesUrl, { cache: 'no-store' });
  const trades = (await response.json()) as TradesData[];

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
        <TradesProvider initialTrades={trades}>
          <Chart />
        </TradesProvider>
      </div>
    </div>
  );
};

export default CoinChartCard;
