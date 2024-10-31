"use client";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useSearchSheet } from "@/stores/sheets-store";
import { User } from "@prisma/client";
import axios from "axios";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import { suggestedUsers } from "@/lib/queries";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";

export default function SearchUserSheet() {
  const state = useSearchSheet();
  const [query, setQuery] = useState<string>("");
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [debounced] = useDebounce(query, 300);

  const { data: suggestions, isLoading: suggestionsLoading } = useQuery({
    queryKey: ["suggested-users"],
    queryFn: suggestedUsers,
    retry: false,
  });

  const handleSearch = async (q: string) => {
    setError("");
    setUsers([]);
    setLoading(true);
    try {
      const res = await axios.get(`/api/search?q=${q}`);
      if (res.status !== 200) throw new Error(res.data.error);
      setUsers(res.data.users);
    } catch (e: any) {
      console.error("Error fetching user:", e);
      setError(e.response?.data?.error || "Something went wrong while fetching users.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (debounced) {
      handleSearch(debounced);
    }
  }, [debounced]);

  return (
    <Sheet open={state.isOpen} onOpenChange={state.onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Find Users</SheetTitle>
        </SheetHeader>
        <div className="py-4">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <label htmlFor="user-search" className="sr-only">Search users</label>
            <Input
              id="user-search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              type="search"
              placeholder="Search users..."
              className="pl-8"
            />
          </div>

          <ScrollArea className="h-[calc(100vh-8rem)] py-2">
            {query === "" ? (
              <div>
                <h2 className="text-sm font-semibold text-foreground mb-2">
                  Suggested Users
                </h2>
                {suggestionsLoading ? (
                  <p>Loading suggestions...</p>
                ) : (
                  <div className="space-y-4">
                    {suggestions?.map((user) => (
                      <UserItem key={user.id} user={user} />
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div>
                <h2 className="text-sm font-semibold text-foreground mb-2">
                  Search Results
                </h2>
                {loading ? (
                  <p>Loading...</p>
                ) : users.length > 0 ? (
                  <div className="space-y-4">
                    {users.map((user) => (
                      <UserItem key={user.id} user={user} />
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No users found</p>
                )}
              </div>
            )}
          </ScrollArea>
          {error && <div className="text-red-500 mt-2">{error}</div>}
        </div>
      </SheetContent>
    </Sheet>
  );
}

function UserItem({ user }: { user: User }) {
  const state = useSearchSheet();
  return (
    <Link href={`/u/${user.username}`} onClick={state.onClose}>
      <div className="flex items-center justify-between w-full py-2 hover:bg-secondary/90 rounded-md transition-colors">
        <div className="flex items-center space-x-3">
          <Avatar>
            <AvatarImage src={user.image ?? ""} alt={user.username} />
            <AvatarFallback>{user.username.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <p className="text-sm text-muted-foreground">@{user.username}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
