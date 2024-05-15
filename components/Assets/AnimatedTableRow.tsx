import { Coin } from '@/providers/crypto/useCoinsStore';
import { PropsWithChildren, useEffect, useRef, useState } from 'react';
import { TableRow } from '../ui/table';

type Props = { coin: Coin };

const AnimatedTableRow = ({ coin, children }: PropsWithChildren<Props>) => {
  const [highlightColor, setHighlightColor] = useState<string | undefined>();
  const prevPrice = useRef(coin.priceUsd);

  useEffect(() => {
    if (coin.priceUsd !== prevPrice.current) {
      const newHighlightColor = coin.priceUsd > prevPrice.current ? 'bg-green-600/50' : 'bg-red-600/50';
      setHighlightColor(newHighlightColor);
      prevPrice.current = coin.priceUsd;

      const resetColorTimeout = setTimeout(() => {
        setHighlightColor(undefined);
      }, 1000);

      return () => clearTimeout(resetColorTimeout);
    }
  }, [coin.priceUsd]);

  return (
    <TableRow className={`border-b-gray-jumbo transition-all duration-700 ${highlightColor}`} key={coin.id}>
      {children}
    </TableRow>
  );
};

export default AnimatedTableRow;
