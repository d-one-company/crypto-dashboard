import { Coin } from '@/providers/crypto/useCoinsStore';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { ArrowDownIndicator, ArrowUpIndicator } from '../ArrowIndicators';

type Props = { coin: Coin };

const CryptoPrice = observer(({ coin }: Props) => {
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
      {new Intl.NumberFormat('en').format(coin?.priceUsd ?? 0)}
      {arrow}
    </div>
  );
});

export default CryptoPrice;
