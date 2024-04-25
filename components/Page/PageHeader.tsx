import { Bell } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

type Props = {
  title: string;
};

const PageHeader = ({ title }: Props) => {
  return (
    <div className="flex w-full justify-between">
      <p className="text-grayish-white text-3xl">{title}</p>
      <div className="flex items-center gap-4">
        <Input
          placeholder="Search"
          className="h-11 focus-visible:ring-0 focus-visible:ring-offset-0"
        />
        <div className="rounded-lg bg-[#262628] p-2">
          <Bell />
        </div>
        <Button>Deposit</Button>
      </div>
    </div>
  );
};

export default PageHeader;
