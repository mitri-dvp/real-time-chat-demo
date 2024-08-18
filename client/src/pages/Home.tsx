import Chat from "@/components/Chat/Chat";
import StartChatButton from "@/components/Chat/StartChatButton";
import { useChatStore } from "@/store/chat";

export default function Home() {
  const { showChat } = useChatStore();

  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      {showChat ? <Chat /> : <StartChatButton />}
    </div>
  );
}
