interface ChatHeaderProps {
  closeChat: () => void;
}

export default function ChatHeader({ closeChat }: ChatHeaderProps) {
  return (
    <div className="flex items-center rounded-t-3xl bg-gray-50 p-4">
      <div className="relative mr-4 size-4">
        <div className="absolute left-1/2 top-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500" />
        <div className="absolute size-4 animate-pulse rounded-full bg-emerald-500" />
      </div>
      <h1 className="text-sm font-semibold leading-6 text-gray-900">
        Real-Time Chat
      </h1>
      <button onClick={closeChat} className="ml-auto size-max">
        <i className="bi bi-x-lg text-gray-900" />
      </button>
    </div>
  );
}
