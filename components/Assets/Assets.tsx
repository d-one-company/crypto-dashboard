'use client';

import { useCoinsContext } from '@/providers/crypto/CoinsProvider';
import { Tabs, TabsContent, TabsList, TabsTrigger, triggerClasses } from '../ui/tabs';
import AssetsTable from './AssetsTable';

const Assets = () => {
  const {
    coinsStore: { coins },
  } = useCoinsContext();

  const threeCurrenciesIds = ['monero', 'xrp', 'litecoin'];
  const threeCurrencies = coins.filter(coin => threeCurrenciesIds.includes(coin.id)).slice(0, 3);
  return (
    <div className="flex flex-col gap-3 rounded-lg border border-baltic-sea px-7 py-5">
      <p className="text-xl text-grayish-white">Assets</p>
      <Tabs defaultValue="myAssets">
        <div className="flex w-full items-center justify-between">
          <TabsList className="gap-2">
            <TabsTrigger className={triggerClasses} value="myAssets">
              My Assets
            </TabsTrigger>
            <TabsTrigger className={triggerClasses} value="categories">
              Categories
            </TabsTrigger>
            <div className="h-[20px] w-[2px] bg-tuna-778" />
            <TabsTrigger className={triggerClasses} value="hot">
              Hot
            </TabsTrigger>
            <TabsTrigger className={triggerClasses} value="newListed">
              New listed
            </TabsTrigger>
          </TabsList>
          <div className="flex items-center gap-2 text-grayish-white">
            <p className="rounded-lg bg-black-shark px-3 py-2 text-xs">1D</p>
            <p className="rounded-lg px-3 py-2 text-xs">2W</p>
            <p className="rounded-lg px-3 py-2 text-xs">1M</p>
          </div>
        </div>
        <TabsContent className="mt-5 gap-2" value="myAssets">
          <AssetsTable coins={threeCurrencies} />
        </TabsContent>
        <TabsContent className="mt-5 gap-2" value="categories">
          <AssetsTable coins={threeCurrencies} />
        </TabsContent>
        <TabsContent className="mt-5 gap-2" value="hot">
          <AssetsTable coins={threeCurrencies} />
        </TabsContent>
        <TabsContent className="mt-5 gap-2" value="newListed">
          <AssetsTable coins={threeCurrencies} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Assets;
