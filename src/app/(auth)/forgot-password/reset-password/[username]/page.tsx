/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useEffect, useState, useCallback } from "react";
import { useDebounce } from "use-debounce";
import { useParams } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";
import { signUpSchema } from "@/schemas/signUpSchema";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { resetPasswordSchema } from "@/schemas/resetPasswordSchema";

const Page = () => {
  const router = useRouter();
  const [hidden, setHidden] = useState(true);
  const params = useParams<{ username: string }>();

  //zod implementation
  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof resetPasswordSchema>) => {
    console.log("hee");

    try {
      const response = await axios.post(`/api/forgot-password/newpassword`, {
        username: params.username,
        password: data.password,
      });
      toast.success("Success", { description: response.data.message });

      router.replace("/sign-in");
    } catch (error) {
      toast.error("password reset failed", {
        description: "error in resetting password",
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-md p-8 space-y-8 rounded-3xl shadow-md border">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            Enter <br />
            New Password
          </h1>
          <p className="mb-4">change your password.</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex justify-between">
                    <p>Password</p>
                  </FormLabel>
                  <div className="relative">
                    <div
                      className="absolute right-4 top-1/2 -translate-y-1/2 py-2"
                      onClick={() => setHidden(!hidden)}
                    >
                      {hidden ? <EyeOff /> : <Eye />}
                    </div>
                    <FormControl>
                      <Input
                        className="rounded-xl"
                        type={hidden ? "password" : "text"}
                        placeholder="Enter Password"
                        {...field}
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="confirmPassword"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex justify-between">
                    <p>Confirm Password</p>
                  </FormLabel>
                  <div className="relative">
                    <div
                      className="absolute right-4 top-1/2 -translate-y-1/2 py-2"
                      onClick={() => setHidden(!hidden)}
                    >
                      {hidden ? <EyeOff /> : <Eye />}
                    </div>
                    <FormControl>
                      <Input
                        className="rounded-xl"
                        type={hidden ? "password" : "text"}
                        placeholder="Enter Password"
                        {...field}
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="rounded-xl">
              Reset Password
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Page;
