'use client';

import { ResponsiveLine } from '@nivo/line';
import { ComponentProps } from 'react';

export const data = [
  {
    id: 'stellar',
    color: 'hsl(310, 70%, 50%)',
    data: [
      {
        x: 'plane',
        y: 226,
      },
      {
        x: 'helicopter',
        y: 290,
      },
      {
        x: 'boat',
        y: 78,
      },
      {
        x: 'train',
        y: 279,
      },
      {
        x: 'subway',
        y: 25,
      },
      {
        x: 'bus',
        y: 148,
      },
      {
        x: 'car',
        y: 237,
      },
      {
        x: 'moto',
        y: 78,
      },
      {
        x: 'bicycle',
        y: 210,
      },
      {
        x: 'horse',
        y: 266,
      },
      {
        x: 'skateboard',
        y: 134,
      },
      {
        x: 'others',
        y: 2,
      },
    ],
  },
];

type Props = ComponentProps<typeof ResponsiveLine>;

const DummyChart = (props: Props) => {
  return (
    <div className="h-[40px] w-[150px]">
      <ResponsiveLine colors={'white'} layers={['areas', 'lines']} {...props} />
    </div>
  );
};

export default DummyChart;
