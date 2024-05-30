import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Exchange } from '@/providers/crypto/useExchangeStore';

type Props = { exchanges: Exchange[] };

const ExchangesTable = ({ exchanges }: Props) => {
  return (
    <Table>
      <TableHeader>
        <TableHead className="text-sm text-gray-200/60">Rank</TableHead>
        <TableHead className="text-sm text-gray-200/60">Name</TableHead>
        <TableHead className="text-sm text-gray-200/60">Traiding Pairs</TableHead>
        <TableHead className="text-sm text-gray-200/60">Volume</TableHead>
        <TableHead className="text-sm text-gray-200/60">Total</TableHead>
      </TableHeader>
      <TableBody>
        {exchanges.map(exchange => (
          <TableRow className="border-b-gray-jumbo text-base" key={exchange.id}>
            <TableCell>
              <div className="flex items-center gap-6 text-base">{exchange.rank}</div>
            </TableCell>
            <TableCell>
              <div className="flex flex-col gap-0.5 text-base">
                <p className="text-white">{exchange.name}</p>
                <p className="text-foreground-dark">{exchange.id}</p>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-6">{exchange.tradingPairs}</div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-6">$ {new Intl.NumberFormat('en', { maximumFractionDigits: 0 }).format(exchange.volumeUsd)}</div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-6">{new Intl.NumberFormat('en', { maximumFractionDigits: 2 }).format(exchange.percentTotalVolume)}%</div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ExchangesTable;
