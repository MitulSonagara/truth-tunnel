"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "./ThemeToggle";
import { useTheme } from "next-themes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

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

  const [isOpen, setIsOpen] = useState(false); // State to manage hamburger menu

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

        {/* Hamburger icon for mobile view */}
        <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
          <span className="block w-6 h-0.5 bg-black dark:bg-white mb-1"></span>
          <span className="block w-6 h-0.5 bg-black dark:bg-white mb-1"></span>
          <span className="block w-6 h-0.5 bg-black dark:bg-white"></span>
        </button>

        {/* Desktop Links (hidden in mobile view) */}
        <div className={`hidden md:flex items-center relative`}>
          <Link
            href="/dashboard"
            className="mr-4 border border-transparent hover:border-white px-2 py-1 transition-colors duration-200"
          >
            Dashboard
          </Link>
          <Link
            href="/"
            className="mr-4 border border-transparent hover:border-white px-2 py-1 transition-colors duration-200"
          >
            Home
          </Link>
          <Link
            href="/contactus"
            className="mr-4 border border-transparent hover:border-white px-2 py-1 transition-colors duration-200"
          >
            Contact Us
          </Link>
          <Link
            href="/about"
            className="mr-4 border border-transparent hover:border-white px-2 py-1 transition-colors duration-200"
          >
            About
          </Link>
          <Link
            href="/contributors"
            className="mr-4 border border-transparent hover:border-white px-2 py-1 transition-colors duration-200"
          >
            Contributors
          </Link>

          {loading ? (
            <p className="text-xs text-gray-500">Loading...</p>
          ) : loggedIn ? (
            <div className="relative">
              <Image
                src={profileIconSrc}
                alt="Profile"
                width={40}
                height={40}
                className="cursor-pointer mr-2"
              />
              <div className="absolute right-0 bg-white dark:bg-gray-800 shadow-lg rounded-md">
                <button
                  className="block px-4 py-2 text-left text-gray-700 dark:text-white"
                  onClick={() =>
                    usernameChangeModal.onOpen(session.user.username)
                  }
                >
                  Change Username
                </button>
                <button
                  className="block px-4 py-2 text-left text-gray-700 dark:text-white"
                  onClick={() => changeEncryptionKeyModal.onOpen()}
                >
                  Change Keys
                </button>
                <button
                  className="block px-4 py-2 text-left text-gray-700 dark:text-white"
                  onClick={() => signOut()}
                >
                  Sign Out
                </button>
              </div>
            </div>
          ) : (
            <Link href="/sign-in">
              <Button className="text-xs mr-6 px-3 py-1 rounded-md bg-red-600 hover:bg-red-700 text-white transition-all duration-200">
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

      {/* Mobile Links */}
      {isOpen && (
        <div className="md:hidden flex flex-col bg-gray-100 dark:bg-gray-800 border-t">
          <Link
            href="/dashboard"
            className="px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700"
            onClick={() => setIsOpen(false)}
          >
            Dashboard
          </Link>
          <Link
            href="/"
            className="px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/contactus"
            className="px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700"
            onClick={() => setIsOpen(false)}
          >
            Contact Us
          </Link>
          <Link
            href="/about"
            className="px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700"
            onClick={() => setIsOpen(false)}
          >
            About
          </Link>
          <Link
            href="/contributors"
            className="px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700"
            onClick={() => setIsOpen(false)}
          >
            Contributors
          </Link>
          <ModeToggle /> {/* Mode toggle remains visible */}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
