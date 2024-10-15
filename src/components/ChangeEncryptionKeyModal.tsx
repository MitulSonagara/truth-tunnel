"use client";
import React, { useState } from "react";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogCancel,
} from "./ui/alert-dialog";
import { toast } from "sonner";
import { useChangeEncryptionKeyModal } from "@/stores/change-encryption-modal-store";
import axios from "axios";
import { decryptMessage } from "@/lib/crypto";
import { Button } from "./ui/button";
import { useForgetEncryptionKeyModal } from "@/stores/forget-encryption-modal-store";

export default function ChangeEncryptionKeyModal() {
  const modal = useChangeEncryptionKeyModal();
  const forgetEncryptionModal = useForgetEncryptionKeyModal();
  const [privateKey, setPrivateKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(false); // Loading state for request

  const handleSaveKey = async () => {
    setLoading(true); // Start loading
    try {
      if (privateKey == null) {
        toast.error("Error", {
          description: "Please enter validate Encryption key",
        });
      } else {
        // Fetch the encrypted message from the server
        const { data } = await axios.get("/api/check/encryption");

        // Decrypt the message
        const decodedMessage = decryptMessage(privateKey, data.message);
        if (decodedMessage == "secured") {
          // Store new private key in local storage
          localStorage.setItem("privateKey", privateKey);
          toast.success("Encryption key is saved!");
          modal.onClose();
          return;
        }
        if (decodedMessage == "unsecured") {
          // Store new private key in local storage
          localStorage.setItem("privateKey", privateKey);
          toast.info("Encryption key is saved!", {
            description: "Please generate new encryption key.",
          });
          modal.onClose();
          return;
        }
        toast.error("Wrong Encryption key", {
          description: "Please check encyption key again or create new.",
        });
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
            Add Encryption Keys
          </AlertDialogTitle>

          <>
            <h3 className="text-lg font-semibold mb-2">Your Private Key</h3>
            <textarea
              className="w-full p-2 border rounded mb-4 overflow-hidden"
              value={privateKey ?? ""}
              onChange={(e) => setPrivateKey(e.target.value)}
              rows={6}
              minLength={100}
            />
          </>
        </AlertDialogHeader>
        <Button
          variant="link"
          className="text-muted-foreground"
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
