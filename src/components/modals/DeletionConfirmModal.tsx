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
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import { toast } from "sonner";
import { useRouter } from "nextjs-toploader/app";
import { useDeleteModal } from "@/stores/modals-store";

export default function DeletConfirmationModal() {
  const modal = useDeleteModal();
  const [loading, setLoading] = useState(false); // Loading state for request
  const router = useRouter();
  const handleDeleteMessages = async () => {
    setLoading(true); // Start loading
    try {
      // Send public key to server to store it
      const res = await axios.delete(`/api/messages/delete`);
      router.refresh();
      toast.success("Success", {
        description: "All messages deleted Successfully",
      });
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      console.error("Error deleting messages:", error);
      toast.error("Error", {
        description:
          axiosError.response?.data.message || "Failed to delete messages",
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
            Delete all messages
          </AlertDialogTitle>

          <AlertDialogDescription>
            This action cannot be undone&#46; This will permanently delete your
            messages and remove your data from our servers&#46;
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogAction
            className="bg-red-500 rounded-xl"
            onClick={() => handleDeleteMessages()}
            disabled={loading}
          >
            Continue
          </AlertDialogAction>

          <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
