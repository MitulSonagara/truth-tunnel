import Navbar from "@/components/Navbar";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight, Eye, Shield, Zap } from "lucide-react";
import Link from "next/link";
import { getServerSession } from "next-auth";
import ScrollToTopButton from "@/components/ScrollToTopButton"; // Import the new component
import ScrollProgressBar from "@/components/ScrollProgressBar"; // Import the progress bar
import Image from "next/image";

const Page = async () => {
  const session = await getServerSession();
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 dark:bg-black text-gray-900 dark:text-white transition-colors duration-300 border-2 border-black">
        <ScrollProgressBar /> {/* Add the scroll progress bar here */}
        {/* Hero Section */}
        <section className="mt-10 relative z-10 py-24 px-4 sm:px-6 lg:px-8 text-left overflow-hidden">
  {/* Checkered background */}
  <div className="absolute inset-0 opacity-10">
    <div className="absolute inset-0 grid grid-cols-12 gap-2">
      {[...Array(144)].map((_, i) => (
        <div key={i} className="w-full h-full bg-red-600"></div>
      ))}
    </div>
  </div>

  {/* Content */}
  <div className="relative z-20">
    <h1 className="mt-10 text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-red-800">
      Secure Communication in a Dangerous World
    </h1>
    <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl">
      Experience unbreakable encryption and total anonymity. Truth Tunnel: Where
      your secrets remain hidden.
    </p>
  </div>

  <div className="relative z-20 flex flex-col lg:flex-row justify-between items-center w-full lg:w-10/12 mt-10">
    <div className="w-full lg:w-6/12">
      <p className="text-3xl text-[#A34343] dark:text-gray-300 mb-7 font-bold">
        Welcome to Truth Tunnel!
      </p>
      <p className="text-lg text-[#df6b59] dark:text-gray-300 font-semibold mb-10 leading-relaxed">
        Experience unparalleled privacy and security in your communications.
        Join a community where anonymity is prioritized, and your identity
        remains hidden. Start your journey to secure conversations today!
      </p>

      <Link href={session ? "/dashboard" : "/sign-in"}>
        <Button className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-full text-lg">
          Enter the Shadows <ChevronRight className="ml-2" />
        </Button>
      </Link>
    </div>

    <div className="w-full lg:w-5/12 lg:ml-auto mt-8 lg:mt-0">
      <div className="rounded-lg overflow-hidden shadow-lg shadow-red-400 opacity-50">
        <Image src="/assets/secret.webp" width={500} height={400} alt="Secret Image" />
      </div>
    </div>
  </div>
</section>

        {/* Advanced Covert Features Section */}
        <section className="relative z-10 py-24 px-4 sm:px-6 lg:px-8 bg-gray-100 dark:bg-black">
          <h2 className="text-4xl font-bold mb-16 text-center bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-red-800">
            Advanced Covert Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Feature Cards */}
            <Card className="bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-red-800 hover:border-red-500 dark:hover:border-red-500 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
              <CardContent className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <Shield className="h-16 w-16 text-red-500" />
                  <span className="bg-red-100 text-red-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">
                    Top Secret
                  </span>
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-red-600 dark:text-red-400">
                  Impenetrable Security
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Military-grade encryption protects your messages from prying
                  eyes.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-red-800 hover:border-red-500 dark:hover:border-red-500 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
              <CardContent className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <Zap className="h-16 w-16 text-red-500" />
                  <span className="bg-red-100 text-red-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">
                    Quantum Speed
                  </span>
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-red-600 dark:text-red-400">
                  Instant Transmission
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Messages delivered at the speed of light, leaving no trace
                  behind.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-red-800 hover:border-red-500 dark:hover:border-red-500 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
              <CardContent className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <Eye className="h-16 w-16 text-red-500" />
                  <span className="bg-red-100 text-red-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">
                    Ghost Protocol
                  </span>
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-red-600 dark:text-red-400">
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
        <section
          className="relative z-10 py-24 px-4 sm:px-6 lg:px-8 text-center text-white"
          style={{
            background:
              "linear-gradient(to top, rgba(0, 0, 0, 1), rgba(255, 0, 0, 0.1))",
          }}
        >
          <h2 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-red-800">
            Ready to Disappear?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
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
        {/* Footer */}

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


        {/* Scroll to Top Button */}
        <ScrollToTopButton />
      </div>
    </>
  );
};

export default Page;
c