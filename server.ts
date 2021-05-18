import * as express from "express";
import * as cors from "cors";
import * as path from "path";
import { createServer } from "http";
import { MongoManager } from "./mongo.manager";
import { SocketManager } from "./socket.manager";
import indexRouter from "./routes";
import Logger from "./helpers/Logger";

const { json, urlencoded } = express;
const port = process.env.PORT || 3000;
const app = express();
// const httpServer = createServer(app);

app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cors());

app.listen(process.env.PORT || port, function () {
  console.log("Express server listening" + port);
});

try {
  var mongoMgr = MongoManager.getInstance();
  mongoMgr.InitMongo();
} catch (error) {
  Logger.error(error);
}

app.get("/test", (req, res) => {
  res.send("It's Working");
});
app.use("/api", indexRouter);
app.use(express.static(__dirname + "/"));
app.get("/*", (req, res) => {
  res.send("It's Working");
});

// httpServer.listen(port, () => {
//   Logger.info(`Example app listening at http://localhost:${port}`);
// });

// SocketManager.getInstance().InitSocket(httpServer);
export { app };
