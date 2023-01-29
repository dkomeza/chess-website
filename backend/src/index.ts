import { Bao } from "baojs";

import ChessEngine from "./api/ChessEngine/ChessEngine";

const app = new Bao();

let counter = 0;

app.get("/status", (ctx) => {
  const chessEngine = new ChessEngine();
  return ctx.sendPrettyJson({
    status: "ok",
    engineStatus: chessEngine.getStatus(),
  });
});

app.ws("/ping", {
  open: (ws) => {
    ws.send(counter.toString());
  },
  message: (ws, message) => {
    counter++;
    ws.send(counter.toString());
  },
});

app.listen({ port: 5000 });
