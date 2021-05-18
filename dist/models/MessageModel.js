"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var MessageSchema = new mongoose_1.Schema({
    data: { type: String, required: true },
    user: { type: String, required: true },
    type: { type: String, required: true },
}, { timestamps: true });
exports.default = mongoose_1.model("Message", MessageSchema);
//# sourceMappingURL=MessageModel.js.map