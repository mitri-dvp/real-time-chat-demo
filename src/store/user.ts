import { create } from "zustand";
import { createJSONStorage, persist, devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export interface User {
  id: string;
}

type UserState = {
  user: User | null;
};

type UserActions = {
  register: (socketId: string) => void;
  reset: () => void;
};

type UserStore = UserState & UserActions;

const initialState: UserState = {
  user: null,
};

export const useUserStore = create(
  devtools(
    persist(
      immer<UserStore>((set) => ({
        ...initialState,
        register: (socketId) => set({ user: { id: socketId } }),
        reset: () => set({ ...initialState }),
      })),
      {
        name: "user",
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
);
