import { useChatStore } from "@/store/chat";

export default function StartChatButton() {
  const { setShowChat } = useChatStore();

  const handleShowChat = () => {
    setShowChat(true);
  };

  return (
    <button
      className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
      onClick={handleShowChat}
    >
      Open Chat
    </button>
  );
}
