import { Trash2 } from "lucide-react";
import React, { useState } from "react"; // Import useState
import { Button } from "./ui/button";
import { Message } from "@prisma/client";
import moment from "moment";
import { deleteMessage } from "@/lib/queries";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useDecryptedMessages } from "@/hooks/use-decrypt-message";
import { Loader2 } from "lucide-react";


export default function Messages({
  messages,
}: {
  messages: Message[] | undefined;
}) {
  const queryClient = useQueryClient();
  
  // State to track loading for each message
  const [loadingMessageId, setLoadingMessageId] = useState<string | null>(null);
  
  // Mutation to delete a message
  const deleteMessageMutation = useMutation({
    mutationFn: deleteMessage,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["messages"],
      });
      toast.success("Message deleted successfully");
      setLoadingMessageId(null); // Reset loading state
    },
    onError: (error: any) => {
      toast.error("Error", {
        description: error.response?.data.message || "Failed to delete message",
      });
      setLoadingMessageId(null); // Reset loading state
    },
  });

  const handleDeleteMessages = (messageId: string) => {
    setLoadingMessageId(messageId); // Set loading state for the message being deleted
    deleteMessageMutation.mutate(messageId, {
      onSuccess: () => {
        // Remove the deleted message from the local messages array
        const updatedMessages = messages?.filter(message => message.id !== messageId);
        queryClient.setQueryData(["messages"], updatedMessages); // Update the cached messages
        toast.success("Message deleted successfully");
      },
      onError: (error: any) => {
        toast.error("Error", {
          description: error.response?.data.message || "Failed to delete message",
        });
      },
    });
  };
  

  const messageContents = messages?.map((message) => message.content) || [];
  const { decryptedMessages, loading } = useDecryptedMessages(messageContents); // Use the custom hook

  return (
    <div>
      {messages && messages.length > 0 ? (
        <ul className="space-y-4">
          {messages.map(({ content, createdAt, id }, index) => {
            return (
              <li
                key={id}
                className="border p-4 rounded-xl flex justify-between"
              >
                <div>
                  {loading[index] ? ( // Show loading state for this message
                    <p>Decrypting...</p>
                  ) : (
                    <>
                      <p className="font-bold md:text-2xl">
                        {decryptedMessages[index]}
                      </p>
                      <p>{moment(createdAt).fromNow()}</p>
                    </>
                  )}
                </div>
                <Button
                  variant="destructive"
                  className="rounded-full"
                  onClick={() => handleDeleteMessages(id)}
                  disabled={loadingMessageId === id} // Disable button if this message is being deleted
                >
                  {loadingMessageId === id ? ( // Show loader while deleting
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <Trash2 className="h-5 w-5" />
                  )}
                </Button>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="text-center text-gray-500">No messages yet.</p>
      )}
    </div>
  );
}
