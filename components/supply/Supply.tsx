import * as Tooltip from '@radix-ui/react-tooltip';
import SupplyProgress from './SupplyProgress';

type SupplyProps = {
  supply: number;
  maxSupply: number | null;
  symbol: string;
};

const Supply = ({ supply, maxSupply, symbol }: SupplyProps) => {
  return (
    <div className="flex flex-col justify-center gap-1 text-xs">
      <p className="text-white">Circulating Supply</p>
      {maxSupply ? (
        <Tooltip.Provider delayDuration={150}>
          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <div className="flex max-w-[200px] cursor-default flex-col gap-1">
                <p className="text-foreground-dark">{`${new Intl.NumberFormat('en').format(supply)} ${symbol}`}</p>
                <SupplyProgress supply={supply} maxSupply={maxSupply} />
              </div>
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Content className="rounded-lg border border-baltic-sea bg-card-dark p-3 text-xs">
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between gap-4">
                    <span>Percentage</span>
                    <span>{((supply / maxSupply) * 100).toFixed(2)}%</span>
                  </div>

                  <SupplyProgress supply={supply} maxSupply={maxSupply} />

                  <div className="flex flex-col gap-0.5">
                    <div className="flex justify-between gap-4">
                      <span>Circulating Supply</span>
                      <span className="text-foreground-dark">{`${new Intl.NumberFormat('en').format(supply)} ${symbol}`}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Max Supply</span>
                      <span className="text-foreground-dark">{`${new Intl.NumberFormat('en').format(maxSupply)} ${symbol}`}</span>
                    </div>
                  </div>
                </div>
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>
        </Tooltip.Provider>
      ) : (
        <p className="text-foreground-dark">{`${new Intl.NumberFormat('en').format(supply)} ${symbol}`}</p>
      )}
    </div>
  );
};

export default Supply;
