import { useEffect, useState } from "react";

import useSocket from "@/hooks/useSocket";

interface Message {
  message: string;
}

export default function Home() {
  const socket = useSocket();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (socket) {
      socket.on("receive_message", (data: Message) => {
        setMessages((prevMessages) => [...prevMessages, data]);
      });
    }

    return () => {
      if (socket) {
        socket.off("receive_message");
      }
    };
  }, [socket]);

  const sendMessage = () => {
    if (message.trim() && socket) {
      socket.emit("send_message", { message });
      setMessage("");
    }
  };

  return (
    <div className="p-6">
      <h1>Real-Time Chat</h1>
      <div className="border border-blue-500 p-4 h-96 overflow-y-scroll mb-6">
        {messages.map((msg, index) => (
          <div key={index}>
            <p>{msg.message}</p>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="w-10/12 p-4"
      />
      <button onClick={sendMessage} className="px-4 py-6">
        Send
      </button>
    </div>
  );
}
