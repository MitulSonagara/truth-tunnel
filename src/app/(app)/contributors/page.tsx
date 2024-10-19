"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";

const ContributorsPage = () => {
  const [contributors, setContributors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContributors = async () => {
      try {
        const response = await fetch(
          "https://api.github.com/repos/MitulSonagara/truth-tunnel/contributors"
        );
        const data = await response.json();
        setContributors(data);
      } catch (error) {
        console.error("Error fetching contributors:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchContributors();
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-6">
          🤝 GitHub Contributors
        </h1>
        {loading ? (
          <div className="flex justify-center items-center">
            <Loader2 className="animate-spin" size={48} />
          </div>
        ) : (
          contributors.map((contributor) => (
            <a
              key={contributor.id}
              href={contributor.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="block" // To make the entire div clickable
            >
              <div className="flex items-center justify-between bg-gray-100 dark:bg-gray-700 border border-gray-300 rounded-xl p-4 mb-4 hover:bg-gray-300 dark:hover:bg-gray-600 transition duration-300 cursor-pointer">
                <div className="flex items-center">
                  <Image
                    src={contributor.avatar_url}
                    alt={`${contributor.login}'s avatar`}
                    width={50}
                    height={50}
                    className="rounded-full mr-4"
                  />
                  <span className="font-bold text-white hover:underline mr-4">
                    {contributor.login}
                  </span>
                </div>
                <span className="text-green-600 font-bold text-right">
                  {contributor.contributions} contributions
                </span>
              </div>
            </a>
          ))
        )}
      </div>
    </div>
  );
};

export default ContributorsPage;
