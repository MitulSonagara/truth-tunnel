// src/app/(app)/form/page.tsx
"use client"; // This line makes the component a Client Component
import { FaUser, FaEnvelope, FaPhoneAlt, FaRegCommentDots } from "react-icons/fa";
import { BiSolidCategoryAlt } from "react-icons/bi";

import React, { useState } from "react";
import Navbar from "@/components/Navbar"; // Optional: Reuse Navbar
import ScrollToTopButton from "@/components/ScrollToTopButton"; // Optional: ScrollToTop Button
import Image from "next/image";

const EnhancedFormPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [category, setCategory] = useState("General Inquiry");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !phone || !message) {
      setError("Please fill in all fields.");
      return;
    }

    console.log("Form submitted:", { name, email, phone, category, message }); // Replace with your submission logic
    setSubmitted(true);
    setName("");
    setEmail("");
    setPhone("");
    setCategory("General Inquiry");
    setMessage("");
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white transition-colors duration-300 flex items-center justify-center px-6 md:px-0 ">
        <div className="flex items-center justify-between md:w-4/12 w-full py-6 md:h-[90vh] bg-red-100 dark:bg-black  rounded-lg gap-8 shadow-lg shadow-red-700 dark:border-red-200 dark:border-2  dark:shadow-red-200 overflow-hidden">
          
          {/* Form Container */}
          <div className=" h-full md:px-16 px-6 w-full flex flex-col justify-center ">
            <h1 className="md:text-3xl text-xl font-bold mb-6 text-center text-red-700 dark:text-red-500 underline underline-offset-4">
              Contact Us
            </h1>

            {submitted && <p className="text-green-500 mb-4">Thank you for your submission!</p>}
            {error && <p className="text-red-500 mb-4">{error}</p>}

            <form onSubmit={handleSubmit} className="space-y-6 text-[#091057]">
              {/* Name */}
              <div className="relative">
                <label className="flex items-center md:text-sm text-xs mb-1 ml-2 font-semibold text-red-700 dark:text-white" htmlFor="name">
                  <FaUser className="mr-2" /> Name
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full py-2 pl-4 border border-gray-300 text-sm rounded-full dark:text-white focus:outline-none focus:ring focus:ring-red-500"
                />
              </div>

              {/* Email */}
              <div className="relative">
                <label className="flex items-center md:text-sm text-xs  mb-1 ml-2 font-semibold text-red-700 dark:text-white" htmlFor="email">
                  <FaEnvelope className="mr-2" /> Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full py-2 text-sm pl-4 border border-gray-300 dark:text-white rounded-full focus:outline-none focus:ring focus:ring-red-500"
                />
              </div>

              {/* Phone */}
              <div className="relative">
                <label className="flex items-center md:text-sm text-xs  mb-1 ml-2 font-semibold text-red-700 dark:text-white" htmlFor="phone">
                  <FaPhoneAlt className="mr-2" /> Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  placeholder="Enter your phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  pattern="[0-9]{10}" maxlength="10" oninput="this.value = this.value.replace(/[^0-9]/g, '');"
                  className="w-full py-2 pl-4 text-sm border border-gray-300 dark:text-white rounded-full focus:outline-none focus:ring focus:ring-red-500"
                />
              </div>

              {/* Category */}
              <div className="relative">
                <label className="flex items-center md:text-sm text-xs  mb-1 ml-2  font-semibold text-red-700 dark:text-white" htmlFor="category">
                  <BiSolidCategoryAlt className="mr-2"/>Category
                </label>
                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full p-2  text-sm dark:text-white border border-gray-300  rounded-full focus:outline-none focus:ring focus:ring-red-500"
                  style={{ backgroundPositionX: "95%" }} // Shifts the arrow to the left
                >
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Feedback">Feedback</option>
                  <option value="Support">Support</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Message */}
              <div className="relative">
                <label className="flex items-center md:text-sm text-xs  mb-1 ml-2 font-semibold text-red-700 dark:text-white" htmlFor="message">
                  <FaRegCommentDots className="mr-2" /> Message
                </label>
                <textarea
                  id="message"
                  placeholder="Enter your message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  className="w-full py-2 pl-4 text-sm border border-gray-300 rounded-full dark:text-whitefocus:outline-none focus:ring focus:ring-red-500"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-red-600 md:text-sm text-xs  font-semibold text-white py-2 rounded-full hover:bg-red-500 transition duration-200"
              >
                Submit
              </button>
            </form>
          </div>

          {/* Image Section */}
          {/* <div className="h-[90vh] flex items-end w-[40vw]">
            <Image
              src="/assets/contact.webp"
              width={500}
              height={400}
              alt="Contact"
              className="h-[70vh]"
            />
          </div> */}
        </div>

        <ScrollToTopButton />
      </div>
    </>
  );
};

export default EnhancedFormPage;
