"use client";

import React from "react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { AlertCircle } from "lucide-react";
import { Button } from "../ui/button";
import { useChangeEncryptionKeyModal } from "@/stores/modals-store";

export default function AddEncryptionAlert() {
  const addEncryptionKeyModal = useChangeEncryptionKeyModal();

  return (
    <Alert variant="destructive" className="my-4 w-96 mx-auto">
      <AlertCircle className="h-4 w-4" />
      <div className="flex justify-between items-center">
        <div>
          <AlertTitle>Action Required!</AlertTitle>
          <AlertDescription>
            Your account has generated encryption key. Please add that to decrypt
            the messages. <br />
          </AlertDescription>
        </div>
        <Button className="ml-1" onClick={() => addEncryptionKeyModal.onOpen()}>
          Add Encryption Key
        </Button>
      </div>
    </Alert>
  );
}
