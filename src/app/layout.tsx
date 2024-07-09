import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/context/AuthProvider";
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Secter Messages",
    description: "Welcome to the Secret Messages Web Application! This platform allows users to send and receive messages securely while maintaining anonymity. The application features a robust login system with OTP (One-Time Password) verification to ensure the safety and privacy of user identities.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <html lang="en">
                <AuthProvider>
                    <body className={inter.className}>
                        {/* <Navbar/> */}
                        {children}
                        <Toaster richColors expand={true} />
                    </body>
                </AuthProvider>
            </html>
        </>
    );
}