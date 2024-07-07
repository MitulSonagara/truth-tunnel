"use client";
import { Message } from "@/model/User";
import { acceptMessageSchema } from "@/schemas/acceptMessageSchema";
import { ApiResponse } from "@/types/ApiResponse";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { useToast } from "@/components/ui/use-toast";

import { useSession } from "next-auth/react";
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { User } from "next-auth";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import Navbar from "@/components/Navbar";
import { Separator } from "@/components/ui/separator";
import { Loader2, RefreshCcw } from "lucide-react";
import { Input } from "@/components/ui/input";

const Page = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [isSwitchLoading, setIsSwitchLoading] = useState<boolean>(false);
    const [baseUrl, setBaseUrl] = useState("");
    const { toast } = useToast()


    const handleDeleteMessages = async (messageId: string) => {
        setMessages(messages.filter((message) => message._id !== messageId));
        try {
            const res = await axios.delete(`/api/delete-message/${messageId}`);
            toast({
                title: "Success",
                description: "Message deleted Successfully"
            })
        } catch (error) {
            console.error(error);
            setMessages(prevMessages => [...prevMessages, ...messages.filter(m => m._id === messageId)]);
        }
    };

    const { data: session } = useSession();
    const form = useForm({
        resolver: zodResolver(acceptMessageSchema),
    });

    const { register, watch, setValue } = form;

    const acceptMessages = watch("accept-messages");

    const fetchAcceptMessages = useCallback(async () => {
        setIsSwitchLoading(true)
        try {
            const response = await axios.get<ApiResponse>(`/api/accept-messages`)
            setValue('accept-messages', response.data.isAcceptingMessages)
            console.log("adaf",acceptMessages);
            
        } catch (error) {
            const axiosError = error as AxiosError<ApiResponse>;
            toast({
                title: "Error",
                description: "Failed to fetch message settings" || axiosError.response?.data.message,
                variant: "destructive"
            })
        } finally {
            setIsSwitchLoading(false)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setValue, toast, watch])

    const fetchMessages = useCallback(async (refresh: boolean = false) => {
        setLoading(true)
        setIsSwitchLoading(false)
        try {
            const response = await axios.get<ApiResponse>(`/api/get-messages`)
            setMessages(response.data.messages || [])
            if (refresh) {
                toast({
                    title: "Refreshed Messages",
                    description: "Showing latest messages"
                })
            }
        } catch (error) {
            const axiosError = error as AxiosError<ApiResponse>;
            toast({
                title: "Error",
                description: "Failed to fetch message settings",
                variant: "destructive"
            })
        } finally {
            setIsSwitchLoading(false)
            setLoading(false)
        }
    }, [setIsSwitchLoading, setMessages, toast])

    useEffect(() => {
        if (!session || !session.user) return;
        setBaseUrl(`${window.location.protocol}//${window.location.host}`);
        fetchAcceptMessages();
        fetchMessages();
    }, [session,setValue, fetchAcceptMessages, fetchMessages]);

    const handleSwitchChange = async () => {
        try {
            const response = await axios.post("/api/accept-messages", {
                acceptMessages: !acceptMessages,
            });
            setValue("accept-messages", !acceptMessages);
            toast({
                title: response.data.message,
                variant: "default"
            })
        } catch (error) {
            const axiosError = error as AxiosError<ApiResponse>;
            toast({
                title: "Error",
                description: axiosError.response?.data.message||"Failed to fetch message settings",
                variant: "destructive"
            })
        }
    };

    const username = session?.user as User;
    const profileUrl = `${baseUrl}/u/${username?.username}`;
    const copyToClipboard = () => {
        navigator.clipboard.writeText(profileUrl);
        toast({
            title: "URL copied",
            description: "Profile url has been copied to clipboard"
        })
    };

    if (!session || !session.user) {
        return <>
            <Navbar />
            <div className="flex justify-center mt-5">
                Please Login
            </div>
        </>;
    }
    return (
        <>
        <Navbar />
        <div className="my-8 mx-4 md:mx-8 lg:mx-auto p-6 bg-white rounded w-full max-w-6xl">
            <h1 className="text-4xl font-bold mb-4">
                User Dashboard
            </h1>
            <div className="mb-4">
                <div className="mt-2 border p-2 bg-gray-100 rounded-sm flex items-center gap-3">
                <Input type="text" value={profileUrl} disabled className="input input-bordered w-full p-2 mr-2" />
                    <Button onClick={copyToClipboard}>Copy</Button>
                </div>
            </div>

            <div className="mb-4">
                <Switch
                    {...register('acceptMessages')}
                    checked={acceptMessages}
                    onCheckedChange={handleSwitchChange}
                    disabled={isSwitchLoading}
                />
                <span className="ml-2">
                    Accept Messages: {acceptMessages ? 'On' : 'Off'}
                </span>
            </div>
            <Separator />
            <Button
                className="mt-4"
                variant="outline"
                onClick={(e) => {
                    e.preventDefault();
                    fetchMessages(true);
                }}
            >
                {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                    <RefreshCcw className="h-4 w-4" />
                )}
            </Button>
            <div className="mt-5 flex flex-wrap">
                {
                    messages.length > 0 ? (
                        messages.map(({ content, _id, createdAt }, index) => (
                            <div key={index} className="shadow-md border rounded-md p-2 w-fit m-2 flex gap-2 md:gap-20">
                                <div className="flex flex-col gap-2">
                                    <p className="font-bold  md:text-2xl">{content}</p>
                                    <p>{createdAt.toString()}</p>
                                </div>
                                <div>
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button variant="destructive">X</Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    This action cannot be undone &#46; This will permanently delete your
                                                    message and remove your data from our servers &#46;
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                <AlertDialogAction className="bg-red-500" onClick={() => handleDeleteMessages(_id as string)}>Continue</AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No messages</p>
                    )
                }
            </div>
            </div>
        </>
    );
};

export default Page;