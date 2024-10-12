import Navbar from "@/components/Navbar";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight, Eye, Shield, Zap } from "lucide-react";
import Link from "next/link";
import { getServerSession } from "next-auth";
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
            Experience unbreakable encryption and total anonymity. Truth Tunnel:
            Where your secrets remain hidden.
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
            <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-red-800 hover:border-red-500 dark:hover:border-red-500 transition-colors duration-300">
              <CardContent className="p-6">
                <Shield className="h-12 w-12 mb-4 text-red-500" />
                <h3 className="text-xl font-semibold mb-2 text-red-600 dark:text-red-400">
                  Impenetrable Security
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Military-grade encryption protects your messages from prying
                  eyes.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-red-800 hover:border-red-500 dark:hover:border-red-500 transition-colors duration-300">
              <CardContent className="p-6">
                <Zap className="h-12 w-12 mb-4 text-red-500" />
                <h3 className="text-xl font-semibold mb-2 text-red-600 dark:text-red-400">
                  Instant Transmission
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Messages delivered at the speed of light, leaving no trace
                  behind.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-red-800 hover:border-red-500 dark:hover:border-red-500 transition-colors duration-300">
              <CardContent className="p-6">
                <Eye className="h-12 w-12 mb-4 text-red-500" />
                <h3 className="text-xl font-semibold mb-2 text-red-600 dark:text-red-400">
                  Invisible Presence
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Advanced cloaking ensures your digital footprint remains
                  undetectable.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
        {/* CTA Section */}
        <section className="relative z-10 py-24 px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-red-800">
            Ready to Disappear?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Join the elite network of shadow communicators. Sign up for priority
            access now.
          </p>
          <Link href={session ? "/dashboard" : "/sign-in"}>
            <Button className="bg-red-600 hover:bg-red-700 text-white font-bold">
              Infiltrate
            </Button>
          </Link>
        </section>

        {/* Footer */}
        <footer className="relative z-10 border-t border-gray-200 dark:border-gray-800 py-8 text-center text-gray-600 dark:text-gray-400">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p>
              &copy; 2024 Truth Tunnel. All rights reserved. Secured by quantum
              encryption.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Page;
