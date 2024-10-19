import { DefaultModal, defaultModalValues } from "@/types/default-modal-store";
import { create } from "zustand";


export const useSearchSheet = create<DefaultModal>(defaultModalValues);
