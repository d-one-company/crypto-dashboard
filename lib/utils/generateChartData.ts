import type { Coin } from '../../providers/crypto/useCoinsStore';

function generateChartData(coin: Coin) {
  const min = Math.min(...coin.chartData.map((unit: any) => parseFloat(unit.priceUsd)));
  return {
    id: coin.symbol,
    color: 'hsl(310, 70%, 50%)',
    data: coin.chartData.map((unit: any, idx: number) => {
      return {
        x: idx,
        y: unit.priceUsd - min,
      };
    }),
  };
}

export default generateChartData;
