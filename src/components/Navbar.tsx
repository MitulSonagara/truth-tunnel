"use client";
import React from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ModeToggle } from "./ThemeToggle";
import { useTheme } from "next-themes";

const Navbar = () => {
  const { data: session, status } = useSession();

  // Determine if session is loading, logged in, or logged out
  const loading = status === "loading";
  const loggedIn = !!session;

  const { resolvedTheme } = useTheme();
  const logoSrc =
    resolvedTheme === "dark" ? "/assets/logo1.png" : "/assets/logo.png";

  return (
    <nav className="bg-gray-100 dark:bg-transparent shadow-md border-b">
      <div className="flex justify-between items-center p-3 md:px-16">
        <Link href="/">
          <Image
            src={logoSrc}
            alt="Truth Tunnel Logo"
            width={120}
            height={120}
            className="mr-2 cursor-pointer"
          />
        </Link>
        <div className="flex items-center space-x-3">
          {loading ? (
            <p className="text-xs text-gray-500">Loading...</p>
          ) : loggedIn ? (
            <>
              <Link href="/dashboard">
                <Button className="text-xs px-3 py-1 rounded-md bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200">
                  Dashboard
                </Button>
              </Link>
              <Button
                onClick={() => signOut()}
                className="text-xs px-3 py-1 rounded-md bg-red-600 hover:bg-red-700 text-white transition-all duration-200"
              >
                Sign Out
              </Button>
            </>
          ) : (
            <Link href="/sign-in">
              <Button className="text-xs px-3 py-1 rounded-md bg-red-600 hover:bg-red-700 text-white transition-all duration-200">
                Sign In
              </Button>
            </Link>
          )}
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;