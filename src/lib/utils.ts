import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { useSession } from "next-auth/react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function useCheckEncryptionKey() {
  const { data: session } = useSession();
  if (session) {
    if (!session.user.hasEncryptionKey) return true;
    const privateKey = localStorage.getItem("privateKey");
    if (privateKey) {

      return true;
    } else {
      return false;
    }
  }
}