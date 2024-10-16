
"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

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
