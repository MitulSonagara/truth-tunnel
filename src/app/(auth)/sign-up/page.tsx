"use client";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { toast } from "sonner";
import { useRouter } from "nextjs-toploader/app";
import { signUpSchema } from "@/schemas/signUpSchema";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import LoaderOverlay from "@/components/Loader";
import { signIn } from "next-auth/react";
import Navbar from "@/components/Navbar";

const Page = () => {
  const [username, setUsername] = useState("");
  const [usernameMessage, setUsernameMessage] = useState("");
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showLoaderOverlay, setShowLoaderOverlay] = useState(false);
  const [debouncedUsername] = useDebounce(username, 300);
  const router = useRouter();

  // Zod implementation
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const [hidden, setHidden] = useState(true);

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

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    setIsSubmitting(true); // Start showing the button loader
    setShowLoaderOverlay(true); // Show the overlay loader
    try {
      const response = await axios.post<ApiResponse>("/api/sign-up", data);
      toast.success("Success", { description: response.data.message });

      setTimeout(() => {
        setShowLoaderOverlay(false);
        router.replace(`/verify/${data.username}`);
      }, 2000); // 2 seconds delay
    } catch (error) {
      console.error("Error in signup of user", error);
      const axiosError = error as AxiosError<ApiResponse>;
      let errorMessage =
        axiosError.response?.data.message || "An error occurred"; // Fallback error message
      toast.error("Sign-up failed", { description: errorMessage });
    } finally {
      setShowLoaderOverlay(false);
      setIsSubmitting(false); // Stop showing the button loader
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navbar />
      <div className="flex justify-center mt-8 items-center h-full">
        {showLoaderOverlay && <LoaderOverlay />}
        <div
          className="w-full max-w-md border-gray-200 shadow-lg bg-gray-200
         dark:bg-transparent transition-colors duration-300 p-8 space-y-8 rounded-xl border"
        >
          <div className="text-center">
            <h1 className="text-xl font-bold text-red-500 tracking-tight lg:text-5xl mb-2">
              Truth-Tunnel
            </h1>
            <p className="mb-2">Sign In to start your anonymous adventure.</p>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                name="username"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="rounded-xl dark:border-gray-300"
                        placeholder="Enter Username"
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
              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="rounded-xl dark:border-gray-300 "
                        placeholder="Enter Email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.email?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                name="password"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <div className="relative">
                      <FormControl>
                        <Input
                          className="rounded-xl dark:border-gray-300"
                          type={hidden ? "password" : "text"}
                          placeholder="Enter Password"
                          {...field}
                        />
                      </FormControl>
                      <div
                        className="absolute right-4 top-1/2 -translate-y-1/2 py-2 cursor-pointer"
                        onClick={() => setHidden(!hidden)}
                      >
                        {hidden ? <EyeOff /> : <Eye />}
                      </div>
                    </div>
                    <FormMessage>
                      {form.formState.errors.password?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                disabled={isSubmitting}
                className="rounded-xl bg-gray-700 w-full hover:bg-gray-900 dark:hover:bg-gray-500 hover:shadow-xl"
              >
                {isSubmitting ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "Sign Up"
                )}
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
                onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
                className="flex items-center justify-center space-x-2 w-full mt-4 rounded-xl
                dark:bg-gray-700 hover:bg-red-400 dark:hover:bg-gray-500 text-white"
              >
                <Image
                  src="/google.svg"
                  alt="google logomark"
                  width={25}
                  height={25}
                />
                <span>Continue with Google</span>
              </Button>
              <p className="text-center text-sm">
                Already have an account?{" "}
                <Link href="/sign-in" className="text-blue-600 hover:underline">
                  Log in
                </Link>
              </p>
            </form>
          </Form>
          {/* Back to Home Button */}
          <div className="text-center">
            <Link href="/">
              <Button
                className="w-full rounded-xl dark:bg-gray-700 dark:hover:bg-gray-500
               hover:bg-red-400 text-white"
              >
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
