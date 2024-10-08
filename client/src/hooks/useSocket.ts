import { useChatStore } from "@/store/chat";
import { useUserStore } from "@/store/user";
import socketEvents from "@shared/socketEvents";
import { useEffect } from "react";
import { io, Socket } from "socket.io-client";

const SERVER_URL = import.meta.env.PUBLIC_SERVER_URL || "http://localhost:4000";

let socket: Socket | null = null;

const useSocket = (): Socket | null => {
  const { user, register } = useUserStore();
  const { setOnlineCount } = useChatStore();

  useEffect(() => {
    if (!socket) {
      socket = io(SERVER_URL, {
        query: { userId: user ? user.id : "" },
      });

      socket.on(socketEvents.REGISTER, (userId: string) => {
        register(userId);
      });

      socket.on(socketEvents.ONLINE_COUNT, (count: number) => {
        console.log({ count });
        setOnlineCount(count);
      });
    } else {
      if (socket.connected === false) {
        socket.connect();
      }
    }

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, []);

  return socket;
};

export default useSocket;
