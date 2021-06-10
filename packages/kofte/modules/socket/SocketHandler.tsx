import { useEffect } from "react";
import { useSocket } from "../../hooks";

export const SocketHandler: React.FC = () => {
  const socket = useSocket();

  useEffect(() => {
    if (!socket) return;

    return () => {};
  }, [socket]);

  return null;
};
