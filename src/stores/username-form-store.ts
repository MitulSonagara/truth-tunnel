import { create } from "zustand";

interface useUsernameModalStore {
  username?: string,
  isOpen: boolean;
  onOpen: (u?: string) => void;
  onClose: () => void;
}

export const useUsernameModal = create<useUsernameModalStore>((set) => ({
  username: undefined,
  isOpen: false,
  onOpen: (u) => set({ isOpen: true, username: u }),
  onClose: () => set({ isOpen: false, username: undefined }),
}));