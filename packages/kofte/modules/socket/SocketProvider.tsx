import { useToast } from "@chakra-ui/react";
import React, { useState, useEffect, useMemo, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { useMeQuery } from "../../hooks";

type S = Socket | null;

type Context = {
  socket: S;
  setSocket: (socket: S) => void;
};

export const SocketContext = React.createContext<Context>({
  socket: null,
  setSocket: () => {}
});

const connect = (): Promise<Socket> => {
  return new Promise<Socket>((resolve) => {
    const socket = io(process.env.NEXT_PUBLIC_API_URL as string, {
      withCredentials: true,
      rememberUpgrade: true
    });

    resolve(socket);
  });
};

interface Props {}

export const SocketProvider: React.FC<Props> = ({ children }) => {
  const [socket, setSocket] = useState<S>(null);
  const isConnecting = useRef(false);
  const { me } = useMeQuery();
  const toast = useToast();

  useEffect(() => {
    if (!socket && !isConnecting.current && !!me) {
      isConnecting.current = true;
      connect()
        .then((socket) => {
          setSocket(socket);
        })
        .catch((e) => {})
        .finally(() => {
          isConnecting.current = false;
        });
    }
  }, [socket, me]);

  useEffect(() => {
    if (!socket) return;

    socket.on("connect", () => {
      toast({
        description: "Socket connection established",
        status: "success",
        duration: 3000,
        isClosable: true
      });
    });

    socket.on("connect_error", (error) => {
      toast({
        description: error.message ?? "Failed to establish a socket connection",
        status: "error",
        duration: 3000,
        isClosable: true
      });
    });

    socket.on("disconnect", () => {
      toast({
        description: "Socket connection terminated",
        status: "info",
        duration: 3000,
        isClosable: true
      });
    });

    return () => {
      socket.off("connect");
      socket.off("connect_error");
      socket.off("disconnect");
      socket.disconnect();
    };
  }, [socket]);

  return (
    <SocketContext.Provider
      value={useMemo(() => ({ socket, setSocket }), [socket])}
    >
      {children}
    </SocketContext.Provider>
  );
};
