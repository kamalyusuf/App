import { useContext } from "react";
import { SocketContext } from "../modules/socket";

export const useSocket = () => {
  return useContext(SocketContext).socket;
};
