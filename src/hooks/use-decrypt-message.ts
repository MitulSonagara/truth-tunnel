'use client';
import { decryptMessage } from '@/lib/crypto';
import { getPrivateKey } from '@/lib/indexedDB';
import { useEffect, useState } from 'react';

export const useDecryptedMessages = (messages: string[]) => {
  const [decryptedMessages, setDecryptedMessages] = useState<(string | null)[]>([]);
  const [loading, setLoading] = useState<boolean[]>(new Array(messages.length).fill(true)); // Initial loading states

  const decryptAllMessages = async (messages: string[]) => {
    const privateKey = await getPrivateKey();
    const newLoading = [...loading]; // Create a new loading array

    const decrypted = await Promise.all(messages.map(async (message, index) => {
      if (privateKey) {
        try {
          const decryptedMessage = decryptMessage(privateKey, message);
          newLoading[index] = false; // Set loading to false for this index
          return decryptedMessage;
        } catch {
          newLoading[index] = false; // Set loading to false even if there's an error
          return "Error decrypting message.";
        }
      } else {
        newLoading[index] = false; // Set loading to false if no private key
        return "Message is encrypted.";
      }
    }));

    setDecryptedMessages(decrypted);
    setLoading(newLoading); // Update state with the new loading array
  };

  useEffect(() => {
    decryptAllMessages(messages); // Call the function with the messages
  }, []); // Empty dependency array to call once on mount

  return { decryptedMessages, loading };
};
