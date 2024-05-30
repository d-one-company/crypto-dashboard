import { Button } from './ui/button';

type Props = {
  name: string;
  amount: number;
  value: string;
  icon: React.ReactNode;
};

const TokenItem = ({ name, amount, value, icon }: Props) => {
  return (
    <div className="flex w-full justify-between rounded-lg border border-baltic-sea bg-card-dark p-3">
      <div className="flex items-center gap-2">
        <div className="rounded-xl border border-baltic-sea bg-baltic-sea/50 p-3">{icon}</div>
        <div className="flex flex-col items-start gap-2">
          <span className="flex items-center gap-1">
            <p className="text-sm font-semibold text-grayish-white">{value}</p>
            <p className="text-sm text-gray-200/50">{name}</p>
          </span>
          <p className="text-sm text-gray-200/50">{amount}</p>
        </div>
      </div>
      <Button className="bg-gradient-to-r from-baltic-sea via-black-shark to-baltic-sea text-grayish-white">Withdraw</Button>
    </div>
  );
};

export default TokenItem;
