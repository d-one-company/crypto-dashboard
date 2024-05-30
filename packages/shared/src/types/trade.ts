export type TradesData = {
  interval: string;
  open: number;
  close: number;
  buy: {
    count: number;
    volume: number;
    price: number;
    priceUsd: number;
  };
  sell: {
    count: number;
    volume: number;
    price: number;
    priceUsd: number;
  };
};

export type Trade = {
  direction: "buy" | "sell";
  volume: number;
  timestamp: number;
  price: number;
  priceUsd?: number;
};
