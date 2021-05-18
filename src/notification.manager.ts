import { io } from "socket.io-client";
import Logger from "./helpers/Logger";

export class NotificationManager {
  private clientSocket: any;
  public static notifications: any;

  constructor(clientUrl: any) {
    this.clientSocket = io(clientUrl); //"http://localhost:3000"
    this.messageHandler(this.clientSocket);
    Logger.warn(`Notification Manager ${clientUrl}`);
  }

  private messageHandler(socket: any) {
    socket.on("vote", (data: string) => {
      NotificationManager.notifications.push(data);
      socket.emit("notification", data);
      Logger.info(`vote-notification`);
      Logger.warn("vote");
    });

    socket.on("connection", () => {
      Logger.warn("connection");
    });
  }
}
