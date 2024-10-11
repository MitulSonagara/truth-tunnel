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
import { useRouter } from "next/navigation";
import { signInSchema } from "@/schemas/signInSchema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react"; 
import { Loader2 } from "lucide-react"; // Import Loader component
import LoaderOverlay from "@/components/Loader";

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
        setLoading(true); // Set loading to true
        setShowLoaderOverlay(true);
        try{
            const result = await signIn('credentials', {
            redirect: false,
            identifier: data.identifier,
            password: data.password
        });

        setLoading(false); // Reset loading to false

        if (result?.url) {
            router.replace("/dashboard");
        }
        }catch(error){
            console.error("Error in signin of user", error);
            toast.error("Login Failed", { description: "Incorrect username or password" });
        }finally{
            setShowLoaderOverlay(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen">
            {showLoaderOverlay && <LoaderOverlay />}
            <div className="w-full max-w-md p-8 space-y-8 rounded-3xl shadow-md border">
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
                        Join <br /> Truth-Tunnel
                    </h1>
                    <p className="mb-4">
                        Sign In to start your anonymous adventure.
                    </p>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            name="identifier"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email/Username</FormLabel>
                                    <FormControl>
                                        <Input className="rounded-xl" placeholder="Enter Email/Username" {...field} />
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
                                    <FormLabel className="flex justify-between">
                                        <p>Password</p>
                                        <Link href="/forgot-password/email">Forgot Password?</Link>
                                        </FormLabel>
                                    <div className="relative">
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 py-2" onClick={() => setHidden(!hidden)}>
                                            {hidden ? <EyeOff /> : <Eye />}
                                        </div>
                                        <FormControl>
                                            <Input className="rounded-xl" type={hidden ? "password" : "text"} placeholder="Enter Password" {...field} />
                                        </FormControl>
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="rounded-3xl w-full" disabled={loading}>
                            {loading ? <Loader2 className="animate-spin" /> : "Sign In"} {/* Loading indicator */}
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
              type="button" // Prevent form submission
              onClick={() => {
                console.log("Google sign-in button clicked");
                signIn("google", { callbackUrl: "/dashboard" })
              }}
              className="flex items-center justify-center space-x-2 w-full mt-4 rounded-xl bg-red-500 hover:bg-red-600 text-white"
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
                <div className="text-center mt-4">
                    <p>
                        Don{"'"}t have an account?{' '}
                        <Link href="/sign-up" className="text-blue-600 hover:text-blue-800">Sign Up</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Page;
