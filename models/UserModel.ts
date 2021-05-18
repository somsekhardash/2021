import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  userName: { type: String, required: true },
  mobileNumber: { type: Number, required: true },
  password: { type: String, required: true },
});

export default model("User", UserSchema);
