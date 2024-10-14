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

export default function ForgetEncryptionKeyModal() {
  const modal = useForgetEncryptionKeyModal();
  const forgetEncryptionModal = useForgetEncryptionKeyModal();
  const [privateKey, setPrivateKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(false); // Loading state for request

  const handleSaveKey = async () => {
    setLoading(true); // Start loading
    try {
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
            Forget Encryption Keys
          </AlertDialogTitle>

          <>TODO!: Feature is comming soon</>
        </AlertDialogHeader>

        <AlertDialogFooter>
          {/* <Button disabled={loading} onClick={handleSaveKey}>
            Save
          </Button> */}

          <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
