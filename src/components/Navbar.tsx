"use client";
import React from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { User } from "next-auth";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const Navbar = () => {
  const { data: session, status } = useSession();
  const user: User | undefined = session?.user as User;

  // Determine if session is loading, logged in, or logged out
  const loading = status === "loading";
  const loggedIn = !!session;

  return (
    <>
      <nav>
        <div className="flex justify-between p-8 border items-center md:px-28">
          {loading ? (
            <h1 className="font-bold text-2xl">Loading...</h1>
          ) : loggedIn ? (
            <>
              <h1 className="font-bold text-2xl md:text-3xl">
                Welcome, {user?.username || user?.email}
              </h1>
              <Button
                onClick={() => signOut()}
                className="w-full md:w-auto rounded-xl"
              >
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <div className="flex items-center">
                <Image
                  src="/assets/logo R.png"
                  alt="Truth Tunnel Logo"
                  width={180}
                  height={180}
                  className="mr-2"
                />
              </div>
              <Link href="/sign-in">
                <Button className="w-full md:w-auto rounded-xl">Sign In</Button>
              </Link>
            </>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
