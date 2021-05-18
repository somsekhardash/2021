"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
var express = require("express");
var cors = require("cors");
var http_1 = require("http");
var mongo_manager_1 = require("./mongo.manager");
var socket_manager_1 = require("./socket.manager");
var routes_1 = require("./routes");
var Logger_1 = require("./helpers/Logger");
var json = express.json, urlencoded = express.urlencoded;
var port = process.env.PORT || 3000;
var app = express();
exports.app = app;
var httpServer = http_1.createServer(app);
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cors());
try {
    var mongoMgr = mongo_manager_1.MongoManager.getInstance();
    mongoMgr.InitMongo();
}
catch (error) {
    Logger_1.default.error(error);
}
app.get("/test", function (req, res) {
    res.send("It's Working");
});
app.use("/api", routes_1.default);
app.use(express.static(__dirname + "/"));
app.get("/*", function (req, res) {
    res.send("It's Working");
});
httpServer.listen(port, function () {
    Logger_1.default.info("Example app listening at http://localhost:" + port);
});
socket_manager_1.SocketManager.getInstance().InitSocket(httpServer);
//# sourceMappingURL=server.js.map