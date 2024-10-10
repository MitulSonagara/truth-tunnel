"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
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
import LoaderOverlay from "@/components/Loader";

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
            `/api/check-username-unique?username=${debouncedUsername}`
          );
          let msg = response.data.message;
          setUsernameMessage(msg);
        } catch (error) {
          const axiosError = error as AxiosError<ApiResponse>;
          setUsernameMessage(
            axiosError.response?.data.message ?? "Error checking username"
          );
          form.setError("username", {
            message:
              axiosError.response?.data.message ?? "Error checking username",
          });
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
    <div className="flex justify-center items-center min-h-screen">
      {showLoaderOverlay && <LoaderOverlay />}
      <div className="w-full max-w-md p-8 space-y-8 shadow-md border rounded-3xl">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            Join <br />
            Truth-Tunnel
          </h1>
          <p className="mb-4">Sign up to start your anonymous adventure.</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              name="username"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      className="rounded-xl"
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
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      className="rounded-xl"
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
                  <FormLabel>Password</FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input
                        className="rounded-xl"
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
              className="w-full rounded-full bg-blue-600 text-white hover:bg-blue-500"
            >
              {isSubmitting ? <Loader2 className="animate-spin" /> : "Sign Up"}
            </Button>
            <p className="text-center text-sm">
              Already have an account?{" "}
              <Link href="/login" className="text-blue-600 hover:underline">
                Log in
              </Link>
            </p>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Page;
