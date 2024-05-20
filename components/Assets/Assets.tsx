'use client';

import { useCoinsContext } from '@/providers/crypto/CoinsProvider';
import { Tabs, TabsContent, TabsList, TabsTrigger, triggerClasses } from '../ui/tabs';
import AssetsTable from './AssetsTable';

const Assets = () => {
  const {
    coinsStore: { assets },
  } = useCoinsContext();

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
        </div>
        <TabsContent className="mt-5 gap-2" value="myAssets">
          <AssetsTable coins={assets} />
        </TabsContent>
        <TabsContent className="mt-5 gap-2" value="categories">
          <AssetsTable coins={assets} />
        </TabsContent>
        <TabsContent className="mt-5 gap-2" value="hot">
          <AssetsTable coins={assets} />
        </TabsContent>
        <TabsContent className="mt-5 gap-2" value="newListed">
          <AssetsTable coins={assets} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Assets;
