import Navbar from "@/components/Navbar";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight, Eye, Shield, Zap } from "lucide-react";
import Link from "next/link";
import { getServerSession } from "next-auth";
import Image from "next/image";

// Correct social media icon paths
const fbIcon = "/assets/fb.png"; // Facebook icon
const twitterIcon = "/assets/tw.png"; // Twitter icon
const instagramIcon = "/assets/insta.png"; // Instagram icon
const linkedinIcon = "/assets/link.png"; // LinkedIn icon

const Page = async () => {
  const session = await getServerSession();
  return (
    <>
      <div className="min-h-screen bg-gray-100 dark:bg-black text-gray-900 dark:text-white transition-colors duration-300">
        <Navbar />

        {/* Hero Section */}
        <section className="relative z-10 py-24 px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-red-800">
            Secure Communication in a Dangerous World
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Experience unbreakable encryption and total anonymity. Truth Tunnel: Where your secrets remain hidden.
          </p>

          <Link href={session ? "/dashboard" : "/sign-in"}>
            <Button className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-full text-lg">
              Enter the Shadows <ChevronRight className="ml-2" />
            </Button>
          </Link>
        </section>

        <section className="relative z-10 py-24 px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-red-800">
            Advanced Covert Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Feature Cards */}
            {/* Cards remain unchanged */}
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative z-10 py-24 px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-red-800">
            Ready to Disappear?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Join the elite network of shadow communicators. Sign up for priority access now.
          </p>
          <Link href={session ? "/dashboard" : "/sign-in"}>
            <Button className="bg-red-600 hover:bg-red-700 text-white font-bold">
              Infiltrate
            </Button>
          </Link>
        </section>

        {/* Footer */}
        <footer className="relative z-10 border-t border-gray-200 dark:border-gray-800 py-8 text-gray-600 dark:text-gray-400">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
    <p className="text-center sm:text-left">
      &copy; 2024 Truth Tunnel. All rights reserved. Secured by quantum encryption.
    </p>
    <div className="flex space-x-6">
      {/* Social Media Icons */}
      <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
        <Image
          src={fbIcon}
          alt="Facebook"
          width={24}
          height={24}
        />
      </a>
      <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
        <Image
          src={twitterIcon}
          alt="Twitter"
          width={22}
          height={22}
        />
      </a>
      <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
        <Image
          src={instagramIcon}
          alt="Instagram"
          width={24}
          height={24}
        />
      </a>
      <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
        <Image
          src={linkedinIcon}
          alt="LinkedIn"
          width={24}
          height={24}
        />
      </a>
    </div>
  </div>
</footer>

      </div>
    </>
  );
};

export default Page;
