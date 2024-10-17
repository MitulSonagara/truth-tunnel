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
        <div className="flex items-center space-x-6">
          {loading ? (
            <p className="text-xs text-gray-500">Loading...</p>
          ) : loggedIn ? (
            <>
              <Link href="/about">
                <span className="text-xs text-white transition-all duration-200 flex items-center">
                  About
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="white"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-4 h-4 ml-1"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 1.5c5.799 0 10.5 4.701 10.5 10.5S17.799 22.5 12 22.5 1.5 17.799 1.5 12 6.201 1.5 12 1.5zm3 8.25h-1.5v-1.5c0-.621-.504-1.125-1.125-1.125S11.25 7.629 11.25 8.25v1.5H9.75c-.621 0-1.125.504-1.125 1.125s.504 1.125 1.125 1.125h1.5v1.5c0 .621.504 1.125 1.125 1.125s1.125-.504 1.125-1.125v-1.5H15c.621 0 1.125-.504 1.125-1.125S15.621 9.75 15 9.75z"
                    />
                  </svg>
                </span>
              </Link>
              <Link href="/dashboard">
                <span className="text-xs ${darkMode ? 'text-white' : 'text-black'}`} transition-all duration-200">
                  Dashboard
                </span>
              </Link>
              <Link href="/">
                <span className="text-xs ${darkMode ? 'text-white' : 'text-black'}`} transition-all duration-200">
                  Home
                </span>
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
