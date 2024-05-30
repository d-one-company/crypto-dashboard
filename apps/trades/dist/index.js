import dayjs from "dayjs";
import express from "express";
import { BASE, MAX_BARS, QUOTE } from "shared";
import { WebSocket } from "ws";
const trades = [];
let ws;
const socketUrl = `wss://ws.coincap.io/trades/huobi?base=${BASE}&quote=${QUOTE}`;
const startSocket = ()=>{
    ws = new WebSocket(socketUrl);
    ws.onclose = ()=>setTimeout(()=>startSocket(), 5000);
};
const readSocket = ()=>{
    if (!ws) {
        console.error("Socket not initialized");
        return;
    }
    ws.onmessage = (event)=>{
        const trade = JSON.parse(event.data.toString());
        const date = dayjs(trade.timestamp);
        const interval = date.format("YYYY-MM-DD HH:mm");
        const index = trades.findIndex((t)=>t.interval === interval);
        if (index === -1) {
            if (trades.length >= MAX_BARS) trades.shift();
            trades.push({
                interval,
                open: trade.price,
                close: trade.price,
                buy: {
                    count: 0,
                    volume: 0,
                    price: 0,
                    priceUsd: 0
                },
                sell: {
                    count: 0,
                    volume: 0,
                    price: 0,
                    priceUsd: 0
                }
            });
        }
        const tradesData = trades[index];
        if (tradesData) {
            if (trade.direction === "buy") {
                tradesData.buy.count += 1;
                tradesData.buy.volume += trade.volume;
                tradesData.buy.price += trade.price;
                if (trade.priceUsd) tradesData.buy.priceUsd += trade.priceUsd;
            } else {
                tradesData.sell.count += 1;
                tradesData.sell.volume += trade.volume;
                tradesData.sell.price += trade.price;
                if (trade.priceUsd) tradesData.sell.priceUsd += trade.priceUsd;
            }
            tradesData.close = trade.price;
        }
        trades[index] = tradesData;
    };
};
startSocket();
readSocket();
const app = express();
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.get("/trades", async (_, res)=>{
    res.send(trades);
});
const port = process.env.TRADE_SERVER_PORT;
app.listen(port, ()=>{
    console.log(`Trades server is running on port ${port}`);
});
