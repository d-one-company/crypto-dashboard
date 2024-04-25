import { Button } from './ui/button';

type Props = {
  name: string;
  amount: number;
  value: string;
  icon: React.ReactNode;
};

const TokenItem = ({ name, amount, value, icon }: Props) => {
  return (
    <div className="flex w-full justify-between rounded-lg border border-[#27262B] bg-[#1D1C20] p-3">
      <div className="flex items-center gap-2">
        <div className="rounded-xl border border-[#27262B] bg-[#282429]/50 p-3">
          {icon}
        </div>
        <div className="flex flex-col items-start gap-2">
          <span className="flex items-center gap-1">
            <p className="text-grayish-white text-sm font-semibold">{value}</p>
            <p className="text-sm text-gray-200/50">{name}</p>
          </span>
          <p className="text-sm text-gray-200/50">{amount}</p>
        </div>
      </div>
      <Button className="text-grayish-white bg-gradient-to-r from-[#1E1D21] via-[#303135] to-[#1E1D21]">
        Withdraw
      </Button>
    </div>
  );
};

export default TokenItem;
