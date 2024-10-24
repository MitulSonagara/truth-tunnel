"use client";
import { acceptMessageSchema } from "@/schemas/acceptMessageSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { User } from "next-auth";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import Navbar from "@/components/Navbar";
import { Separator } from "@/components/ui/separator";
import { Copy, ListX, Loader2, RefreshCcw, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  useChangeEncryptionKeyModal,
  useDeleteModal,
  useEncryptionKeyModal,
} from "@/stores/modals-store";
import GenerateEncryptionAlert from "@/components/alerts/generate-encryption-alert";
import AddEncryptionAlert from "@/components/alerts/add-encryption-alert";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  toggleAcceptMessages,
  fetchAcceptMessages,
  fetchMessages,
} from "@/lib/queries";
import Messages from "@/components/Messages";
import { useCheckEncryptionKey } from "@/hooks/check-encryptionkey";
import { useProfileUrl } from "@/hooks/useProfileUrl";

import { useSearchSheet } from "@/stores/sheets-store";

const Page = () => {
  const hasEncryptionKey = useCheckEncryptionKey();

  const deleteMessagesModal = useDeleteModal();
  const encryptionModal = useChangeEncryptionKeyModal();
  const { data: session, status } = useSession();
  useEffect(() => {
    if (user.hasEncryptionKey && !hasEncryptionKey) {
      encryptionModal.onOpen();
    }
  }, [hasEncryptionKey]);

  const queryClient = useQueryClient();
  const searchSheet = useSearchSheet();

  // Mutation to toggle accept messages
  const toggleAcceptMessagesMutation = useMutation({
    mutationFn: toggleAcceptMessages,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["acceptMessages"],
      });
      setValue("accept-messages", !acceptMessages);
      toast.success(data.message);
    },
    onError: (error: any) => {
      toast.error("Error", {
        description:
          error.response?.data.message || "Failed to update message settings",
      });
    },
  });

  const form = useForm({
    resolver: zodResolver(acceptMessageSchema),
  });

  const { register, setValue } = form;

  // Query to fetch messages
  const { data: messagesData, isLoading: isMessagesLoading } = useQuery({
    queryKey: ["messages"],
    queryFn: fetchMessages,
    retry: (failureCount, error) => {
      return false;
    },
  });

  // Query to fetch accept messages status
  const { data: acceptMessages, isLoading: isSwitchLoading } = useQuery({
    queryKey: ["acceptMessages"],
    queryFn: fetchAcceptMessages,
  });

  const handleSwitchChange = () => {
    toggleAcceptMessagesMutation.mutate(!acceptMessages);
  };

  const user = session?.user as User;
  const profileUrl = useProfileUrl(user?.username) ?? "";
  const copyToClipboard = () => {
    navigator.clipboard.writeText(profileUrl);
    toast.success("URL copied", {
      description: "Profile url has been copied to clipboard",
    });
  };

  if (status == "loading") {
    return (
      <>
        <Navbar />
        <div className="flex justify-center mt-5">Loading. Please Wait</div>
      </>
    );
  }

  if (!session || !session.user) {
    return (
      <>
        <Navbar />
        <div className="flex justify-center mt-5">Please Login</div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="my-8 mt-10 mx-4 md:mx-8 lg:mx-auto p-6 rounded w-screen max-w-6xl">
        {!user.hasEncryptionKey && <GenerateEncryptionAlert />}
        {user.hasEncryptionKey && !hasEncryptionKey && <AddEncryptionAlert />}
        <h1 className="text-4xl font-bold mb-4">Hi {user.username},</h1>
        <div className="mb-4">
          <div className="mt-2 border p-2 rounded-2xl flex items-center gap-3">
            <Input
              type="text"
              value={profileUrl}
              disabled
              className="input rounded-xl input-bordered w-full p-2 mr-2"
            />
            <Button
              onClick={copyToClipboard}
              className="rounded-full"
              size="icon"
            >
              <Copy className="h-5 w-5" />
            </Button>
            <Button
              className="rounded-full"
              variant="outline"
              size="icon"
              onClick={() => searchSheet.onOpen()}
            >
              <Search className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="mb-4">
          <Switch
            {...register("acceptMessages")}
            checked={acceptMessages}
            onCheckedChange={handleSwitchChange}
            disabled={isSwitchLoading}
          />
          <span className="ml-2">
            Accept Messages: {acceptMessages ? "On" : "Off"}
          </span>
        </div>
        <Separator />
        <div className="flex justify-between items-center py-2">
          <p className="text-xl">Your Anonymous Transmissions</p>
          <div className="flex space-x-2 items-center">
            <Button
              className="rounded-xl"
              variant="outline"
              onClick={(e) => {
                e.preventDefault();
                queryClient.invalidateQueries({ queryKey: ["messages"] });
              }}
            >
              <RefreshCcw className="h-4 w-4" />
            </Button>
            {messagesData && messagesData.length > 0 && (
              <Button
                className="rounded-xl"
                variant="outline"
                onClick={(e) => deleteMessagesModal.onOpen()}
              >
                <ListX />
              </Button>
            )}
          </div>
        </div>

        <div className="mt-5 ">
          {isMessagesLoading ? (
            <div className="flex justify-center mt-5">
              <Loader2 className="w-6 h-6 animate-spin" />
            </div>
          ) : (
            <Messages messages={messagesData} />
          )}
        </div>
      </div>
    </>
  );
};

export default Page;
