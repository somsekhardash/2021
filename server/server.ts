// import express from "express";
// import indexRouter from "./routes";
// import cors from "cors";
// import * as path from "path";
// import { createServer } from "http";
// import { MongoManager } from "./mongo.manager";
// import { SocketManager } from "./socket.manager";

// import { Server } from "socket.io";

// import Logger from "./helpers/Logger";
// import { NotificationManager } from "./notification.manager";
// import { socket } from "src/utils/shocket";
// const { json, urlencoded } = express;
// const port = process.env.PORT || 3000;
// export const app = express();
// const httpServer = createServer(app);

// app.use(json());
// app.use(urlencoded({ extended: false }));
// app.use(cors());

// // try {
// //   var mongoMgr = MongoManager.getInstance();
// //   mongoMgr.InitMongo();
// // } catch (error) {
// //   Logger.error(error);
// // }

// app.use("/api", indexRouter);
// app.get("/test", (req, res) => {
//   res.send("It's Working");
// });
// app.use(express.static(__dirname + "/"));
// app.get("/*", (req, res) => {
//   res.sendFile(path.join(__dirname + "/index.html"));
// });
// httpServer.listen(port, () => {
//   Logger.info(`Example app listening at http://localhost:${port}`);
// });

// SocketManager.getInstance().InitSocket(httpServer);

// import express from "express";
// import cors from "cors";
// import path from "path";
// import { MongoManager } from "./mongo.manager";
// import { SocketManager } from "./socket.manager";
// import indexRouter from "./routes";
// import Logger from "./helpers/Logger";

// const { json, urlencoded } = express;

// const app = express();

// try {
//   var mongoMgr = MongoManager.getInstance();
//   mongoMgr.InitMongo();
// } catch (error) {
//   Logger.error(error);
// }

// // const httpServer = createServer(app);
// app.set("port", process.env.PORT || 3000);
// app.use(json());
// app.use(urlencoded({ extended: false }));
// app.use(cors());

// app.get("/", (_req, res) => {
//   res.send("API Running");
// });
// app.use("/api", indexRouter);

// // httpServer.listen(port, () => {
// //   Logger.info(`Example app listening at http://localhost:${port}`);

// // SocketManager.getInstance().InitSocket(httpServer);
// // export { app };
// const port = app.get("port");
// const server = app.listen(port, () =>
//   console.log(`Server started on port ${port}`)
// );
// export default server;

import bodyParser from "body-parser";
import express from "express";
import path from "path";
import { MongoManager } from "./mongo.manager";
import indexRouter from "./routes";

const app = express();

// Connect to MongoDB
// var mongoMgr = MongoManager.getInstance();
// mongoMgr.InitMongo();

// Express configuration
app.set("port", process.env.PORT || 5000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// @route   GET /
// @desc    Test Base API
// @access  Public

app.use(express.static(__dirname + "/"));
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname + "/index.html"));
});

app.get("/test", (_req, res) => {
  res.send("API Running");
});

// app.use("/api", indexRouter);

const port = app.get("port");
const server = app.listen(port, () =>
  console.log(`Server started on port ${port}`)
);

export default server;
