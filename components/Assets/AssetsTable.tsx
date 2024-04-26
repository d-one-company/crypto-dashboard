import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ReactNode } from 'react';

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
      <TableBody className="">
        {data.map(item => (
          <TableRow key={item.id}>
            <TableCell>{item.coin}</TableCell>
            <TableCell>{item.latestPrice}</TableCell>
            <TableCell>
              <p className="w-fit rounded-xl bg-white px-1.5 text-black">{item.dynamic}</p>
            </TableCell>
            <TableCell>{item.volume}</TableCell>
            <TableCell>{item.chart}</TableCell>
            <TableCell>{item.action}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default AssetsTable;
