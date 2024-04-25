import { cn } from '@/lib/utils';
import { CircleDollarSign } from 'lucide-react';
import TokenItem from './TokenItem';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

type Props = {};

const TypeOfTokens = (props: Props) => {
  const triggerClasses = cn(
    'data-[state=active]:bg-gradient-to-b from-[#2D2C36] to-[#1D1C21] hover:bg-gray-100/10 rounded-lg text-grayish-white'
  );

  const dummyData = [
    {
      name: 'Xim',
      amount: 7500,
      value: '17,600.65',
      icon: <CircleDollarSign />,
    },
    {
      name: 'Houbi',
      amount: 4377,
      value: '25,380.55',
      icon: <CircleDollarSign />,
    },
    {
      name: 'Okb',
      amount: 2200,
      value: '1,478.37',
      icon: <CircleDollarSign />,
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <p className="text-grayish-white max-w-[250px] px-1 text-2xl">
        Type of tokens in my portfolio
      </p>
      <Tabs defaultValue="allMarket" className="w-[350px]">
        <TabsList className="gap-2">
          <TabsTrigger className={triggerClasses} value="allMarket">
            All market
          </TabsTrigger>
          <TabsTrigger className={triggerClasses} value="crypto">
            Crypto
          </TabsTrigger>
          <TabsTrigger className={triggerClasses} value="usdt">
            USDT
          </TabsTrigger>
          <TabsTrigger className={triggerClasses} value="bnb">
            BNB
          </TabsTrigger>
        </TabsList>
        <TabsContent className="mt-5 gap-2" value="allMarket">
          <div className="flex flex-col items-start gap-2">
            {dummyData.map(item => (
              <TokenItem key={item.name} {...item} />
            ))}
          </div>
        </TabsContent>
        <TabsContent className="mt-5 gap-2" value="crypto">
          <div className="flex flex-col items-start gap-2">
            {dummyData.map(item => (
              <TokenItem key={item.name} {...item} />
            ))}
          </div>
        </TabsContent>
        <TabsContent className="mt-5 gap-2" value="usdt">
          <div className="flex flex-col items-start gap-2">
            {dummyData.map(item => (
              <TokenItem key={item.name} {...item} />
            ))}
          </div>
        </TabsContent>
        <TabsContent className="mt-5 gap-2" value="bnb">
          <div className="flex flex-col items-start gap-2">
            {dummyData.map(item => (
              <TokenItem key={item.name} {...item} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TypeOfTokens;
