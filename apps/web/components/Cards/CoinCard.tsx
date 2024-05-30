import { ArrowUpRight, RussianRuble } from 'lucide-react';
import { Button } from '../ui/button';

const CoinCard = () => {
  return (
    <div className="flex flex-col gap-3 rounded-lg border border-baltic-sea px-7 py-5">
      <div className="flex w-full items-center justify-between">
        <div className="w-fit rounded-xl border border-baltic-sea bg-black-shark/50 p-5">
          <RussianRuble />
        </div>
        <div className="w-fit rounded-full border border-baltic-sea bg-black-shark/50 p-3">
          <ArrowUpRight />
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <span className="flex items-center gap-1 text-lg text-grayish-white">
          Monero <p className="text-lg text-gray-200/50">Xmr</p>
        </span>
        <p className="text-sm text-gray-200/50">Hot on binance</p>
      </div>
      <div className="flex flex-col items-start gap-2">
        <div className="flex w-full items-center justify-between">
          <p className="text-xs text-gray-200/50">Price</p>
          <p className="text-sm text-grayish-white">$60</p>
        </div>
        <div className="flex w-full items-center justify-between">
          <p className="text-xs text-gray-200/50">Volume</p>
          <p className="text-sm text-grayish-white">507.2</p>
        </div>
      </div>
      <div className="flex items-center gap-5">
        <Button className="w-full bg-gradient-to-r from-baltic-sea via-black-shark to-baltic-sea text-grayish-white">Transfer</Button>
        <Button className="w-full bg-grayish-white text-black transition-colors duration-200 hover:bg-grayish-white/80">Trade</Button>
      </div>
    </div>
  );
};

export default CoinCard;
