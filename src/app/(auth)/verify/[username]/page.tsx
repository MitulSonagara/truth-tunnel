"use client";

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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { toast } from "sonner";
import { verifySchema } from "@/schemas/verifySchema";
import { ApiResponse } from "@/types/ApiResponse";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { useParams } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import LoaderOverlay from "@/components/Loader";

const VerifyAccount = () => {
  const [showLoaderOverlay, setShowLoaderOverlay] = useState(false);
  const router = useRouter();

  const params = useParams<{ username: string }>();

  const form = useForm<z.infer<typeof verifySchema>>({
    resolver: zodResolver(verifySchema),
  });

  const onSubmit = async (data: z.infer<typeof verifySchema>) => {
    try {
      setShowLoaderOverlay(true);
      const response = await axios.post(`/api/verify-code`, {
        username: params.username,
        code: data.code,
      });
      toast.success("Success", { description: response.data.message });
      router.replace("/sign-in");
    } catch (error) {
      console.error("Error in signup of user", error);
      const axiosError = error as AxiosError<ApiResponse>;
      let errorMessage = axiosError.response?.data.message;
      toast.error("Sign-up failed", { description: errorMessage });
    } finally {
      setShowLoaderOverlay(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      {showLoaderOverlay && <LoaderOverlay />}
      <div className="w-full max-w-md p-8 space-y-8 rounded-lg shadow-md border">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            Verify Your Account
          </h1>
          <p className="mb-4">Enter the verification code sent to your email</p>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-2/3 space-y-6"
            style={{
              width: "24rem",
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <FormField
              name="code"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex flex-col items-center">
                  {" "}
                  {/* Add the desired classes here */}
                  <FormLabel>Verification Code</FormLabel>
                  <FormControl>
                    <InputOTP maxLength={6} {...field}>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormDescription>
                    Please enter the Verification code sent to your email.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="rounded-2xl">
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default VerifyAccount;
