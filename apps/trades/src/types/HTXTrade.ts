export type HTXTrade = {
  id: number;
  ts: number;
  tradeId: number;
  amount: number;
  price: number;
  direction: "buy" | "sell";
};
