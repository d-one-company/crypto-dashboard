import { randomUUID } from "crypto";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import express from "express";
import { MAX_BARS } from "shared";
import { WebSocket } from "ws";
import { unzipSync } from "zlib";
dayjs.extend(utc);
const trades = [];
let ws;
let restartWs = true;
const socketUrl = "wss://api.huobi.pro/ws";
function setupAndRunSocket() {
    ws = new WebSocket(socketUrl);
    const sub = {
        sub: "market.ethusdt.trade.detail",
        id: randomUUID()
    };
    ws.onopen = ()=>{
        ws.send(JSON.stringify(sub));
    };
    ws.onmessage = (event)=>{
        const buffer = unzipSync(event.data);
        const data = JSON.parse(buffer.toString());
        if (data.ping) ws.send(JSON.stringify({
            pong: data.ping
        }));
        else if ("tick" in data) {
            const htxData = data.tick.data;
            htxData.forEach((trade)=>{
                const date = dayjs(trade.ts).utc();
                const interval = date.format("mm");
                const index = trades.findIndex((t)=>t.interval === interval);
                if (index === -1) {
                    if (trades.length >= MAX_BARS) trades.shift();
                    trades.push({
                        interval,
                        timestamp: trade.ts,
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
                        tradesData.buy.volume += trade.amount;
                        tradesData.buy.price += trade.price;
                    } else {
                        tradesData.sell.count += 1;
                        tradesData.sell.volume += trade.amount;
                        tradesData.sell.price += trade.price;
                    }
                    tradesData.close = trade.price;
                }
                trades[index] = tradesData;
            });
        }
    };
    ws.onclose = ()=>{
        if (restartWs) setTimeout(()=>setupAndRunSocket(), 5000);
    };
}
setupAndRunSocket();
const app = express();
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.get("/trades", async (_, res)=>{
    res.send(trades);
});
const port = process.env.TRADE_SERVER_PORT;
app.on("error", (err)=>{
    console.error("Express error", err);
});
const server = app.listen(port, ()=>{
    console.log(`Trades server is running on port ${port}`);
});
function shutdown() {
    console.log("Shutting down");
    restartWs = false;
    server.close();
    ws.close();
}
process.on("exit", shutdown);
