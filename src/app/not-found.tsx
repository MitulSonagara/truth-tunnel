'use client';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import LightLogo from '../app/images/logo2.png';
import DarkLogo from '../app/images/logo.png';
import { useTheme } from 'next-themes';

const NotFound = () => {
  const { theme, resolvedTheme } = useTheme(); // Use resolvedTheme to get current theme on initial load

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white dark:bg-[#0A0A0A] flex items-center justify-center px-4">
        <div className="max-w-4xl w-full flex flex-col md:flex-row items-center text-center md:text-left">
          {/* Left side image */}
          <div className="md:w-1/2 mb-8 md:mb-0 md:mr-8 transition-transform transform hover:scale-105 duration-300">
            <Image
              src={resolvedTheme === 'dark' ? LightLogo : DarkLogo}
              alt="Not Found Illustration"
              width={400}
              height={400}
              className="rounded-lg"
            />
          </div>

          {/* Right side content */}
          <div className="md:w-1/2">
            <h1 className="text-6xl font-bold text-red-500 mb-4">Oops!</h1>
            
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-300 mb-4">
              The page you&apos;re looking for doesn&apos;t exist.
            </h2>
            
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
              Looks like you&apos;ve wandered into unknown territory. Let&apos;s get you back to safety!
            </p>
            
            <div>
              <Link href="/">
                <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-300">
                  Go back to homepage
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
