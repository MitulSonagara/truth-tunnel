"use client"
import React, { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import Image from "next/image";

const faqData = [
  {
    question: "What is Truth-Tunnel, and how does it work?",
    answer:
      "Truth-Tunnel is an anonymous messaging platform that allows users to send and receive messages securely. With end-to-end encryption and anonymous identity protection, users can communicate without revealing personal details. OTP verification adds an extra layer of security during login.",
  },
  {
    question: "How does Truth-Tunnel protect my identity?",
    answer:
      "Truth-Tunnel ensures anonymity by not storing identifiable data. Users are assigned unique IDs, and all communications are encrypted. This way, no personal information is exposed during messaging.",
  },
  {
    question: "What security measures does Truth-Tunnel use?",
    answer:
      "Truth-Tunnel employs multiple security layers including OTP verification, end-to-end encryption, and bcrypt for password hashing. We prioritize user privacy with these advanced security technologies to ensure safe communication.",
  },
  {
    question: "Is Truth-Tunnel available on mobile devices?",
    answer:
      "Yes! Truth-Tunnel is designed to be cross-platform, making it accessible on both web and mobile devices. This allows users to securely communicate anytime, anywhere.",
  },
  {
    question: "Can I contribute to Truth-Tunnel’s development?",
    answer:
      "Absolutely! We welcome contributions from the community. If you’re interested in helping us improve Truth-Tunnel, please check out our repository for details on how to contribute.",
  },
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <>
    <Navbar/>
    <div className="py-10 px-4 sm:px-6 lg:px-8 dark:bg-black min-h-screen">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-red-800">
          Frequently Asked Questions
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          Find answers to common questions about Truth-Tunnel&apos;s features and security.
        </p>
      </div>

      <div className="space-y-6 max-w-4xl mx-auto">
        {faqData.map((faq, index) => (
          <div
            key={index}
            onClick={() => toggleFAQ(index)}
            className="cursor-pointer bg-white dark:bg-gray-900 border p-6 rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 transform hover:scale-105"
          >
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-md text-gray-700 dark:text-white">
                {faq.question}
              </h3>
              <span>
                {activeIndex === index ? (
                  <IoIosArrowUp className="text-2xl text-red-600" />
                ) : (
                  <IoIosArrowDown className="text-2xl text-red-600" />
                )}
              </span>
            </div>
            {activeIndex === index && (
              <p className="mt-4 text-gray-600 dark:text-gray-400">
                {faq.answer}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>

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
    </>
  );
};

export default FAQ;
