"use client";

import { getPrivateKey } from "@/lib/indexedDB";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export function useCheckEncryptionKey() {
  const { data: session } = useSession();
  const [hasEncryptionKey, setHasEncryptionKey] = useState<boolean>(true);

  useEffect(() => {
    const checkEncryptionKey = async () => {
      if (session) {
        if (!session.user.hasEncryptionKey) {
          setHasEncryptionKey(false);
        } else {
          const privateKey = await getPrivateKey();
          if (privateKey) {
            setHasEncryptionKey(true);
          } else {
            setHasEncryptionKey(false);
          }
        }
      }
    };

    checkEncryptionKey();
  }, [session]);

  return hasEncryptionKey;
}
