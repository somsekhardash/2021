import { Schema, model } from "mongoose";

const MatchSchema = new Schema({
  tournamentId: { type: String, required: true },
  team1: { type: String, required: true },
  team2: { type: String, required: true },
  time: { type: String, required: true },
  venue: { type: String },
  winner: { type: String },
  isStarted: { type: Boolean },
  team1Squard: [{ type: Schema.Types.ObjectId, ref: "User" }],
  team2Squard: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

// var UserSchema = new Schema({
//   userName: { type: String, required: true },
//   mobileNumber: { type: Number, required: true },
// });

const TournamentSchema = new Schema(
  {
    title: { type: String, required: true },
    matches: [MatchSchema],
    users: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

export default model("Tournament", TournamentSchema);
