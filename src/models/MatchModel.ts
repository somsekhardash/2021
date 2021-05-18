import { Schema, model, Types } from "mongoose";

const MatchSchema = new Schema<any>({
  tournamentId: { type: String, required: true },
  team1: { type: String, required: true },
  team2: { type: String, required: true },
  time: { type: String, required: true },
  venue: { type: String },
  winner: { type: String },
  isStarted: { type: Boolean },
  team1Squard: [{ type: Types.ObjectId, ref: "User" }],
  team2Squard: [{ type: Types.ObjectId, ref: "User" }],
});

export default model("Match", MatchSchema);
