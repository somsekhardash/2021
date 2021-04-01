import express from "express";
// import * as morgan from "morgan";
import indexRouter from "./routes";
import { notFoundResponse, unauthorizedResponse } from "./helpers/apiResponse";
import cors from "cors";
import mongoose = require("mongoose");
import * as path from "path";

const { connect } = mongoose;
const { json, urlencoded } = express;
const port = 3000;

var MONGODB_URL =
  "mongodb+srv://boss:boss123@cluster0.ho84f.mongodb.net/cricket?retryWrites=true&w=majority";
console.log(MONGODB_URL);

connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to %s", MONGODB_URL);
    console.log("App is running ... \n");
  })
  .catch((err: any) => {
    console.error("App starting error:", err.message);
  });

const app = express();

// const options: cors.CorsOptions = {
//   allowedHeaders: [
//     "Origin",
//     "X-Requested-With",
//     "Content-Type",
//     "Accept",
//     "X-Access-Token",
//     "Access-Control-Allow-Origin",
//   ],

//   methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
// };

// app.use(morgan("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cors());

app.use("/api", indexRouter);

// app.all("*", function (req: any, res: any) {
//   return notFoundResponse(res, "Page not found");
// });

app.use(express.static(__dirname + "/"));

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname + "/index.html"));
});

app.use((err: any, req: any, res: any) => {
  if (err.name == "UnauthorizedError") {
    return unauthorizedResponse(res, err.message);
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
