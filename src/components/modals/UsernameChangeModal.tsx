"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import React, { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { ApiResponse } from "@/types/ApiResponse";
import { useSession } from "next-auth/react";
import { useDebounce } from "use-debounce";
import { useUsernameModal } from "@/stores/modals-store";
const FormSchema = z.object({
  username: z
    .string()
    .min(2, "Username must be atleast 2 characters")
    .max(20, "Username must be no more than 20 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Username must not contain special characters")
    .regex(/^[a-z0-9_]+$/, "Username must not contain capital letters"),
});

export default function UsernameChangeForm() {
  const modal = useUsernameModal();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [username, setUsername] = useState("");
  const [usernameMessage, setUsernameMessage] = useState("");
  const { update } = useSession();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: modal.username,
    },
  });
  const [debouncedUsername] = useDebounce(form.getValues("username"), 300);

  useEffect(() => {
    const checkUsernameUnique = async () => {
      if (debouncedUsername) {
        setIsCheckingUsername(true);
        setUsernameMessage("");
        try {
          const response = await axios.get(
            `/api/check/username?username=${debouncedUsername}`
          );
          let msg = response.data.message;
          setUsernameMessage(msg);
        } catch (error) {
          const axiosError = error as AxiosError<ApiResponse>;
          setUsernameMessage(
            axiosError.response?.data.message ?? "Error checking username"
          );
        } finally {
          setIsCheckingUsername(false);
        }
      }
    };
    checkUsernameUnique();
  }, [debouncedUsername]);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);
    try {
      const response = await axios.post("/api/change/username", data);
      toast.success(response.data.message, {
        description: "Changes will reflect soon.",
      });
      await update({
        user: {
          username: data.username,
        },
      });
      modal.onClose();
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      if (axiosError.response?.status == 400) {
        form.setError("username", {
          message: "Usernam already exists.",
        });
      }
      toast.error("Error", {
        description:
          axiosError.response?.data.message || "Failed to change username",
      });
    } finally {
      setIsLoading(false); // Set loading state to false when API call ends
    }
  }

  return (
    <Dialog open={modal.isOpen} onOpenChange={() => modal.onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change your username</DialogTitle>
          <DialogDescription>
            This action will change your username&#46;
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-2/3 space-y-6"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="username"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        setUsername(e.target.value);
                        setUsernameMessage(""); // Clear message on input change
                      }}
                    />
                  </FormControl>
                  {isCheckingUsername && <Loader2 className="animate-spin" />}
                  <FormMessage>
                    <span
                      className={
                        usernameMessage === "Username is available"
                          ? "text-green-600"
                          : "text-red-600"
                      }
                    >
                      {usernameMessage}
                    </span>
                  </FormMessage>
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Change"
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
