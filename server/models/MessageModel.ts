import { Schema, model } from "mongoose";

const MessageSchema = new Schema(
  {
    data: { type: String, required: true },
    user: { type: String, required: true },
    type: { type: String, required: true },
  },
  { timestamps: true }
);

export default model("Message", MessageSchema);
