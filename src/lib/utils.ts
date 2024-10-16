import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { decryptMessage } from "./crypto";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const renderDecryptedMessage = (message: string) => {
  const privateKey = typeof window !== "undefined" ? localStorage.getItem("privateKey") : null;
  if (privateKey) {
    return decryptMessage(privateKey, message);
  } else {
    return "Message is encrypted.";
  }
};