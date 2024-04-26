'use client';

import { ResponsiveBar } from '@nivo/bar';

const CoinChartCard = () => {
  const dummyData = [
    {
      coin: 'AD',
      buy: 47,
      buyColor: 'hsl(69, 70%, 50%)',
      sell: 82,
      sellColor: 'hsl(114, 70%, 50%)',
    },
    {
      coin: 'AE',
      buy: 77,
      buyColor: 'hsl(129, 70%, 50%)',
      sell: 145,
      sellColor: 'hsl(282, 70%, 50%)',
    },
    {
      coin: 'AF',
      buy: 174,
      buyColor: 'hsl(140, 70%, 50%)',
      sell: 102,
      sellColor: 'hsl(99, 70%, 50%)',
    },
    {
      coin: 'AG',
      buy: 71,
      buyColor: 'hsl(194, 70%, 50%)',
      sell: 15,
      sellColor: 'hsl(226, 70%, 50%)',
    },
    {
      coin: 'AI',
      buy: 80,
      buyColor: 'hsl(130, 70%, 50%)',
      sell: 30,
      sellColor: 'hsl(61, 70%, 50%)',
    },
    {
      coin: 'AL',
      buy: 98,
      buyColor: 'hsl(54, 70%, 50%)',
      sell: 172,
      sellColor: 'hsl(299, 70%, 50%)',
    },
    {
      coin: 'AM',
      buy: 125,
      buyColor: 'hsl(60, 70%, 50%)',
      sell: 157,
      sellColor: 'hsl(299, 70%, 50%)',
    },
  ];

  return (
    <div className="flex flex-col gap-3 rounded-lg border border-baltic-sea bg-card-dark py-5">
      <div className="flex items-center gap-1 px-7">
        <p className="text-xl text-grayish-white">ETH/USDT</p>
        <p className="text-xs text-gray-200/50">3:45 AM (UTC + 5)</p>
      </div>
      <div className="flex items-center gap-8 px-7">
        <div className="flex items-center gap-3 text-xs text-alto">
          <div className="h-[5px] w-[10px] rounded-lg bg-alto" />
          Buy
        </div>
        <div className="text-navada flex items-center gap-3 text-xs">
          <div className="bg-navada h-[5px] w-[10px] rounded-lg" />
          Sell
        </div>
      </div>
      <div className="h-[240px] w-[550px] px-7">
        <ResponsiveBar
          data={dummyData}
          keys={['buy', 'sell']}
          indexBy="coin"
          colors={['#DCDCDC', '#6E6D6F']}
          groupMode="grouped"
          innerPadding={3}
          borderRadius={5}
          layers={['grid', 'bars']}
          theme={{
            grid: {
              line: {
                stroke: '#2E2D32',
              },
            },
          }}
        />
      </div>
      <div className="h-[1px] w-full bg-baltic-sea" />
      <div className="flex w-full items-center justify-between px-7">
        <p className="text-xl text-grayish-white">8.9%</p>
        <div className="flex items-center gap-1">
          <p className="rounded-xl bg-white px-1.5 text-xs text-black">+2%</p>
          <p className="text-xs text-gray-200/50">vs last week</p>
        </div>
      </div>
    </div>
  );
};

export default CoinChartCard;
