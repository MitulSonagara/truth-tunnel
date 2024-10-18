/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "nextjs-toploader/app";
import { signInSchema } from "@/schemas/signInSchema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { Loader2 } from "lucide-react"; // Import Loader component
import LoaderOverlay from "@/components/Loader";
import Navbar from "@/components/Navbar";

const Page = () => {
  const router = useRouter();
  const [hidden, setHidden] = useState(true);
  const [showLoaderOverlay, setShowLoaderOverlay] = useState(false);
  const [loading, setLoading] = useState(false); // State for loading

  // zod implementation
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    setLoading(true);
    setShowLoaderOverlay(true);
    try {
      const result = await signIn("credentials", {
        redirect: false,
        identifier: data.identifier,
        password: data.password,
      });

      setLoading(false);

      if (result?.ok && result.url) {
        toast.success("Login Successful", {
          description: "Redirecting to dashboard...",
        });
        router.replace("/dashboard");
      } else {
        toast.error("Login Failed", {
          description: "Incorrect username or password",
        });
      }
    } catch (error) {
      console.error("Error in signin of user", error);
      toast.error("Login Failed", {
        description: "Something went wrong. Please try again.",
      });
    } finally {
      setShowLoaderOverlay(false);
    }
  };

  return (
    <div className=" min-h-screen overflow-x-hidden">
      <div className="max-h-screen-lg mx-auto">
        <Navbar />
      </div>
      <div className="flex  justify-center items-center h-full mt-8 ">
        {showLoaderOverlay && <LoaderOverlay />}
        {/* Outer container */}
        <div
          className="w-full bg-gray-200
         dark:bg-transparent max-w-md border-gray-200
                 transition-colors duration-300 p-8 space-y-8 rounded-xl shadow-md border"
        >
          <div className="text-center">
            <h1 className="text-xl font-bold text-red-500 tracking-tight lg:text-5xl mb-2">
              Truth-Tunnel
            </h1>
            <p className="mb-1">Sign In to start your anonymous adventure.</p>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                name="identifier"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="rounded-xl dark:border-gray-300
                                            focus:ring focus:ring-blue-500"
                        placeholder="Email / Username"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="password"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <div className="relative">
                      <div
                        className="absolute right-4 top-1/2 -translate-y-1/2 py-2"
                        onClick={() => setHidden(!hidden)}
                      >
                        {hidden ? <EyeOff /> : <Eye />}
                      </div>
                      <FormControl>
                        <Input
                          className="rounded-xl dark:border-gray-300 "
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
              <Button
                type="submit"
                className="rounded-xl bg-gray-700 w-full hover:bg-gray-900 dark:hover:bg-gray-500 hover:shadow-xl"
                disabled={loading}
              >
                {loading ? <Loader2 className="animate-spin" /> : "Sign In"}
              </Button>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 text-white"></span>
                </div>
              </div>

              {/* Google Auth Button */}
              <Button
                type="button"
                onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
                className="flex items-center justify-center space-x-2 w-full mt-4 rounded-xl dark:bg-gray-700 hover:bg-red-400 dark:hover:bg-gray-500 text-white"
              >
                <Image
                  src="/google.svg"
                  alt="google logomark"
                  width={25}
                  height={25}
                />
                <span>Continue with Google</span>
              </Button>
            </form>
          </Form>

          {/* Sign Up and Forgot Password */}
          <div className="flex justify-between items-center mt-2">
            <div className="text-sm">
              Don{"'"}t have an account?{" "}
              <Link
                href="/sign-up"
                className="text-blue-600 hover:text-blue-800"
              >
                Sign Up
              </Link>
            </div>
            <div className="text-red-500 text-sm">
              <Link href="/forgot-password/email">Forgot Password?</Link>
            </div>
          </div>

          {/* Back to Home Button */}
          <div className="text-center mt-4">
            <Button
              onClick={() => router.push("/")}
              className="w-full rounded-xl dark:bg-gray-700 dark:hover:bg-gray-500 hover:bg-red-400 text-white"
            >
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
