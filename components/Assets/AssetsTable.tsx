import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import generateChartData from '@/lib/utils/generateChartData';
import { useCoinsContext } from '@/providers/crypto/CoinsProvider';
import { Coin } from '@/providers/crypto/useCoinsStore';
import { Observer } from 'mobx-react-lite';
import PriceCell from '../PriceCell';
import PriceChart from '../PriceChart';
import { Bitcoin } from '../icons';
import { Button } from '../ui/button';
import TableSkeleton from './TableSkeleton';

type Props = { coins: Coin[] };

const AssetsTable = ({ coins }: Props) => {
  const { isLoading } = useCoinsContext();

  return isLoading ? (
    <TableSkeleton />
  ) : (
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
            {coins.map(coin => (
              <TableRow key={coin.id}>
                <TableCell>
                  <div className="flex items-center gap-6">
                    {coin.icon ? coin.icon : <Bitcoin />}
                    <div className="flex flex-col gap-0.5 text-xs">
                      <p className="text-white">{coin.name}</p>
                      <p className="text-foreground-dark">{coin.id}</p>
                    </div>
                  </div>
                </TableCell>
                <PriceCell coin={coin} />
                <TableCell>
                  <p className="w-fit rounded-xl bg-white px-1.5 text-black">{new Intl.NumberFormat('en').format(coin.changePercent24Hr)}%</p>
                </TableCell>
                <TableCell>{new Intl.NumberFormat('en').format(coin.volumeUsd24Hr)}</TableCell>
                <TableCell>
                  <PriceChart data={[generateChartData(coin)]} curve="basis" />
                </TableCell>
                <TableCell>
                  <Button className="w-fit bg-gradient-to-r from-baltic-sea via-black-shark to-baltic-sea text-grayish-white">Trade</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        )}
      </Observer>
    </Table>
  );
};

export default AssetsTable;
