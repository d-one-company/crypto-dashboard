import { Bell } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

type Props = {
  title: string;
};

const PageHeader = ({ title }: Props) => {
  return (
    <div className="flex w-full justify-between">
      <p className="text-3xl text-grayish-white">{title}</p>
      <div className="flex items-center gap-4">
        <Input placeholder="Search" className="focus-visible:ring-offset h-11 focus-visible:ring-0" />
        <div className="rounded-lg bg-[#262628] p-2">
          <Bell />
        </div>
        <Button className="w-full bg-grayish-white text-black transition-colors duration-200 hover:bg-grayish-white/80">Deposit</Button>
      </div>
    </div>
  );
};

export default PageHeader;
