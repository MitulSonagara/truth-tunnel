// /app/help-center/page.tsx
"use client";
import React from "react";
import Link from "next/link";

const popularTopics = [
  { id: "getting-started", title: "Getting Started", icon: "🚀", description: "A guide to setting up and using Truth-Tunnel." },
  { id: "account-security", title: "Account Security", icon: "🔒", description: "Tips on keeping your account secure." },
  { id: "troubleshooting-otp", title: "Troubleshooting OTP Issues", icon: "⚙️", description: "Resolve common issues with OTP login." },
  { id: "encryption-overview", title: "Encryption Overview", icon: "🔐", description: "Learn about our end-to-end encryption technology." },
  { id: "mobile-access", title: "Access on Mobile", icon: "📱", description: "Instructions for using Truth-Tunnel on mobile." },
  { id: "manage-notifications", title: "Manage Notifications", icon: "🔔", description: "Customize and manage your notification settings." },
];

export default function HelpCenterPage() {
  return (
    <div className="mx-20">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 text-center mb-10">How can we help you?</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {popularTopics.map((topic) => (
          <Link
            href={`/help/${topic.id}`}
            key={topic.id}
            className="h-[220px] bg-white dark:bg-gray-700 shadow-md rounded-lg p-6 border border-gray-200 dark:border-gray-600 hover:shadow-lg transition-shadow cursor-pointer"
          >
            <div className="text-4xl text-center mb-4">{topic.icon}</div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 text-center">{topic.title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 text-center mt-2">{topic.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
