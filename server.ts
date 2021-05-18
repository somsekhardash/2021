import * as express from "express";
import * as cors from "cors";
import * as path from "path";
import { MongoManager } from "./mongo.manager";
import { SocketManager } from "./socket.manager";
import indexRouter from "./routes";
import Logger from "./helpers/Logger";

const { json, urlencoded } = express;

const app = express();

try {
  var mongoMgr = MongoManager.getInstance();
  mongoMgr.InitMongo();
} catch (error) {
  Logger.error(error);
}

// const httpServer = createServer(app);
app.set("port", process.env.PORT || 3000);
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cors());

app.get("/", (_req, res) => {
  res.send("API Running");
});
app.use("/api", indexRouter);

// httpServer.listen(port, () => {
//   Logger.info(`Example app listening at http://localhost:${port}`);

// SocketManager.getInstance().InitSocket(httpServer);
// export { app };
const port = app.get("port");
const server = app.listen(port, () =>
  console.log(`Server started on port ${port}`)
);
export default server;
