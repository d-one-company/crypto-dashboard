'use client';

import { Coin } from '@/providers/crypto/useCoinsStore';
import { Observer, observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { ArrowDownIndicator, ArrowUpIndicator } from './ArrowIndicators';
import { TableCell } from './ui/table';

type Props = { coin: Coin };

const PriceCell = observer(({ coin }: Props) => {
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
    <Observer>
      {() => (
        <TableCell className="flex items-center gap-2">
          {arrow}
          <span className="flex w-[90px]">{new Intl.NumberFormat('en').format(coin.priceUsd)}</span>
        </TableCell>
      )}
    </Observer>
  );
});

export default PriceCell;
