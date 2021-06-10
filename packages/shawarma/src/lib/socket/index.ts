import { Server as SocketServer, Socket } from "socket.io";
import * as socketService from "./socket.service";

export const onSocketConnection = (io: SocketServer) => (socket: Socket) => {
  console.log(`Socket connected ${socket.id}`.green);

  socket.on("disconnect", (reason) => {
    console.log(`Socket ${socket.id} disconnected. Reason: ${reason}`.yellow);
  });
};
