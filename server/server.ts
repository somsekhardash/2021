import express, { json, urlencoded } from "express";

import { MongoManager } from "./mongo.manager";
import indexRouter from "./routes";

const app = express();

// Connect to MongoDB
var mongoMgr = MongoManager.getInstance();
mongoMgr.InitMongo();

// Express configuration
app.set("port", process.env.PORT || 5000);
app.use(json());
app.use(urlencoded({ extended: false }));

app.get("/", (_req, res) => {
  res.send("API Running");
});

app.use("/api", indexRouter);

const port = app.get("port");
const server = app.listen(port, () =>
  console.log(`Server started on port ${port}`)
);

export default server;
