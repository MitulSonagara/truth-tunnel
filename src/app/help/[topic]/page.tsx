// /app/help-center/[topic]/page.tsx
"use client";
import React from "react";
import { useParams } from "next/navigation";

const topicDetails = {
  "getting-started": {
    title: "Getting Started",
    description: "A guide to setting up and using Truth-Tunnel.",
    content: "Here is some detailed content about how to get started with Truth-Tunnel. This will include steps for setup, initial configurations, and best practices.",
  },
  "account-security": {
    title: "Account Security",
    description: "Tips on keeping your account secure.",
    content: "Learn about different ways to secure your account, including two-factor authentication, password best practices, and recovery options.",
  },
  "troubleshooting-otp": {
    title: "Troubleshooting OTP Issues",
    description: "Resolve common issues with OTP login.",
    content: "This section covers frequent OTP issues, such as delays, not receiving the code, or entering the wrong code.",
  },
  "encryption-overview": {
    title: "Encryption Overview",
    description: "Learn about our end-to-end encryption technology.",
    content: "Understand how Truth-Tunnel secures your data with state-of-the-art encryption, ensuring privacy and security.",
  },
  "mobile-access": {
    title: "Access on Mobile",
    description: "Instructions for using Truth-Tunnel on mobile.",
    content: "Steps for installing the mobile app, signing in, and using key features of Truth-Tunnel on your mobile device.",
  },
  "manage-notifications": {
    title: "Manage Notifications",
    description: "Customize and manage your notification settings.",
    content: "Learn how to customize notification preferences for different events, including messages, alerts, and updates.",
  },
};

export default function TopicPage() {
  const { topic } = useParams();

  const topicInfo = topicDetails[topic as keyof typeof topicDetails] || {
    title: "Topic Not Found",
    description: "The topic you selected does not exist.",
    content: "We couldn't find any details for the topic you selected. Please go back and try another topic.",
  };

  return (
    <div className="flex items-center flex-col border rounded-xl justify-center p-10 w-[500px] m-auto bg-white dark:bg-gray-700 mt-20">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4">{topicInfo.title}</h2>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">{topicInfo.description}</p>
      <p className="text-base text-gray-600 dark:text-gray-400">{topicInfo.content}</p>
    </div>
  );
}
