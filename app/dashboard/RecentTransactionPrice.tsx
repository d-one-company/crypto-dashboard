import { ArrowDownIndicator, ArrowUpIndicator } from '@/components/ArrowIndicators';
import { Coin } from '@/providers/crypto/useCoinsStore';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
type Props = { coin: Coin };

const RecentTransactionPrice = observer(({ coin }: Props) => {
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
    <div className="flex items-center gap-2">
      {arrow}
      <div className="flex flex-col justify-center gap-0.5 text-xs">
        <span className="text-white">Price</span>
        <span className="flex items-center gap-2 text-foreground-dark">{Intl.NumberFormat('en', { style: 'currency', currency: 'USD' }).format(coin.priceUsd)}</span>
      </div>
    </div>
  );
});

export default RecentTransactionPrice;
