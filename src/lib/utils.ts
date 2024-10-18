import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { decryptMessage } from "./crypto";
import { getPrivateKey } from "./indexedDB";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const renderDecryptedMessage = async (message: string) => {
  const privateKey = await getPrivateKey();
  if (privateKey) {
    return decryptMessage(privateKey, message);
  } else {
    return "Message is encrypted.";
  }
};