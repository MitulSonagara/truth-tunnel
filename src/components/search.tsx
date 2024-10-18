"use client";

import { useState } from "react";
import { Search, Loader2 } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";

interface User {
    username: string;
}

export default function SearchUser() {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState("");
    const [sendingMessage, setSendingMessage] = useState(false); // State for sending message loading

    const handleSearch = async () => {
        setLoading(true);
        setError(""); 
        setUser(null); 
        try {
            const res = await axios.get(`/api/search/${username}`);
            if (res.data.user) {
                setUser(res.data.user);
            } else {
                setError("User not found");
            }
        } catch (e) {
            console.error("Error fetching user:", e);
            setError("Something went wrong while fetching the user");
        } finally {
            setLoading(false);
        }
    };

    const handleSendMessage = async () => {
        setSendingMessage(true);
    
        try {
            
            router.push(`/u/${user?.username}`);
        } catch (e) {
            console.error("Error sending message:", e);
        } finally {
            setSendingMessage(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center w-full mt-8">
        <div className=" relative w-full max-w-6xl mb-4">
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter Username"
                className="border rounded-md p-2 pr-12 w-full text-black dark:text-white  focus:ring-blue-400
                 transition duration-200"
            />
            <button
                onClick={handleSearch}
                disabled={loading || username.trim() === ""}
                className="absolute right-2 top-1/2 transform -translate-y-1/2  p-2 rounded-md 
                text-black dark:text-white transition duration-200  disabled:cursor-not-allowed"
            >
                {loading ? (
                    <Loader2 className="animate-spin" />
                ) : (
                    <Search />
                )}
            </button>
        </div>

            {loading && (
                <div className="flex items-center space-x-2">
                    <Loader2 className="animate-spin text-blue-600" />
                    <span>Searching for user...</span>
                </div>
            )}

            
            {error && !loading && (
                <div className="text-red-500 mt-2">{error}</div>
            )}

            
            {user && !loading && (
                <div className=" mt-2 md-6 bg-white dark:bg-transparent dark:border p-4 rounded-md shadow-xl w-full max-w-6xl">
                    <h3 className="text-md font-semibold">User Found:</h3>
                    <div className="flex justify-between">

                    <p className="text-gray-900 dark:text-white font-bold text-xl"> {user.username}</p>
                    <button
                        onClick={handleSendMessage}
                        disabled={sendingMessage}
                        className=" bg-red-600 text-white p-2 rounded-lg transition duration-200 hover:bg-red-500  disabled:cursor-not-allowed"
                    >
                        {sendingMessage ? (
                            <>
                                <Loader2 className="animate-spin mr-2" />
                              
                            </>
                        ) : (
                            "Send Message"
                        )}
                    </button>
                    </div>
                </div>
            )}
        </div>
    );
}
