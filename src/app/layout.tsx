import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/context/AuthProvider";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/context/ThemeProvider";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/options";

import Sidebar from "@/components/Footer"; // Import Sidebar


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Truth-Tunnel",
  description:
    "Welcome to the Truth-Tunnel Web Application! This platform allows users to send and receive messages securely while maintaining anonymity. The application features a robust login system with OTP (One-Time Password) verification to ensure the safety and privacy of user identities.",
  icons: {
    icon: "/assets/logo2.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <AuthProvider session={session}>
          <body className={inter.className}>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem={true}
            >
               {/* Include Sidebar here */}
              {children}
              <Toaster richColors expand={true} />

              <UsernameChangeForm />
              {/* <Sidebar /> */}

            </ThemeProvider>
          </body>
        </AuthProvider>
      </html>
    </>
  );
}
