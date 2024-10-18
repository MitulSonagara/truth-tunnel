export interface DefaultModal {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const defaultModalValues = (set: any) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
})