import { ConnectionOptions, connect } from "mongoose";
import Logger from "./helpers/Logger";

const MONGODB_URL =
  process.env.MONGODB_URL ||
  "mongodb+srv://boss:boss123@cluster0.ho84f.mongodb.net/cricket?retryWrites=true&w=majority";

export class MongoManager {
  private static instance: MongoManager;

  public static getInstance(): MongoManager {
    return MongoManager.instance || new MongoManager();
  }

  public InitMongo() {
    const options: ConnectionOptions = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
    try {
      connect(MONGODB_URL, options)
        .then(() => {
          Logger.info(`Connected to - ${MONGODB_URL}`);
        })
        .catch((err: any) => {
          Logger.error("mongo connection error:", err.message);
        });
    } catch (error) {
      Logger.error("mongo connection error:", error);
    }
  }
}
