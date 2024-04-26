'use client';

import { ResponsiveLine } from '@nivo/line';
import { CircleDollarSign } from 'lucide-react';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger, triggerClasses } from '../ui/tabs';
import AssetsTable from './AssetsTable';

const Assets = () => {
  const chartData = [
    {
      id: 'stellar',
      color: 'hsl(310, 70%, 50%)',
      data: [
        {
          x: '1',
          y: 8,
        },
        {
          x: '2',
          y: 7,
        },
        {
          x: '3',
          y: 13,
        },
        {
          x: '4',
          y: 13,
        },
        {
          x: '5',
          y: 9,
        },
      ],
    },
  ];

  const dummyData = [
    {
      id: '1',
      coin: (
        <div className="flex items-center gap-2 text-sm text-grayish-white">
          <CircleDollarSign />
          Stellar <p className="text-cs text-gray-200/50">Xml</p>
        </div>
      ),
      latestPrice: '$10.31',
      dynamic: '11.94%',
      volume: '507.2',
      chart: (
        <div className="h-[40px] w-[100px]">
          <ResponsiveLine colors={'white'} data={chartData} layers={['lines']} enableSlices="x" enableTouchCrosshair margin={{ bottom: -10 }} curve="basis" />
        </div>
      ),
      action: <Button className="w-fit bg-gradient-to-r from-[#1E1D21] via-[#303135] to-[#1E1D21] text-grayish-white">Trade</Button>,
    },
    {
      id: '2',
      coin: (
        <div className="flex items-center gap-2 text-sm text-grayish-white">
          <CircleDollarSign />
          Hedera <p className="text-cs text-gray-200/50">Hbar</p>
        </div>
      ),
      latestPrice: '$10.31',
      dynamic: '11.94%',
      volume: '507.2',
      chart: (
        <div className="h-[40px] w-[100px]">
          <ResponsiveLine colors={'white'} data={chartData} layers={['lines']} enableSlices="x" enableTouchCrosshair margin={{ bottom: -10 }} curve="basis" />
        </div>
      ),
      action: <Button className="w-fit bg-gradient-to-r from-[#1E1D21] via-[#303135] to-[#1E1D21] text-grayish-white">Trade</Button>,
    },
    {
      id: '3',
      coin: (
        <div className="flex items-center gap-2 text-sm text-grayish-white">
          <CircleDollarSign />
          Cardano <p className="text-cs text-gray-200/50">Ada</p>
        </div>
      ),
      latestPrice: '$10.31',
      dynamic: '11.94%',
      volume: '507.2',
      chart: (
        <div className="h-[40px] w-[100px]">
          <ResponsiveLine colors={'white'} data={chartData} layers={['lines']} enableSlices="x" enableTouchCrosshair margin={{ bottom: -10 }} curve="basis" />
        </div>
      ),
      action: <Button className="w-fit bg-gradient-to-r from-[#1E1D21] via-[#303135] to-[#1E1D21] text-grayish-white">Trade</Button>,
    },
  ];

  return (
    <div className="flex flex-col gap-3 rounded-lg border border-[#27262B] px-7 py-5">
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
            <div className="h-[20px] w-[2px] bg-[#38383C]" />
            <TabsTrigger className={triggerClasses} value="hot">
              Hot
            </TabsTrigger>
            <TabsTrigger className={triggerClasses} value="newListed">
              New listed
            </TabsTrigger>
          </TabsList>
          <div className="flex items-center gap-2 text-grayish-white">
            <p className="rounded-lg bg-[#262628] px-3 py-2 text-xs">1D</p>
            <p className="rounded-lg px-3 py-2 text-xs">2W</p>
            <p className="rounded-lg px-3 py-2 text-xs">1M</p>
          </div>
        </div>
        <TabsContent className="mt-5 gap-2" value="myAssets">
          <AssetsTable data={dummyData} />
        </TabsContent>
        <TabsContent className="mt-5 gap-2" value="categories">
          <AssetsTable data={dummyData} />
        </TabsContent>
        <TabsContent className="mt-5 gap-2" value="hot">
          <AssetsTable data={dummyData} />
        </TabsContent>
        <TabsContent className="mt-5 gap-2" value="newListed">
          <AssetsTable data={dummyData} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Assets;
