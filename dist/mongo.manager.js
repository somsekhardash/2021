"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoManager = void 0;
var mongoose = require("mongoose");
var Logger_1 = require("./helpers/Logger");
var connect = mongoose.connect;
var MONGODB_URL = process.env.MONGODB_URL ||
    "mongodb+srv://boss:boss123@cluster0.ho84f.mongodb.net/cricket?retryWrites=true&w=majority";
var MongoManager = /** @class */ (function () {
    function MongoManager() {
    }
    MongoManager.getInstance = function () {
        return MongoManager.instance || new MongoManager();
    };
    MongoManager.prototype.InitMongo = function () {
        try {
            connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
                .then(function () {
                Logger_1.default.info("Connected to - " + MONGODB_URL);
                Logger_1.default.info("App is running ...");
            })
                .catch(function (err) {
                Logger_1.default.error("mongo connection error:", err.message);
            });
        }
        catch (error) {
            Logger_1.default.error("mongo connection error:", error);
        }
    };
    return MongoManager;
}());
exports.MongoManager = MongoManager;
//# sourceMappingURL=mongo.manager.js.map