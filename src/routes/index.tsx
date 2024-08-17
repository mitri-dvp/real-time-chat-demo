import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Home,
});

// src/App.tsx
import { useEffect, useState } from "react";
import useSocket from "../hooks/useSocket";

const SERVER_URL = import.meta.env.PUBLIC_SERVER_URL || "http://localhost:4000";

interface Message {
  message: string;
}

function Home() {
  const socket = useSocket(SERVER_URL);
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
    <div className="text-cyan-400" style={{ padding: "20px" }}>
      <h1>Real-Time Chat</h1>
      <div
        style={{
          border: "1px solid #ccc",
          padding: "10px",
          height: "300px",
          overflowY: "scroll",
          marginBottom: "20px",
        }}
      >
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
        style={{ width: "80%", padding: "10px" }}
      />
      <button onClick={sendMessage} style={{ padding: "10px 20px" }}>
        Send
      </button>
    </div>
  );
}
