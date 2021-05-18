"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var MatchSchema = new mongoose_1.Schema({
    tournamentId: { type: String, required: true },
    team1: { type: String, required: true },
    team2: { type: String, required: true },
    time: { type: String, required: true },
    venue: { type: String },
    winner: { type: String },
    isStarted: { type: Boolean },
    team1Squard: [{ type: mongoose_1.Types.ObjectId, ref: "User" }],
    team2Squard: [{ type: mongoose_1.Types.ObjectId, ref: "User" }],
});
exports.default = mongoose_1.model("Match", MatchSchema);
//# sourceMappingURL=MatchModel.js.map