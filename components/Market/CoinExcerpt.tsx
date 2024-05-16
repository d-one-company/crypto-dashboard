import generateChartData from '@/lib/utils/generateChartData';
import { Coin } from '@/providers/crypto/useCoinsStore';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { ArrowDownIndicator, ArrowUpIndicator } from '../ArrowIndicators';
import PriceChart from '../PriceChart';
import { Bitcoin } from '../icons';

type CoinExcerptProps = { coin: Coin };

const CoinExcerpt = observer(({ coin }: CoinExcerptProps) => {
  const [arrow, setArrow] = useState(<ArrowUpIndicator />);
  const [prevPrice, setPrevPrice] = useState(coin.priceUsd);

  useEffect(() => {
    if (coin.priceUsd !== prevPrice) {
      const newArrow = coin.priceUsd > prevPrice ? <ArrowUpIndicator /> : <ArrowDownIndicator />;
      setArrow(newArrow);

      setPrevPrice(coin.priceUsd);
    }
  }, [coin.priceUsd, prevPrice]);

  return (
    <div className="grid h-[65px] grid-cols-5 items-center border-b border-b-gray-jumbo text-sm">
      <div className="flex items-center gap-2">
        <div>{coin.icon ? coin.icon : <Bitcoin />}</div>
        <div className="flex flex-col text-xs">
          <span className="text-white">{coin.name}</span>
          <span className="text-foreground-dark">{coin.symbol}</span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {arrow}
        {new Intl.NumberFormat('en').format(coin.priceUsd)}
      </div>
      <div>
        <span className="w-fit rounded-xl bg-white px-1.5 text-black">{new Intl.NumberFormat('en').format(coin.changePercent24Hr)}%</span>
      </div>
      <div>{new Intl.NumberFormat('en').format(coin.volumeUsd24Hr)}</div>
      <div>
        <PriceChart data={[generateChartData(coin)]} curve="basis" />
      </div>
    </div>
  );
});

export default CoinExcerpt;
