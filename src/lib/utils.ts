"use client";
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
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
export function useCheckEncryptionKey() {
  const { data: session } = useSession();
  const [hasEncryptionKey, setHasEncryptionKey] = useState<boolean>(true);

  useEffect(() => {
    if (session) {
      if (!session.user.hasEncryptionKey) {
        setHasEncryptionKey(false);
      } else {
        // Ensure that we're in the browser and `localStorage` is available
        const privateKey = typeof window !== "undefined" ? localStorage.getItem("privateKey") : null;
        if (privateKey) {
          setHasEncryptionKey(true);
        } else {
          setHasEncryptionKey(false);
        }
      }
    }
  }, [session]);

  return hasEncryptionKey;
}
