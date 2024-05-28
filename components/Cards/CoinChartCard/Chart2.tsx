'use client';

import { TradesData } from '@/lib/utils/trades';
import { ResponsiveBar } from '@nivo/bar';

type Props = {
  data: TradesData[];
};

const Chart2 = ({ data }: Props) => {
  return (
    <ResponsiveBar
      data={data}
      keys={['buyVolume', 'sellVolume']}
      indexBy={'day'}
      colors={['#DCDCDC', '#6E6D6F']}
      groupMode="grouped"
      innerPadding={3}
      borderRadius={5}
      layers={['grid', 'bars']}
      theme={{
        grid: {
          line: {
            stroke: '#2E2D32',
          },
        },
      }}
      enableLabel={false}
      tooltip={props => (
        <div className="text-small mr-5 rounded-lg bg-card-dark p-3 shadow-card">
          <p>Date: {props.data.day}</p>
          <p>Buy volume: {props.data.buyVolume?.toFixed(2)}</p>
          <p>Sell volume: {props.data.sellVolume?.toFixed(2)}</p>
        </div>
      )}
    />
  );
};

export default Chart2;
