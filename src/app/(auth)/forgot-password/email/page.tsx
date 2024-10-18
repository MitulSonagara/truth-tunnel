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
import { signInSchema } from "@/schemas/signInSchema";
import { emailSchema } from "@/schemas/emailSchema";

const Page = () => {
  const router = useRouter();
  const [hidden, setHidden] = useState(true);

  //zod implementation
  const form = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof emailSchema>) => {
    try {
      const response = await axios.post(`/api/forgot-password/sendotp`, {
        email: data.email,
      });
      console.log(response);
      toast.success("Success", { description: response.data.message });
      router.replace(`/forgot-password/otp-verify/${response.data.username}`);
    } catch (error) {
      console.error("Error in signup of user", error);
      const axiosError = error as AxiosError<ApiResponse>;
      let errorMessage = axiosError.response?.data.message;
      toast.error("Sign-up failed", { description: errorMessage });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-md p-8 space-y-8 rounded-3xl shadow-md border">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            Reset Password
          </h1>
          <p className="mb-4">Enter your email</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="">
                    <p>Email</p>
                  </FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input
                        className="rounded-xl"
                        type="email"
                        placeholder="Enter Email"
                        {...field}
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="rounded-xl">
              Send OTP
            </Button>
          </form>
        </Form>
        <div className="text-center mt-4">
          <p>
            Remembered Password?
            <Link
              href="/sign-in"
              className="text-blue-600 hover:text-blue-800 ml-2"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;
