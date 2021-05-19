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
app.get("/", (_req, res) => {
  res.send("API Running");
});

// app.use("/api", indexRouter);

const port = app.get("port");
const server = app.listen(port, () =>
  console.log(`Server started on port ${port}`)
);

export default server;
