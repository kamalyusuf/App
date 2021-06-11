import { Server as SocketServer, Socket } from "socket.io";
import { Request } from "express";
export * from "./socket.service";

export const onSocketConnection = (io: SocketServer) => (socket: Socket) => {
  const user = (socket.request as Request).user!;
  socket.join(user.email);

  console.log(`${user.email} - ${socket.id} connected`.green);

  socket.on("disconnect", (reason) => {
    console.log(
      `${user.email} - ${socket.id} disconnected. Reason: ${reason}`.yellow
    );
  });
};
