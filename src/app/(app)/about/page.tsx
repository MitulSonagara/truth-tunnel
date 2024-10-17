"use client";

import React, { useEffect, useState } from "react";
import {
  Loader2,
  ShieldCheck,
  Lock,
  Mail,
  User,
  Smartphone,
  Code,
  Database,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Link from "next/link";

const AboutPage = () => {
  const [loading, setLoading] = useState(true);
  const [aboutInfo, setAboutInfo] = useState<any[]>([]);

  useEffect(() => {
    // Simulate fetching data, you can replace this with a real API call
    setTimeout(() => {
      setAboutInfo([
        {
          icon: <User />,
          title: "Anonymous Identity",
          description:
            "Users can communicate without revealing their identity, ensuring privacy and security.",
        },
        {
          icon: <Mail />,
          title: "OTP Secure Login",
          description:
            "Authenticate users via OTP sent to email to verify identity.",
        },
        {
          icon: <Lock />,
          title: "Encrypted Messaging",
          description:
            "All messages are end-to-end encrypted to ensure your conversations stay private.",
        },
        {
          icon: <Smartphone />,
          title: "Cross-Platform",
          description:
            "Access the application on both web and mobile devices, making communication easy and accessible.",
        },
        {
          icon: <ShieldCheck />,
          title: "User-Friendly Interface",
          description:
            "A clean and intuitive design that offers an easy and enjoyable user experience.",
        },
        {
          icon: <Shield />,
          title: "Enhanced Security",
          description:
            "We prioritize security with features like OTP, encryption, and secure authentication.",
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="container mx-auto py-16 px-4">
        <h1 className="text-5xl font-bold text-center text-red-500 mb-16">
          About Truth-Tunnel
        </h1>
        {loading ? (
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-2 mb-24">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="flex flex-col items-start bg-gray-800 border border-gray-700 rounded-lg p-6 animate-pulse"
              >
                <div className="h-8 w-8 bg-gray-700 rounded-full mb-4"></div>
                <div className="h-6 w-1/2 bg-gray-700 rounded mb-2"></div>
                <div className="h-4 w-full bg-gray-700 rounded"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-2 mb-24">
            {aboutInfo.map((info, index) => (
              <div
                key={index}
                className="flex flex-col items-start bg-gray-900 border border-gray-700 rounded-lg p-6 hover:bg-gray-800 hover:shadow-lg transition duration-300 cursor-pointer"
              >
                <div className="mb-4 text-red-500">{info.icon}</div>
                <h3 className="text-2xl font-semibold mb-2 text-white">
                  {info.title}
                </h3>
                <p className="text-gray-400">{info.description}</p>
              </div>
            ))}
          </div>
        )}
        <div className="text-center mb-24">
          <h2 className="text-4xl font-bold text-red-500 mb-12">
            Technologies Used
          </h2>
          <div className="flex flex-wrap justify-center gap-10">
            <TechnologyCard
              icon={<Code />}
              title="Frontend"
              description="Next.js, TailwindCSS, Shadcn"
            />
            <TechnologyCard
              icon={<Database />}
              title="Backend"
              description="Node.js, Express.js"
            />
            <TechnologyCard
              icon={<Database />}
              title="Database"
              description="MongoDB"
            />
            <TechnologyCard
              icon={<ShieldCheck />}
              title="Security"
              description="next-auth for authentication, bcrypt for password hashing"
            />
          </div>
        </div>
        <div className="text-center mb-24">
          <p className="text-lg mb-6">
            Contributions are welcome! Join us to make Truth-Tunnel even better.
          </p>
          <Link
            href="/contributors"
            className="text-red-400 hover:text-red-600 text-lg"
          >
            Meet Our Contributors
          </Link>
        </div>
        <div className="text-center">
        </div>
      </div>
    </div>
  );
};

const TechnologyCard = ({ icon, title, description }) => {
  return (
    <div className="w-64 bg-gray-900 border border-gray-700 rounded-lg p-6 hover:bg-gray-800 hover:shadow-lg transition duration-300">
      <div className="mb-4 text-red-500 flex justify-center">{icon}</div>
      <h3 className="text-2xl font-semibold mb-2 text-center text-white">
        {title}
      </h3>
      <p className="text-gray-400 text-center">{description}</p>
    </div>
  );
};

export default AboutPage;
