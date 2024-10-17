'use client'
import { decryptMessage } from '@/lib/crypto';
import { getPrivateKey } from '@/lib/indexedDB';
import { useEffect, useState } from 'react';

export const useDecryptedMessages = (messages: string[]) => {
  const [decryptedMessages, setDecryptedMessages] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean[]>(new Array(messages.length).fill(true)); // Initial loading states

  useEffect(() => {

    const decryptAllMessages = async () => {
      const privateKey = await getPrivateKey()
      const decrypted = await Promise.all(messages.map(async (message, index) => {
        if (privateKey) {
          try {
            const decryptedMessage = decryptMessage(privateKey, message);
            loading[index] = false; // Set loading to false for this index
            return decryptedMessage;
          } catch {
            loading[index] = false; // Set loading to false even if there's an error
            return "Error decrypting message.";
          }
        } else {
          loading[index] = false; // Set loading to false if no private key
          return "Message is encrypted.";
        }
      }));

      setDecryptedMessages(decrypted);
      setLoading(loading);
    };

    decryptAllMessages();
  }, [messages]);

  return { decryptedMessages, loading };
};
