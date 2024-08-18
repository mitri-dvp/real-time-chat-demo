import useSocket from "@/hooks/useSocket";
import { useForm } from "react-hook-form";

export default function ChatFooter() {
  const socket = useSocket();

  const form = useForm({
    defaultValues: {
      message: "",
    },
  });

  const sendMessage = form.handleSubmit((data) => {
    if (data.message.trim() && socket) {
      socket.emit("send_message", { message: data.message });
      form.setValue("message", "");
    }
  });

  return (
    <form
      className="m-4 flex rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5"
      onSubmit={sendMessage}
    >
      <input
        {...form.register("message")}
        type="text"
        className="flex-1 rounded-3xl p-4 outline-none"
        placeholder="Type a message"
      />
      <button
        onClick={sendMessage}
        className="ml-auto mr-0 h-auto w-12 self-stretch rounded-3xl"
      >
        <i
          className={`bi bi-send-fill text-lg transition-all ${form.watch().message.trim() ? "text-blue-500" : "text-gray-500"}`}
        />
      </button>
    </form>
  );
}
