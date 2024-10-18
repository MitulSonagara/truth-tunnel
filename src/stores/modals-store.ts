import { DefaultModal, defaultModalValues } from "@/types/default-modal-store";
import { create } from "zustand";


export const useDeleteModal = create<DefaultModal>(defaultModalValues);
export const useEncryptionKeyModal = create<DefaultModal>(defaultModalValues);
export const useChangeEncryptionKeyModal = create<DefaultModal>(defaultModalValues);
export const useForgetEncryptionKeyModal = create<DefaultModal>(defaultModalValues);

// username needs username field
interface UsernameModalProps {
  username?: string,
  isOpen: boolean;
  onOpen: (u?: string) => void;
  onClose: () => void;
}
export const useUsernameModal = create<UsernameModalProps>((set) => ({
  username: undefined,
  isOpen: false,
  onOpen: (u) => set({ isOpen: true, username: u }),
  onClose: () => set({ isOpen: false, username: undefined }),
}));