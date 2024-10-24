'use client';
import { decryptMessage } from '@/lib/crypto';
import { getPrivateKey } from '@/lib/indexedDB';
import { useEffect, useState } from 'react';

export const useDecryptedMessages = (messages: string[]) => {
  const [decryptedMessages, setDecryptedMessages] = useState<(string | null)[]>([]);
  const [loading, setLoading] = useState<boolean[]>(new Array(messages.length).fill(true)); // Initial loading states

  useEffect(() => {
    const decryptAllMessages = async () => {
      const privateKey = await getPrivateKey();
      const newLoading = new Array(messages.length).fill(true); // Create a new loading array

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

    decryptAllMessages(); // Call the function

  }, []); // Empty dependency array to run only on mount

  return { decryptedMessages, loading };
};
    