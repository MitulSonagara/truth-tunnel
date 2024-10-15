"use client";
import React from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { User } from "next-auth";
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
    <>
      <nav>
        <div className="flex bg-gray-200 dark:bg-transparent 
        shadow-xl justify-between p-8 border items-center md:px-28">
          <div className="flex items-center">
            <Link href="/">
              <Image
                src={logoSrc}
                alt="Truth Tunnel Logo"
                width={180}
                height={180}
                className="mr-2"
              />
            </Link>
          </div>
          <div className="flex items-center space-x-2">
            {loading ? (
              <>
                <p>loading</p>
              </>
            ) : loggedIn ? (
              <>
                <Button
                  onClick={() => signOut()}
                  className="w-full md:w-auto rounded-xl"
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Link href="/sign-in">
                  <Button className="w-full md:w-auto rounded-xl">
                    Sign In
                  </Button>
                </Link>
              </>
            )}
            <ModeToggle />
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
