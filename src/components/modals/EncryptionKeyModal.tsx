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
import { Copy, Printer } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEncryptionKeyModal } from "@/stores/modals-store";
import { IGenerateKeyWorker } from "@/types/comlinkWorkerTypes";
import { wrap } from "comlink";
import { savePrivateKey } from "@/lib/indexedDB";

export default function EncryptionKeyModal() {
  const modal = useEncryptionKeyModal();
  const [privateKey, setPrivateKey] = useState<string | null>(null);
  const [publicKey, setPublicKey] = useState<string | null>(null);
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

      const { generateKeyPair } = wrap<IGenerateKeyWorker>(worker);
      const { publicKey, privateKey } = await generateKeyPair();
      setPrivateKey(privateKey);
      setPublicKey(publicKey);
      worker.terminate();

      await savePrivateKey(privateKey);
      // Send public key to server to store it
      const response = await axios.post("/api/savePublicKey", { publicKey });

      setIsGenerated(true); // Successfully generated and saved
      toast.success("Public key is saved. Copy Private Key!", {
        description: "We have saved only public key.",
      });

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

  const handleCopyPrivateKey = () => {
    if (privateKey) {
        navigator.clipboard.writeText(privateKey).then(() => {
            toast.success("Private Key copied to clipboard!", {
              description: "Keep it very safe.",
            });
        });
    }
  };

  const handlePrintPrivateKey = () => {
    if (privateKey) {
      const newWindow = window.open();
      if (newWindow) {
        newWindow.document.write(`<pre>${privateKey}</pre>`);
        newWindow.document.close(); // Close the document for rendering
        newWindow.print();
      }
    }
  };

  return (
    <AlertDialog open={modal.isOpen} onOpenChange={() => modal.onClose()}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl font-bold mb-4">
            Generate Encryption Keys
          </AlertDialogTitle>

          {!isGenerated ? (
            <>
              <AlertDialogDescription className="mb-4">
                By generating an encryption key, your messages will be secured
                with end-to-end encryption.
              </AlertDialogDescription>
              <Button onClick={handleGenerateKeys} disabled={loading}>
                {loading ? "Generating..." : "Generate Encryption Key"}
              </Button>
            </>
          ) : (
            <>
              <h3 className="text-lg font-semibold mb-2">Your Private Key</h3>
              <textarea
                className="w-full p-2 border rounded mb-4 overflow-hidden"
                value={privateKey ?? ""}
                readOnly
                rows={6}
              />
              <div className="flex justify-end mb-4 space-x-2">
                <Button
                  onClick={handleCopyPrivateKey}
                  size={"icon"}
                  className="rounded-full"
                  variant={"outline"}
                >
                  <Copy />
                </Button>
                <Button
                  onClick={handlePrintPrivateKey}
                  size={"icon"}
                  className="rounded-full"
                  variant={"outline"}
                >
                  <Printer />
                </Button>
              </div>
              <p className="text-sm text-red-500 mb-4">
                Disclaimer: Keep your private key secure. Do not share it with
                anyone. If you lose it, you will not be able to decrypt your
                messages. We do not store it on our servers. You will need to
                add your key again every 7 days for privacy.
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
                  I have saved my private key.
                </label>
              </div>
            </>
          )}
        </AlertDialogHeader>

        <AlertDialogFooter>
          {isGenerated ? (
            <AlertDialogAction disabled={!isConfirmed}>
              Continue
            </AlertDialogAction>
          ) : (
            <AlertDialogCancel>Cancel</AlertDialogCancel>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
