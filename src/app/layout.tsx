import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/context/AuthProvider";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/context/ThemeProvider";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/options";
import Modals from "@/context/ModalProvider";
import QueryProvider from "@/context/QueryProvider";
import NextTopLoader from "nextjs-toploader";
import Script from "next/script";

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
        <QueryProvider>
          <AuthProvider session={session}>
            <body className={inter.className}>
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem={true}
              >
                <NextTopLoader
                  color="#991b1b"
                  showSpinner
                  template='<div class="bar" role="bar"><div class="peg"></div></div>
                <div class="spinner" role="spinner"><div class="spinner-icon fixed bottom-0 right-0 m-2"></div></div>'
                />
                {children}
                <Toaster richColors expand={true} />
                <Modals />
                <Script
                  id="chatbase-config"
                  strategy="beforeInteractive" // Load config before interaction
                  dangerouslySetInnerHTML={{
                    __html: `
                      window.embeddedChatbotConfig = {
                        chatbotId: "R-6622MFJRjEGXxJTsXD4",
                        domain: "www.chatbase.co"
                      };
                    `,
                  }}
                />
                <Script
                  id="chatbase-script"
                  src="https://www.chatbase.co/embed.min.js"
                  chatbotId="R-6622MFJRjEGXxJTsXD4"
                  domain="www.chatbase.co"
                  defer
                />
              </ThemeProvider>
            </body>
          </AuthProvider>
        </QueryProvider>
      </html>
    </>
  );
}
