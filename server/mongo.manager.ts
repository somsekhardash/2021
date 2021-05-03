import mongoose from "mongoose";
import Logger from "./helpers/Logger";

const { connect } = mongoose;
const MONGODB_URL =
  process.env.MONGODB_URL ||
  "mongodb+srv://boss:boss123@cluster0.ho84f.mongodb.net/cricket?retryWrites=true&w=majority";

export class MongoManager {
  private static instance: MongoManager;

  constructor() {}

  public static getInstance(): MongoManager {
    return MongoManager.instance || new MongoManager();
  }

  public InitMongo() {
    try {
      connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
          Logger.info(`Connected to - ${MONGODB_URL}`);
          Logger.info("App is running ...");
        })
        .catch((err: any) => {
          Logger.error("mongo connection error:", err.message);
        });
    } catch (error) {
      Logger.error("mongo connection error:", error);
    }
  }
}
