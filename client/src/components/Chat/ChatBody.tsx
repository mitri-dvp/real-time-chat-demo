import { useChatStore } from "@/store/chat";
import { useUserStore } from "@/store/user";
import { formatter } from "@/utils/date";
import { useEffect, useRef } from "react";

export default function ChatBody() {
  const { chat } = useChatStore();
  const { user } = useUserStore();

  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatRef.current?.scrollTo({
      top: chatRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [chat.messages]);

  useEffect(() => {
    chatRef.current?.scrollTo({
      top: chatRef.current.scrollHeight,
      behavior: "instant",
    });
  }, []);

  return (
    <div className="h-96 overflow-y-scroll p-4" ref={chatRef}>
      {chat.messages.map((msg, index) => {
        const isAuthor = user?.id === msg.userId;

        return (
          <div
            key={index}
            className={`my-2.5 flex flex-col ${isAuthor ? "ml-auto" : ""}`}
          >
            <p
              className={`mb-2 text-xs text-gray-400 ${isAuthor ? "ml-auto" : ""}`}
            >
              {msg.userId.slice(0, 8)}
            </p>
            <p
              className={`w-max max-w-[80%] text-wrap rounded-lg p-2.5 shadow-lg ring-1 ring-gray-900/5 ${isAuthor ? "ml-auto bg-blue-500 text-white" : "bg-white"}`}
            >
              <span>{msg.message}</span>
              <span className="ml-auto block w-max text-xs">
                {formatter.format(new Date(msg.timestamp))}
              </span>
            </p>
          </div>
        );
      })}
    </div>
  );
}
