'use client';

import { Trade } from '@/providers/crypto/useTradesStore';
import * as Tooltip from '@radix-ui/react-tooltip';
import dayjs from 'dayjs';
import { observer } from 'mobx-react-lite';

type Props = { trades: Trade[] };

const Chart = observer(({ trades }: Props) => {
  const maxVolume = Math.max(...trades.map(trade => trade.volume));
  const minHeight = 10;
  const maxHeight = 240;

  const tradesWithHeight = trades.map(trade => {
    const height = (trade.volume / maxVolume) * (maxHeight - minHeight) + minHeight;
    return {
      ...trade,
      height,
    };
  });

  return (
    <div className="flex h-full w-full items-end gap-1">
      {tradesWithHeight.map((trade, idx) => (
        <Tooltip.Provider key={idx}>
          <Tooltip.Root delayDuration={0}>
            <Tooltip.Trigger asChild>
              <div key={idx} className="group relative flex h-full flex-1 cursor-crosshair items-end">
                <div className="absolute left-1/2 hidden h-full border-l border-dashed border-gray-50 mix-blend-difference group-hover:block" />
                <div
                  className="flex-1 rounded-sm"
                  style={{
                    backgroundColor: trade.direction === 'buy' ? '#DCDCDC' : '#6E6D6F',
                    height: trade.height,
                  }}
                />
              </div>
            </Tooltip.Trigger>
            <Tooltip.Content side="bottom" sideOffset={5} className="mx-1 rounded-lg border-none bg-grayish-white p-2 text-sm text-black">
              <p>Direction: {trade.direction === 'buy' ? 'Buy' : 'Sell'}</p>
              <p>Volume: {trade.volume}</p>
              <p>Timestamp: {dayjs(trade.timestamp).format('MMM DD, YYYY HH:mm:ss')}</p>
              <Tooltip.Arrow className="fill-grayish-white" />
            </Tooltip.Content>
          </Tooltip.Root>
        </Tooltip.Provider>
      ))}
    </div>
  );
});

export default Chart;
