type SupplyProgressProps = {
  supply: number;
  maxSupply: number;
};

const SupplyProgress = ({ supply, maxSupply }: SupplyProgressProps) => {
  const progress = (supply / maxSupply) * 100;

  return (
    <div className="h-2 w-full rounded-sm bg-foreground-dark">
      <div className="h-2 rounded-sm bg-white" style={{ width: `${progress}%` }} />
    </div>
  );
};

export default SupplyProgress;
