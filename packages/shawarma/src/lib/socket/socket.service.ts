import { Server as SocketServer } from "socket.io";

export class SocketService {
  private io: SocketServer;

  get rooms() {
    return this.io.sockets.adapter.rooms;
  }

  constructor(io: SocketServer) {
    this.io = io;
  }

  exists(room: string) {
    return !!this.rooms.get(room);
  }

  emitIfExists(room: string, event: string, data: any) {
    if (!this.exists(room)) {
      return;
    }

    this.io.to(room).emit(event, data);
  }
}
