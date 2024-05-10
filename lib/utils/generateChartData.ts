import type { Coin } from '../../providers/crypto/useCoinsStore';

function generateChartData(coin: Coin) {
  console.info(coin.chartData);
  const min = Math.min(...coin.chartData.map(unit => parseFloat(unit.priceUsd)));
  return {
    id: coin.symbol,
    color: 'hsl(310, 70%, 50%)',
    data: coin.chartData.map((unit, idx) => {
      return {
        x: idx,
        y: parseFloat(unit.priceUsd) - min,
      };
    }),
  };
}

export default generateChartData;
