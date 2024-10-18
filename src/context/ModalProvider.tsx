import React from "react";
import UsernameChangeForm from "@/components/modals/UsernameChangeModal";
import EncryptionKeyModal from "@/components/modals/EncryptionKeyModal";
import ChangeEncryptionKeyModal from "@/components/modals/ChangeEncryptionKeyModal";
import ForgetEncryptionKeyModal from "@/components/modals/ForgetEncryptionKeyModal";
import DeletConfirmationModal from "@/components/modals/DeletionConfirmModal";

export default function Modals() {
  return (
    <>
      <UsernameChangeForm />
      <EncryptionKeyModal />
      <ChangeEncryptionKeyModal />
      <ForgetEncryptionKeyModal />
      <DeletConfirmationModal />
    </>
  );
}
