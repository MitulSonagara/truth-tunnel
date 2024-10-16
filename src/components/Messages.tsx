import { renderDecryptedMessage } from "@/lib/utils";
import { Trash2 } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import { Message } from "@prisma/client";
import moment from "moment";
import { deleteMessage } from "@/lib/queries";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export default function Messages({
  messages,
}: {
  messages: Message[] | undefined;
}) {
  const queryClient = useQueryClient();
  // Mutation to delete a message
  const deleteMessageMutation = useMutation({
    mutationFn: deleteMessage,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["messages"],
      });
      toast.success("Message deleted successfully");
    },
    onError: (error: any) => {
      toast.error("Error", {
        description: error.response?.data.message || "Failed to delete message",
      });
    },
  });

  const handleDeleteMessages = (messageId: string) => {
    deleteMessageMutation.mutate(messageId);
  };
  return (
    <div>
      {messages && messages.length > 0 ? (
        <ul className="space-y-4">
          {messages.map(({ content, createdAt, id }) => (
            <li key={id} className="border p-4 rounded-xl flex justify-between">
              <div>
                <p className="font-bold  md:text-2xl">
                  {renderDecryptedMessage(content)}
                </p>
                <p>{moment(createdAt).fromNow()}</p>
              </div>
              <Button
                variant="destructive"
                className="rounded-full"
                onClick={() => handleDeleteMessages(id)}
              >
                <Trash2 className="h-5 w-5" />
              </Button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500">No messages yet.</p>
      )}
    </div>
  );
}
