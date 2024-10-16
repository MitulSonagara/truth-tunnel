"use client";

import React from "react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { AlertCircle } from "lucide-react";
import { Button } from "../ui/button";
import { useEncryptionKeyModal } from "@/stores/modals-store";

export default function GenerateEncryptionAlert() {
  const encryptionKeyModal = useEncryptionKeyModal();

  return (
    <Alert variant="destructive" className="my-4">
      <AlertCircle className="h-4 w-4" />
      <div className="flex justify-between items-center">
        <div>
          <AlertTitle>Action Required!</AlertTitle>
          <AlertDescription>
            Your account is not yet secured. Please generate an encryption key.{" "}
            <br />
            You won&apos;t recieve any message until to generate.
          </AlertDescription>
        </div>
        <Button onClick={() => encryptionKeyModal.onOpen()}>
          Generate Encryption Key
        </Button>
      </div>
    </Alert>
  );
}
