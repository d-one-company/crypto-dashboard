import DummyChart, { data } from '@/components/DummyChart';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { cloneElement } from 'react';

type Props = {
  icon: JSX.Element;
  label: string;
  symbol: string;
  marketCap: number;
  marketCapColor: string;
  chance: number;
};

const RecentTransaction = ({ icon, label, symbol, marketCap, marketCapColor, chance }: Props) => {
  return (
    <div className="grid grid-cols-5 items-center gap-5 rounded-xl bg-card-dark p-5 shadow-card">
      <div className="flex items-center gap-6">
        {cloneElement(icon, { width: 26, height: 26 })}
        <div className="flex flex-col gap-0.5 text-xs">
          <p className="text-white">{label}</p>
          <p className="text-foreground-dark">{symbol}</p>
        </div>
      </div>
      <div className="flex flex-col gap-0.5 text-xs">
        <p className="text-white">Market Cap</p>
        <p className={cn('text-red-500', marketCapColor)}>{`$${Intl.NumberFormat('en', { currency: 'USD' }).format(marketCap)}`}</p>
      </div>
      <div className="flex flex-col gap-0.5 text-xs">
        <p className="text-white">24h chance</p>
        <p className="text-green-500">+{Intl.NumberFormat('en').format(chance)}%</p>
      </div>
      <div className="flex flex-col gap-0.5 text-xs">
        <DummyChart data={data} curve="basis" />
      </div>
      <Button className="ml-auto w-fit rounded-xl bg-white px-4 py-2 text-black shadow-button">Trade</Button>
    </div>
  );
};

RecentTransaction.defaultProps = {
  marketCapColor: 'text-red-500',
};

export default RecentTransaction;
