"use client";
import React from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ModeToggle } from "./ThemeToggle";
import { useTheme } from "next-themes";
import { UserCircle, LogOut, LogIn } from "lucide-react";

const Navbar = () => {
  const { data: session, status } = useSession();

  // Determine if session is loading, logged in, or logged out
  const loading = status === "loading";
  const loggedIn = !!session;

  const { resolvedTheme } = useTheme();
  const logoSrc =
    resolvedTheme === "dark" ? "/assets/logo1.png" : "/assets/logo.png";

  return (
    <>
      <nav>
        <div className="flex bg-black dark:bg-black shadow-xl justify-between p-6 border-b-2 border-red-500 items-center md:px-28">
          {/* Logo Section */}
          <div className="flex items-center">
            <Link href="/">
              <Image
                src={logoSrc}
                alt="Truth Tunnel Logo"
                width={150}
                height={150}
                className="mr-4 cursor-pointer"
              />
            </Link>
          </div>

          {/* Navigation Links and Actions */}
          <div className="flex items-center space-x-6">
            {/* Contributors Link */}
            <Link
              href="/contributors"
              className="flex items-center text-lg font-medium text-white hover:text-red-500 transition-colors duration-300"
            >
              <UserCircle className="w-5 h-5 mr-1" />
              Contributors
            </Link>

            {/* Auth Buttons */}
            {loading ? (
              <p className="text-white">Loading...</p>
            ) : loggedIn ? (
              <Button
                onClick={() => signOut()}
                className="flex items-center space-x-2 w-full md:w-auto rounded-xl bg-red-600 hover:bg-red-700 text-white"
              >
                <LogOut className="w-5 h-5 mr-1" />
                <span>Sign Out</span>
              </Button>
            ) : (
              <Link href="/sign-in">
                <Button className="flex items-center space-x-2 w-full md:w-auto rounded-xl bg-red-600 hover:bg-red-700 text-white">
                  <LogIn className="w-5 h-5 mr-1" />
                  <span>Sign In</span>
                </Button>
              </Link>
            )}

            {/* Theme Toggle */}
            <ModeToggle />
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
