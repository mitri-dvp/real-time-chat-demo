import { useEffect, useState } from "react";

import useSocket from "@/hooks/useSocket";

import { useChatStore } from "@/store/chat";
import ChatHeader from "./ChatHeader";
import ChatBody from "./ChatBody";
import ChatFooter from "./ChatFooter";

import type { Message } from "@shared/types";
import socketEvents from "@shared/socketEvents";

export default function Chat() {
  const socket = useSocket();
  const { chat, setShowChat, setMessages } = useChatStore();

  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (socket) {
      socket.on(socketEvents.RECEIVE_MESSAGE, (message: Message) => {
        setMessages([...chat.messages, message]);
      });
    }

    return () => {
      if (socket) {
        socket.off(socketEvents.RECEIVE_MESSAGE);
      }
    };
  }, [socket, chat.messages]);

  const closeChat = () => {
    setIsClosing(true);
    setTimeout(() => {
      setShowChat(false);
    }, 200);
  };

  return (
    <div
      className={`w-screen max-w-prose animate-fade-in rounded-3xl bg-gray-50 text-sm leading-6 shadow-lg ring-1 ring-gray-900/5 ${isClosing ? "animate-fade-out" : ""}`}
      key={"chat"}
    >
      <ChatHeader closeChat={closeChat} />
      <ChatBody />
      <ChatFooter />
    </div>
  );
}
