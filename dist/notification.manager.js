"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationManager = void 0;
var socket_io_client_1 = require("socket.io-client");
var Logger_1 = require("./helpers/Logger");
var NotificationManager = /** @class */ (function () {
    function NotificationManager(clientUrl) {
        this.clientSocket = socket_io_client_1.io(clientUrl); //"http://localhost:3000"
        this.messageHandler(this.clientSocket);
        Logger_1.default.warn("Notification Manager " + clientUrl);
    }
    NotificationManager.prototype.messageHandler = function (socket) {
        socket.on("vote", function (data) {
            NotificationManager.notifications.push(data);
            socket.emit("notification", data);
            Logger_1.default.info("vote-notification");
            Logger_1.default.warn("vote");
        });
        socket.on("connection", function () {
            Logger_1.default.warn("connection");
        });
    };
    return NotificationManager;
}());
exports.NotificationManager = NotificationManager;
//# sourceMappingURL=notification.manager.js.map