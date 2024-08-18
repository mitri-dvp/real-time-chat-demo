import { useChatStore } from "@/store/chat";

export default function ChatBody() {
  const { chat } = useChatStore();

  return (
    <div className="h-96 overflow-y-scroll p-4">
      {chat.messages.map((msg, index) => (
        <div key={index}>
          <p>{msg.message}</p>
        </div>
      ))}
    </div>
  );
}
