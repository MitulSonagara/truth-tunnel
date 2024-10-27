"use client";
import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import { toast } from "sonner";
import { Checkbox } from "../ui/checkbox";
import { useSession } from "next-auth/react";
import { useEncryptionKeyModal } from "@/stores/modals-store";
import { IGenerateKeyWorker } from "@/types/comlinkWorkerTypes";
import { wrap } from "comlink";
import { savePrivateKey } from "@/lib/indexedDB";
import { decryptPrivateKey } from "@/workers/crypto";

export default function EncryptionKeyModal() {
  const modal = useEncryptionKeyModal();
  const [secretPass, setsecretPass] = useState<string | null>(null);

  const [isGenerated, setIsGenerated] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state for request
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false); // Checkbox confirmation
  const { update } = useSession();

  const handleGenerateKeys = async () => {
    setLoading(true); // Start loading
    try {
      // Generate key pair (RSA or whichever algorithm you're using)
      console.log("GENERATING...");
      const worker = new Worker(
        new URL("../../workers/crypto.ts", import.meta.url),
        {
          type: "module",
        }
      );

      if (secretPass == null) return;

      const { generateKeyPair } = wrap<IGenerateKeyWorker>(worker);
      const { publicKey, privateKey } = await generateKeyPair({
        passphrase: secretPass,
      });

      worker.terminate();
      const localKey = decryptPrivateKey(privateKey, secretPass);
      await savePrivateKey(localKey!);
      // Send public key to server to store it
      const response = await axios.post("/api/savePublicKey", {
        publicKey,
        privateKey,
      });

      setIsGenerated(true); // Successfully generated and saved
      toast.success("keys are saved.", {
        description: "We have saved only keys with encryption.",
      });

      modal.onClose();
      await update({
        type: "change_key",
        key: true,
      });
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      console.error("Error generating keys:", error);
      toast.error("Error", {
        description:
          axiosError.response?.data.message || "Failed to generate keys",
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
            Generate Encryption Keys
          </AlertDialogTitle>

          <AlertDialogDescription className="mb-4">
            By generating an encryption key, your messages will be secured with
            end-to-end encryption.
          </AlertDialogDescription>

          <>
            <h3 className="text-lg font-semibold mb-2">
              Your Secret Passphrase
            </h3>
            <input
              className="w-full p-2 border rounded mb-4 overflow-hidden"
              value={secretPass ?? ""}
              placeholder="Enter strong passphrase"
              onChange={(e) => setsecretPass(e.target.value)}
            />

            <p className="text-sm text-red-500 mb-4">
              Disclaimer: Keep your Secret Passphrase secure. Do not share it
              with anyone. If you lose it, you will not be able to decrypt your
              messages. We do not store it on our servers.
            </p>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="confirmSave"
                disabled={loading}
                onCheckedChange={(v) => setIsConfirmed((prev) => !prev)}
                checked={isConfirmed}
              />
              <label
                htmlFor="confirmSave"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I have saved my Secret Passphrase.
              </label>
            </div>
          </>
        </AlertDialogHeader>

        <AlertDialogFooter>
          {isGenerated ? (
            <AlertDialogAction disabled={!isConfirmed}>
              Continue
            </AlertDialogAction>
          ) : (
            <>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <Button
                onClick={handleGenerateKeys}
                disabled={loading || !isConfirmed}
              >
                {loading ? "Generating..." : "Generate Encryption Key"}
              </Button>
            </>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
