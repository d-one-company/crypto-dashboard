'use client';

import { BAR_BUY_COLOR, BAR_MAX_HEIGHT, BAR_MIN_HEIGHT, BAR_NEUTRAL_COLOR, BAR_SELL_COLOR } from '@/lib/constants/bar';
import { cn } from '@/lib/utils';
import { useTradesContext } from '@/providers/crypto/TradesProvider';
import * as Tooltip from '@radix-ui/react-tooltip';
import dayjs from 'dayjs';
import { Observer, observer } from 'mobx-react-lite';
import { MAX_BARS } from 'shared';
import Bar from './Bar';

const Chart = observer(() => {
  const {
    tradesStore: { trades },
  } = useTradesContext();

  const maxVolume = Math.max(...trades.map(trade => Math.max(trade.buy.volume, trade.sell.volume)));

  const parsedTrades = trades.map(trade => {
    const volume = Math.max(trade.buy.volume, trade.sell.volume);
    const height = (volume / maxVolume) * (BAR_MAX_HEIGHT - BAR_MIN_HEIGHT) + BAR_MIN_HEIGHT;
    const color = trade.open < trade.close ? BAR_BUY_COLOR : BAR_SELL_COLOR;

    return {
      ...trade,
      height,
      color,
    };
  });

  return (
    <Observer>
      {() => (
        <div className="flex h-full w-full items-end gap-1">
          {parsedTrades.map((trade, idx) => (
            <Tooltip.Provider key={idx}>
              <Tooltip.Root delayDuration={0}>
                <Tooltip.Trigger asChild>
                  <Bar key={idx} color={trade.color} height={trade.height} />
                </Tooltip.Trigger>
                <Tooltip.Content side="bottom" sideOffset={5} className={cn('mx-1 rounded-lg border-none bg-grayish-white p-2 text-xs text-black', !trade.interval && 'hidden')}>
                  <p className="mb-0.5">{dayjs(trade.interval).format("DD MMM 'YY h:mm A")}</p>
                  <p>Buy volume: {trade.buy.volume.toFixed(4)}</p>
                  <p>Sell volume: {trade.sell.volume.toFixed(4)}</p>
                  <p>
                    {trade.buy.count} buys / {trade.sell.count} sells
                  </p>
                  <Tooltip.Arrow className="fill-grayish-white" />
                </Tooltip.Content>
              </Tooltip.Root>
            </Tooltip.Provider>
          ))}
          {parsedTrades.length < MAX_BARS &&
            Array(MAX_BARS - parsedTrades.length)
              .fill(0)
              .map((_, idx) => <Bar key={idx} color={BAR_NEUTRAL_COLOR} height={BAR_MIN_HEIGHT} />)}
        </div>
      )}
    </Observer>
  );
});

export default Chart;
