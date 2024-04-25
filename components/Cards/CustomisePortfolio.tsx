import { cn } from '@/lib/utils';
import { Vault } from 'lucide-react';
import { Button } from '../ui/button';

const CustomisePortfolio = () => {
  const rightBackground =
    'bg-gradient-to-r from-[#282830] via-[#33303B] to-[#282830]';

  const bottomBackground = 'bg-gradient-to-b from-[#2D2C36] to-transparent';

  return (
    <div className="flex flex-col items-start gap-6 rounded-lg border border-[#232329] bg-gradient-to-br from-[#27262A] to-[#1D1C20] py-6">
      <div className="flex items-center gap-2 px-4">
        <div className={cn('rounded-full p-3', rightBackground)}>
          <Vault />
        </div>
        <div className="flex w-[200px] flex-col gap-2">
          <div className={cn('h-[15px] w-full rounded-lg', rightBackground)} />
          <div className={cn('h-[25px] w-full rounded-lg', rightBackground)} />
        </div>
      </div>
      <div className="w-full px-4">
        <div className="flex w-full flex-col gap-3 rounded-lg border border-[#34333B] bg-gradient-to-br from-[#27262A] to-[#1D1C20] px-8 py-3">
          <div className="flex w-full justify-between">
            <div
              className={cn('h-[15px] w-[70px] rounded-lg', bottomBackground)}
            />
            <div className={cn('size-3 rounded-full', bottomBackground)} />
          </div>
          <div className={cn('h-[25px] w-full rounded-lg', bottomBackground)} />
        </div>
      </div>

      <div className="flex flex-col items-start gap-3 px-4">
        <p className="text-grayish-white">Customise your Portfolio</p>
        <p className="text-sm text-[#727274]">
          A currated collection showcasing my diverse <br /> range of skills,
          experties and accomplishments.
        </p>
      </div>
      <div className="h-[1px] w-full bg-[#2B2A2D]" />
      <div className="w-full px-4">
        <Button className="mt-4 w-full">Getting Started</Button>
      </div>
    </div>
  );
};

export default CustomisePortfolio;
