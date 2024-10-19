"use client";
import React from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "./ThemeToggle";
import { useTheme } from "next-themes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import Image from "next/image";
import {
  useChangeEncryptionKeyModal,
  useUsernameModal,
} from "@/stores/modals-store";

const Navbar = () => {
  const { data: session, status } = useSession();
  const loading = status === "loading";
  const loggedIn = !!session;

  const usernameChangeModal = useUsernameModal();
  const changeEncryptionKeyModal = useChangeEncryptionKeyModal();

  const { resolvedTheme } = useTheme();
  const logoSrc =
    resolvedTheme === "dark" ? "/assets/logo1.png" : "/assets/logo.png";
  const profileIconSrc = "/assets/profile-icon.jpg"; // Replace with your profile icon source

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
          />{" "}
        </Link>
        <div className="flex items-center relative">
          {loading ? (
            <p className="text-xs text-gray-500">Loading...</p>
          ) : loggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Image
                  src={profileIconSrc}
                  alt="Profile"
                  width={40}
                  height={40}
                  className="cursor-pointer mr-2"
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <Link href="/dashboard" passHref>
                  <DropdownMenuItem>Dashboard</DropdownMenuItem>
                </Link>
                <Link href="/" passHref>
                  <DropdownMenuItem>Home</DropdownMenuItem>
                </Link>
                <DropdownMenuItem
                  onClick={() =>
                    usernameChangeModal.onOpen(session.user.username)
                  }
                >
                  Change Username
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => changeEncryptionKeyModal.onOpen()}
                >
                  Change Keys
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => signOut()}>
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/sign-in">
              <Button className="text-xs mr-2 px-3 py-1 rounded-md bg-red-600 hover:bg-red-700 text-white transition-all duration-200">
                Sign In
              </Button>
            </Link>
          )}
          <ModeToggle />
          {/* GitHub Icon */}
          <a
            href="https://github.com/MitulSonagara/truth-tunnel"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black dark:text-white transition-all duration-200 hover:text-gray-800"
          >
            <FontAwesomeIcon icon={faGithub} size="2x" />
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
