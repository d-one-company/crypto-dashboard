import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useCoinsContext } from '@/providers/crypto/CoinsProvider';
import { ResponsiveLine } from '@nivo/line';
import { Observer } from 'mobx-react-lite';
import { cloneElement, ReactNode } from 'react';

type Props = {
  data: {
    id: string;
    coin: ReactNode;
    latestPrice: string;
    dynamic: string;
    volume: string;
    chart: ReactNode;
    action: ReactNode;
  }[];
};

const AssetsTable = ({ data }: Props) => {
  const {
    coinsStore: { coins },
  } = useCoinsContext();

  return (
    <Table>
      <TableHeader>
        <TableHead className="text-sm text-gray-200/60">Coin</TableHead>
        <TableHead className="text-sm text-gray-200/60">Latest price</TableHead>
        <TableHead className="text-sm text-gray-200/60">Dynamic</TableHead>
        <TableHead className="text-sm text-gray-200/60">Volume</TableHead>
        <TableHead className="text-sm text-gray-200/60">Chart</TableHead>
        <TableHead className="text-sm text-gray-200/60">Action</TableHead>
      </TableHeader>
      <Observer>
        {() => (
          <TableBody>
            {coins.slice(0, 3).map(coin => (
              <TableRow key={coin.id}>
                <TableCell>
                  <div className="flex items-center gap-6">
                    {cloneElement(coin?.icon as JSX.Element, { width: 26, height: 26 })}
                    <div className="flex flex-col gap-0.5 text-xs">
                      <p className="text-white">{coin.name}</p>
                      <p className="text-foreground-dark">{coin.id}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{coin.price}</TableCell>
                <TableCell>
                  <p className="w-fit rounded-xl bg-white px-1.5 text-black">{coin.change}</p>
                </TableCell>
                <TableCell>{coin.marketCap}</TableCell>
                {/* <TableCell>{item.chart}</TableCell> */}
                {/* <TableCell>{item.chart}</TableCell> */}
                {/* <TableCell>{item.action}</TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        )}
      </Observer>
    </Table>
  );
};

export default AssetsTable;
