import dayjs from 'dayjs';
import { cache } from 'react';

type Trades = {
  result: Result;
};

type Result = {
  [key: string]: Array<Array<number | string>>;
};

export type TradesData = {
  day: string;
  buyVolume: number;
  sellVolume: number;
};

type Props = {
  pair: string;
  since?: number;
  count?: number;
};

export async function getTrades({ pair, since, count }: Props) {
  const url = new URL('https://api.kraken.com/0/public/Trades');

  url.searchParams.append('pair', pair);
  if (since) url.searchParams.append('since', since.toString());
  if (count) url.searchParams.append('count', count.toString());

  const response = await fetch(url);
  const json = (await response.json()) as Trades;

  const firstKey = Object.keys(json.result)[0];
  const result = json.result[firstKey];

  const tradesByDay: { [key: string]: TradesData } = {};

  for (let i = 0; i < result.length; i++) {
    const [, volume, time, type] = result[i];
    const day = dayjs(Number(time) * 1000).format('YYYY-MM-DD');

    if (!tradesByDay[day])
      tradesByDay[day] = {
        day,
        buyVolume: 0,
        sellVolume: 0,
      };

    if (type === 'b') tradesByDay[day].buyVolume += parseFloat(String(volume));
    else tradesByDay[day].sellVolume += parseFloat(String(volume));
  }

  const trades: TradesData[] = Object.values(tradesByDay);

  return trades;
}

async function getLast7DaysTrades() {
  const getDayUnix = (day: number) => dayjs().subtract(day, 'day').startOf('day').unix();

  const trades = await Promise.all([
    getTrades({ pair: 'ETHUSDT', since: getDayUnix(7) }),
    getTrades({ pair: 'ETHUSDT', since: getDayUnix(6) }),
    getTrades({ pair: 'ETHUSDT', since: getDayUnix(5) }),
    getTrades({ pair: 'ETHUSDT', since: getDayUnix(4) }),
    getTrades({ pair: 'ETHUSDT', since: getDayUnix(3) }),
    getTrades({ pair: 'ETHUSDT', since: getDayUnix(2) }),
    getTrades({ pair: 'ETHUSDT', since: getDayUnix(1) }),
    getTrades({ pair: 'ETHUSDT', since: getDayUnix(0) }),
  ]);

  return trades.flat();
}

export const getLast7DaysTradesCached = cache(getLast7DaysTrades);
