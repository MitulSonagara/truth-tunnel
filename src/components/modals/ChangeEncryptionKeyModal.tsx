"use client";
import React, { useState } from "react";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogCancel,
} from "../ui/alert-dialog";
import { toast } from "sonner";
import axios from "axios";
import { Button } from "../ui/button";
import {
  useChangeEncryptionKeyModal,
  useForgetEncryptionKeyModal,
} from "@/stores/modals-store";
import { savePrivateKey } from "@/lib/indexedDB";
import { decryptPrivateKey } from "@/workers/crypto";
import { useRouter } from "nextjs-toploader/app";

export default function ChangeEncryptionKeyModal() {
  const modal = useChangeEncryptionKeyModal();
  const forgetEncryptionModal = useForgetEncryptionKeyModal();
  const [secretPass, setsecretPass] = useState<string | null>(null);
  const [loading, setLoading] = useState(false); // Loading state for request
  const router = useRouter();
  const handleSaveKey = async () => {
    setLoading(true); // Start loading
    try {
      if (secretPass == null) {
        toast.error("Error", {
          description: "Please enter validate Secret Passphase",
        });
      } else {
        // Fetch the encrypted message from the server
        const { data } = await axios.get("/api/keys");

        // Decrypt the message
        const decodedKey = decryptPrivateKey(data.encryptedKey, secretPass);
        if (decodedKey == null) {
          toast.error("Wrong Encryption key", {
            description: "Please check Secret Passphase again or create new.",
          });
          return;
        }
        console.log(decodedKey);
        await savePrivateKey(decodedKey);
        toast.success("keys unlocked and saved!");
        router.push("/dashboard");
        modal.onClose();
      }
    } catch (error) {
      console.error("Error saving key:", error);
      toast.error("Error", {
        description: "Error saving key. try again",
      });
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <AlertDialog open={modal.isOpen} onOpenChange={() => modal.onClose()}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl font-bold mb-4">
            Unlock Encryption Keys
          </AlertDialogTitle>

          <>
            <h3 className="text-lg font-semibold mb-2">
              Your Secret Passphrase
            </h3>
            <input
              className="w-full p-2 border rounded mb-4 overflow-hidden"
              value={secretPass ?? ""}
              onChange={(e) => setsecretPass(e.target.value)}
            />
          </>
        </AlertDialogHeader>
        <Button
          variant="link"
          className="text-muted-foreground text-red-500"
          onClick={() => {
            modal.onClose();
            forgetEncryptionModal.onOpen();
          }}
        >
          Forget or regenerate new encryption key
        </Button>
        <AlertDialogFooter>
          <Button disabled={loading} onClick={handleSaveKey}>
            Save
          </Button>

          <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
