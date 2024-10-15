import React from "react";
import UsernameChangeForm from "@/components/UsernameChangeForm";
import EncryptionKeyModal from "@/components/EncryptionKeyModal";
import ChangeEncryptionKeyModal from "@/components/ChangeEncryptionKeyModal";
import ForgetEncryptionKeyModal from "@/components/ForgetEncryptionKeyModal";

export default function Modals() {
  return (
    <>
      <UsernameChangeForm />
      <EncryptionKeyModal />
      <ChangeEncryptionKeyModal />
      <ForgetEncryptionKeyModal />
    </>
  );
}
