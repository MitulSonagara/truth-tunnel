// /app/help-center/layout.tsx
"use client";
import React from "react";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import Image from "next/image";

export default function HelpCenterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
        <main className="flex-1 p-6 bg-gray-100 dark:bg-black">
          {children}
        </main>
        <footer className="relative z-10 border-t border-gray-200 dark:border-gray-800 py-8 text-gray-600 dark:text-gray-400 mr-16">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center">
    <div className="text-left mb-4 sm:mb-0">
      <p>&copy; 2024 Truth Tunnel. All rights reserved. Secured by quantum encryption.</p>
      <p className="mt-2">
        <Link href="/terms" className="text-red-600 hover:text-red-800">Terms of Use</Link>
      </p>
    </div>

    <div className="flex flex-wrap justify-center sm:justify-end space-x-4">
      <Link href="https://facebook.com" target="_blank">
        <Image
          src="/assets/fb.png" // Update with your image path
          alt="Facebook"
          width={32} // Set appropriate width
          height={32} // Set appropriate height
          className="hover:opacity-75 transition-opacity" // Optional: hover effect
        />
      </Link>
      <Link href="https://youtube.com" target="_blank">
        <Image 
          src="/assets/youtube.png" // Update with your image path
          alt="Youtube"
          width={32}
          height={32}
          className="hover:opacity-75 transition-opacity"
        />
      </Link>
      <Link href="https://instagram.com" target="_blank">
        <Image 
          src="/assets/insta.png" // Update with your image path
          alt="Instagram"
          width={32}
          height={32}
          className="hover:opacity-75 transition-opacity"
        />
      </Link>
      <Link href="https://linkedin.com" target="_blank">
        <Image 
          src="/assets/linkedin.png" // Update with your image path
          alt="LinkedIn"
          width={32}
          height={32}
          className="hover:opacity-75 transition-opacity"
        />
      </Link>
    </div>
  </div>
</footer>

    </div>
  );
}
