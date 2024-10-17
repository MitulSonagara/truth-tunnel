"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ModeToggle } from "./ThemeToggle";
import { useTheme } from "next-themes";

const Navbar = () => {
  const { data: session, status } = useSession();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null); // Create a ref for the dropdown

  // Determine if session is loading, logged in, or logged out
  const loading = status === "loading";
  const loggedIn = !!session;

  const { resolvedTheme } = useTheme();
  const logoSrc = resolvedTheme === "dark" ? "/assets/logo1.png" : "/assets/logo.png";
  const profileIconSrc = "/assets/profile-icon.jpg"; // Replace with your profile icon source

  const toggleDropdown = () => setDropdownOpen(prev => !prev);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
        <div className="flex items-center relative">
          {loading ? (
            <p className="text-xs text-gray-500">Loading...</p>
          ) : loggedIn ? (
            <>
              <Image
                src={profileIconSrc}
                alt="Profile"
                width={40}
                height={40}
                className="cursor-pointer mr-2"
                onClick={toggleDropdown}
              />
              {dropdownOpen && (
                <div ref={dropdownRef} className="absolute right-0 mt-40 mr-12 w-40 bg-white shadow-lg rounded-md z-10">
                  <Link href="/dashboard">
                    <span className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Dashboard
                    </span>
                  </Link>
                  <Link href="/">
                    <span className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Home
                    </span>
                  </Link>
                  <Button
                    onClick={() => signOut()}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-red-100"
                  >
                    Sign Out
                  </Button>
                </div>
              )}
            </>
          ) : (
            <Link href="/sign-in">
              <Button className="text-xs mr-2 px-3 py-1 rounded-md bg-red-600 hover:bg-red-700 text-white transition-all duration-200">
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
