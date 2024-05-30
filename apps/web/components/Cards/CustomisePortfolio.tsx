import { cn } from '@/lib/utils';
import { Vault } from 'lucide-react';
import { Button } from '../ui/button';

const CustomisePortfolio = () => {
  const rightBackground = 'bg-gradient-to-r from-black-shark via-tuna-778 to-black-shark';
  const bottomBackground = 'bg-gradient-to-b from-cherade to-transparent';

  return (
    <div className="flex flex-grow flex-col items-start gap-6 rounded-lg border border-black-shark bg-gradient-to-br from-baltic-sea to-card-dark py-6">
      <div className="flex items-center gap-2 px-4">
        <div className={cn('rounded-full p-3', rightBackground)}>
          <Vault />
        </div>
        <div className="flex flex-col gap-2">
          <div className={cn('h-[15px] w-full rounded-lg', rightBackground)} />
          <div className={cn('h-[25px] w-full rounded-lg', rightBackground)} />
        </div>
      </div>
      <div className="w-full px-4">
        <div className="flex w-full flex-col gap-3 rounded-lg border border-tuna-778 bg-gradient-to-br from-baltic-sea to-card-dark px-8 py-3">
          <div className="flex w-full justify-between">
            <div className={cn('h-[15px] w-[70px] rounded-lg', bottomBackground)} />
            <div className={cn('size-3 rounded-full', bottomBackground)} />
          </div>
          <div className={cn('h-[25px] w-full rounded-lg', bottomBackground)} />
        </div>
      </div>

      <div className="flex flex-col items-start gap-3 px-4">
        <p className="text-grayish-white">Customise your Portfolio</p>
        <p className="text-sm text-gray-jumbo">
          A currated collection showcasing my diverse <br /> range of skills, experties and accomplishments.
        </p>
      </div>
      <div className="h-[1px] w-full bg-baltic-sea" />
      <div className="w-full px-4">
        <Button className="mt-4 w-full bg-grayish-white text-black transition-colors duration-200 hover:bg-grayish-white/80">Getting Started</Button>
      </div>
    </div>
  );
};

export default CustomisePortfolio;
