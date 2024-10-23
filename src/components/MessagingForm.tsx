"use client";

import axios, { AxiosError } from "axios";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import { useSession } from "next-auth/react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Loader2, Lock } from "lucide-react";
import { encryptMessage } from "@/lib/crypto";
import { Badge } from "./ui/badge";

const formSchema = z.object({
  content: z.string().min(10, {
    message: "Content must be at least 10 characters.",
  }),
});

interface PartialUser {
  username: string;
  encryptionKey: {
    publicKey: string;
  } | null;
}

export default function MessagingForm({ user }: { user: PartialUser }) {
  const { status } = useSession();
  const [loading, setIsLoading] = useState<boolean>(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    },
  });

  const sendMessage = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      if (user.encryptionKey == null) {
        toast.error("Error", {
          description:
            "You can't send message until they generate an encryption key",
        });
        return;
      }
  
      const encryptedMessage = encryptMessage(
        user.encryptionKey.publicKey,
        data.content
      );
  
      const res = await axios.post("/api/messages/send", {
        username: user.username,
        content: encryptedMessage,
      });
      toast.success("Success", { description: "Message sent successfully" });
  
      // Reset the form after successful message sending
      form.reset();
    } catch (error) {
      const axiosError = error as AxiosError<any>;
      let errorMessage =
        axiosError.response?.data.message || "An error occurred";
      toast.error("Error", { description: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="flex justify-center">
      <div className="p-3 flex gap-2 flex-col">
        <p className="font-bold md:text-2xl">
          Send secret message to @{user.username}.
        </p>
        <div className="flex justify-between items-center md:flex-row flex-col space-y-1">
          <p className="font-semibold">
            Don&apos;t worry, it&apos;s just between us.
          </p>
          <Badge
            variant="outline"
            className="flex items-center gap-1 px-2 py-1 dark:bg-green-950 dark:text-green-200 dark:border-green-800 bg-green-100 text-green-800 border-green-300 rounded-full"
          >
            <Lock className="w-3 h-3" />
            <span className="text-xs font-medium">
              End-to-end, because trust issues.
            </span>
          </Badge>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(sendMessage)}
            className="space-x-2 flex items-center"
          >
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="md:w-[40rem] rounded-xl"
                      placeholder="Enter messages here"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-center">
              <Button type="submit" className="rounded-xl" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-4 h-4 w-4 animate-spin" />
                    Please wait
                  </>
                ) : (
                  "Send"
                )}
              </Button>
            </div>
          </form>
        </Form>

        {status == "unauthenticated" && (
          <div className="flex justify-center flex-col gap-2 items-center mt-10">
            <h1 className="font-bold">To Participate in a Secret Mission</h1>
            <Link href="/sign-up">
              <Button className="w-min rounded-xl">Create an Account</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
