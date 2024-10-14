"use client";
import { Message } from "@/model/User";
import { acceptMessageSchema } from "@/schemas/acceptMessageSchema";
import { ApiResponse } from "@/types/ApiResponse";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { User } from "next-auth";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Navbar from "@/components/Navbar";
import { Separator } from "@/components/ui/separator";
import {
  AlertCircle,
  Edit3,
  GlobeLockIcon,
  Loader2,
  RefreshCcw,
  Trash2,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import momment from "moment";
import { useUsernameModal } from "@/stores/username-form-store";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useEncryptionKeyModal } from "@/stores/encryption-key-modal-store";
import { decryptMessage } from "@/lib/crypto";
import { useCheckEncryptionKey } from "@/lib/utils";
import { useChangeEncryptionKeyModal } from "@/stores/change-encryption-modal-store";

const Page = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isSwitchLoading, setIsSwitchLoading] = useState<boolean>(false);
  const [baseUrl, setBaseUrl] = useState("");
  const modal = useUsernameModal();
  const hasEncryptionKey = useCheckEncryptionKey();
  const encryptionKeyModal = useEncryptionKeyModal();
  const changeEncryptionKeyModal = useChangeEncryptionKeyModal();
  const handleDeleteMessages = async (messageId: string) => {
    setMessages(messages.filter((message) => message.id !== messageId));
    try {
      const res = await axios.delete(`/api/delete-message/${messageId}`);
      toast.success("Success", { description: "Message deleted Successfully" });
    } catch (error) {
      console.error(error);
      setMessages((prevMessages) => [
        ...prevMessages,
        ...messages.filter((m) => m.id === messageId),
      ]);
    }
  };

  const { data: session, status } = useSession();
  const form = useForm({
    resolver: zodResolver(acceptMessageSchema),
  });

  const { register, watch, setValue } = form;

  const acceptMessages = watch("accept-messages");

  const fetchAcceptMessages = useCallback(async () => {
    setIsSwitchLoading(true);
    try {
      const response = await axios.get<ApiResponse>(`/api/accept-messages`);
      setValue("accept-messages", response.data.isAcceptingMessages);
      console.log("adaf", acceptMessages);
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast.error("Error", {
        description:
          axiosError.response?.data.message ||
          "Failed to fetch message settings",
      });
    } finally {
      setIsSwitchLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setValue, toast, watch]);

  const renderDecryptedMessage = (message: string) => {
    const privateKey = localStorage.getItem("privateKey");
    if (privateKey) {
      return decryptMessage(privateKey, message);
    } else {
      return "Message is encrypted.";
    }
  };

  const fetchMessages = useCallback(
    async (refresh: boolean = false) => {
      setLoading(true);
      setIsSwitchLoading(false);
      try {
        const response = await axios.get<ApiResponse>(`/api/get-messages`);
        setMessages(response.data.messages || []);
        if (refresh) {
          toast.success("Refreshed Messages", {
            description: "Showing latest messages",
          });
        }
      } catch (error) {
        const axiosError = error as AxiosError<ApiResponse>;
        if (axiosError.response?.status == 404) return;

        toast.error("Error", {
          description:
            axiosError.response?.data.message ||
            "Failed to fetch message settings",
        });
      } finally {
        setIsSwitchLoading(false);
        setLoading(false);
      }
    },
    [setIsSwitchLoading, setMessages, toast]
  );

  useEffect(() => {
    if (!session || !session.user) return;
    setBaseUrl(`${window.location.protocol}//${window.location.host}`);
    fetchAcceptMessages();
    fetchMessages();
  }, [session, setValue, fetchAcceptMessages, fetchMessages]);

  const handleSwitchChange = async () => {
    try {
      const response = await axios.post("/api/accept-messages", {
        acceptMessages: !acceptMessages,
      });
      setValue("accept-messages", !acceptMessages);
      toast.success(response.data.message);
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;

      toast.error("Error", {
        description:
          axiosError.response?.data.message ||
          "Failed to fetch message settings",
      });
    }
  };

  const username = session?.user as User;
  const profileUrl = `${baseUrl}/u/${username?.username}`;
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
      <div className="my-8 mx-4 md:mx-8 lg:mx-auto p-6 rounded w-full max-w-6xl">
        {!username.hasEncryptionKey && (
          <Alert variant="destructive" className="my-4">
            <AlertCircle className="h-4 w-4" />
            <div className="flex justify-between items-center">
              <div>
                <AlertTitle>Action Required!</AlertTitle>
                <AlertDescription>
                  Your account is not yet secured. Please generate an encryption
                  key. <br />
                  You won&apos;t recieve any message until to generate.
                </AlertDescription>
              </div>
              <Button onClick={() => encryptionKeyModal.onOpen()}>
                Generate Encryption Key
              </Button>
            </div>
          </Alert>
        )}
        {!hasEncryptionKey && (
          <Alert variant="destructive" className="my-4">
            <AlertCircle className="h-4 w-4" />
            <div className="flex justify-between items-center">
              <div>
                <AlertTitle>Action Required!</AlertTitle>
                <AlertDescription>
                  Your account has generate encryption key. Please add that to
                  decrypt the messages. <br />
                </AlertDescription>
              </div>
              <Button onClick={() => changeEncryptionKeyModal.onOpen()}>
                Add Encryption Key
              </Button>
            </div>
          </Alert>
        )}
        <h1 className="text-4xl font-bold mb-4">Hi {username.username},</h1>

        <div className="mb-4">
          <div className="mt-2 border p-2 rounded-2xl flex items-center gap-3">
            <Input
              type="text"
              value={profileUrl}
              disabled
              className="input rounded-xl input-bordered w-full p-2 mr-2"
            />
            <Button
              className="rounded-full"
              variant="outline"
              size="icon"
              onClick={() => modal.onOpen(username.username)}
            >
              <Edit3 className="h-5 w-5" />
            </Button>
            <Button
              className="rounded-full"
              variant="outline"
              size="icon"
              onClick={() => changeEncryptionKeyModal.onOpen()}
            >
              <GlobeLockIcon className="h-5 w-5" />
            </Button>
            <Button onClick={copyToClipboard} className="rounded-xl">
              Copy
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
          <Button
            className="rounded-xl"
            variant="outline"
            onClick={(e) => {
              e.preventDefault();
              fetchMessages(true);
            }}
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <RefreshCcw className="h-4 w-4" />
            )}
          </Button>
        </div>

        <div className="mt-5 ">
          {messages.length > 0 ? (
            messages.map(({ content, id, createdAt }, index) => (
              <div key={index} className="shadow-md border rounded-2xl p-3 m-2">
                <div className="p-4 flex justify-between items-start">
                  <div>
                    <p className="font-bold  md:text-2xl">
                      {renderDecryptedMessage(content)}
                    </p>
                    <p>{momment(createdAt).fromNow()}</p>
                  </div>
                  <div>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button className="rounded-xl" variant="destructive">
                          <Trash2 className="h-5 w-5" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you absolutely sure?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone &#46; This will
                            permanently delete your message and remove your data
                            from our servers &#46;
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel className="rounded-xl">
                            Cancel
                          </AlertDialogCancel>
                          <AlertDialogAction
                            className="bg-red-500 rounded-xl"
                            onClick={() => handleDeleteMessages(id as string)}
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No messages</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Page;
