// src/app/(app)/form/page.tsx
"use client"; // This line makes the component a Client Component

import React, { useState } from "react";
import Navbar from "@/components/Navbar"; // Optional: Reuse Navbar
import ScrollToTopButton from "@/components/ScrollToTopButton"; // Optional: ScrollToTop Button

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
    <div className="min-h-screen bg-gray-100 dark:bg-black text-gray-900 dark:text-white transition-colors duration-300">
      <Navbar /> {/* Optional: Navbar */}
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white dark:bg-gray-800 rounded shadow-lg p-6 max-w-md w-full">
          <h1 className="text-2xl font-bold mb-6 text-center">Contact Us</h1>

          {submitted && (
            <p className="text-green-500 mb-4">
              Thank you for your submission!
            </p>
          )}
          {error && <p className="text-red-500 mb-4">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-red-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-red-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" htmlFor="phone">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-red-500"
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium mb-2"
                htmlFor="category"
              >
                Category
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-red-500"
              >
                <option value="General Inquiry">General Inquiry</option>
                <option value="Feedback">Feedback</option>
                <option value="Support">Support</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label
                className="block text-sm font-medium mb-2"
                htmlFor="message"
              >
                Message
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-red-500"
                rows="4"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-500 transition duration-200"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
      <ScrollToTopButton /> {/* Optional */}
    </div>
  );
};

export default EnhancedFormPage;
