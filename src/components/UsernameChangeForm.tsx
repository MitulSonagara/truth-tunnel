"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { ApiResponse } from "@/types/ApiResponse";
import { useUsernameModal } from "@/stores/username-form-store";
import { useSession } from "next-auth/react";
const FormSchema = z.object({
  username: z
    .string()
    .min(2, "Username must be atleast 2 characters")
    .max(20, "Username must be no more than 20 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Username must not contain special characters")
    .regex(/^[a-z0-9_]+$/, "Username must not contain capital letters"),
});

export function UsernameChangeForm() {
  const modal = useUsernameModal();
  const { update } = useSession();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: modal.username,
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const response = await axios.post("/api/change-username", data);
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
                    <Input placeholder="username" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public username.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Change</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
