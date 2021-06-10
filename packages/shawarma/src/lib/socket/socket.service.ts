import { Server as SocketServer } from "socket.io";

export const ev1 = () => {};

export const ev2 = () => {};

class SocketService {
  private io: SocketServer;

  constructor(io: SocketServer) {
    this.io = io;
  }
}
