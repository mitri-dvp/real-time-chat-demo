import useSocket from "@/hooks/useSocket";
import { useChatStore } from "@/store/chat";

interface ChatHeaderProps {
  closeChat: () => void;
}

export default function ChatHeader({ closeChat }: ChatHeaderProps) {
  const socket = useSocket();
  const { onlineCount } = useChatStore();

  return (
    <div className="flex items-center rounded-t-3xl bg-gray-50 p-4">
      <div className="relative mr-4 size-4">
        <div
          className={`absolute left-1/2 top-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full ${socket?.connected ? "bg-emerald-500" : "bg-gray-500"}`}
        />
        {socket && socket.connected && (
          <div
            className={`absolute size-4 animate-pulse rounded-full bg-emerald-500`}
          />
        )}
      </div>
      <h1 className="text-sm font-semibold leading-6 text-gray-900">
        Real-Time Chat
      </h1>
      <span className="mx-2">&bull;</span>
      <span className="text-gray-500">{onlineCount} online</span>
      <button onClick={closeChat} className="ml-auto size-max">
        <i className="bi bi-x-lg text-gray-900" />
      </button>
    </div>
  );
}