import { create } from "zustand";
import { createJSONStorage, persist, devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import type { Message } from "@shared/types";

export interface Chat {
  messages: Message[];
}

type ChatState = {
  chat: Chat;
  showChat: boolean;
};

type ChatActions = {
  setShowChat: (show: boolean) => void;
  setMessages: (messages: Message[]) => void;
  reset: () => void;
};

type ChatStore = ChatState & ChatActions;

const initialState: ChatState = {
  chat: {
    messages: [],
  },
  showChat: true,
};

export const useChatStore = create(
  devtools(
    persist(
      immer<ChatStore>((set) => ({
        ...initialState,
        setShowChat: (show) => set({ showChat: show }),
        setMessages: (messages) => set({ chat: { messages } }),
        reset: () => set({ ...initialState }),
      })),
      {
        name: "chat",
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
);
