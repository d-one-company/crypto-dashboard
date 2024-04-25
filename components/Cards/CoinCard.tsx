import { ArrowUpRight, RussianRuble } from 'lucide-react';
import { Button } from '../ui/button';

type Props = {};

const CoinCard = (props: Props) => {
  return (
    <div className="flex flex-col gap-3 rounded-lg border border-[#27262B] px-7 py-5">
      <div className="flex w-full items-center justify-between">
        <div className="w-fit rounded-xl border border-[#27262B] bg-[#1C1C21]/50 p-5">
          <RussianRuble />
        </div>
        <div className="w-fit rounded-full border border-[#27262B] bg-[#1C1C21]/50 p-3">
          <ArrowUpRight />
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-grayish-white flex items-center gap-1 text-lg">
          Monero <p className="text-lg text-gray-200/50">Xmr</p>
        </span>
        <p className="text-sm text-gray-200/50">Hot on binance</p>
      </div>
      <div className="flex flex-col items-start gap-2">
        <div className="flex w-full items-center justify-between">
          <p className="text-xs text-gray-200/50">Price</p>
          <p className="text-grayish-white text-sm">$60</p>
        </div>
        <div className="flex w-full items-center justify-between">
          <p className="text-xs text-gray-200/50">Volume</p>
          <p className="text-grayish-white text-sm">507.2</p>
        </div>
      </div>
      <div className="flex items-center gap-5">
        <Button className="text-grayish-white w-full bg-gradient-to-r from-[#1E1D21] via-[#303135] to-[#1E1D21]">
          Transfer
        </Button>
        <Button className="w-full">Trade</Button>
      </div>
    </div>
  );
};

export default CoinCard;
