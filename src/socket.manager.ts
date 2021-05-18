import { Server } from "socket.io";
import Logger from "./helpers/Logger";
import MessageSchema from "./models/MessageModel";

export class SocketManager {
  private static instance: SocketManager;
  private io: any;
  public room: any = [];
  public static getInstance(): SocketManager {
    return SocketManager.instance || new SocketManager();
  }

  constructor() {}

  public async InitSocket(httpServer: any) {
    this.io = new Server(httpServer, { cors: { origin: "*" } });
    this.room = await MessageSchema.find({});
    Logger.info(`web-socket connected`);
    try {
      this.io.on("connection", (socket: any) => {
        Logger.info(`web-socket ${socket.id} connected`);
        socket.on("vote", async (data: any) => {
          data.createdAt = new Date();
          this.room.push(data);
          this.io.emit("message", this.room);
          const message = new MessageSchema(data);
          message.save();
        });

        socket.on("open-room", () => {
          this.io.emit("message", this.room);
        });

        socket.on("chat", (data: any) => {
          data.createdAt = new Date();
          this.room.push(data);
          this.io.emit("message", this.room);
          const message = new MessageSchema(data);
          message.save();
        });
      });
    } catch (error) {
      Logger.error(error);
    }
  }

  public sendMessage(message: any, data: any) {
    Logger.warn("I mma hhere");
    Logger.warn(`${message} ${data}`);
    this.io.sockets.emit("VOTE-API", data);
  }
}
