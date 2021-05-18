"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var UserSchema = new mongoose_1.Schema({
    userName: { type: String, required: true },
    mobileNumber: { type: Number, required: true },
    password: { type: String, required: true },
});
exports.default = mongoose_1.model("User", UserSchema);
//# sourceMappingURL=UserModel.js.map