'use client';

import { ResponsiveLine } from '@nivo/line';
import { ComponentProps } from 'react';

type Props = ComponentProps<typeof ResponsiveLine>;

const PriceChart = (props: Props) => {
  return (
    <div className="h-[40px] w-[150px]">
      <ResponsiveLine colors={'white'} layers={['areas', 'lines']} {...props} />
    </div>
  );
};

export default PriceChart;
