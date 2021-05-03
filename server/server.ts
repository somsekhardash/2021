import express from "express";
import indexRouter from "./routes";
import cors from "cors";
import * as path from "path";
import { createServer } from "http";
import { MongoManager } from "./mongo.manager";
import { SocketManager } from "./socket.manager";

import { Server } from "socket.io";

import Logger from "./helpers/Logger";
import { NotificationManager } from "./notification.manager";
import { socket } from "Src/utils/shocket";
const { json, urlencoded } = express;
const port = process.env.PORT || 3000;
export const app = express();
const httpServer = createServer(app);

app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cors());

try {
  var mongoMgr = MongoManager.getInstance();
  mongoMgr.InitMongo();
} catch (error) {
  Logger.error(error);
}

app.use("/api", indexRouter);
app.get("/test", (req, res) => {
  res.send("It's Working");
});
app.use(express.static(__dirname + "/"));
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname + "/index.html"));
});
httpServer.listen(port, () => {
  Logger.info(`Example app listening at http://localhost:${port}`);
});

SocketManager.getInstance().InitSocket(httpServer);
