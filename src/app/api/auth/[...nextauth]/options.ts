import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import db from "@/lib/db";

// Check for Google OAuth credentials
if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
    throw new Error("Google OAuth credentials are missing in environment variables");
}

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(db),
    providers: [
        // Credentials Provider
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                try {
                    const user = await db.user.findFirst({
                        where: {
                            OR: [
                                { email: credentials.email },
                                { username: credentials.email },
                            ],
                        },
                    });

                    if (!user) {
                        throw new Error("No user found with this email");
                    }

                    if (!user.isVerified) {
                        throw new Error("Please verify your account before login");
                    }

                    const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);
                    if (isPasswordCorrect) {
                        return user;
                    } else {
                        throw new Error("Incorrect password");
                    }
                } catch (err) {
                    throw new Error(err);
                }
            },
        }),
        // Google Provider
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            async profile(profile) {
                // Check for profile information
                if (!profile || !profile.email) {
                    throw new Error("Profile is null or does not contain email.");
                }

                // Find or create user in the database
                let user = await db.user.findUnique({
                    where: {
                        email: profile.email,
                    },
                });

                // If user doesn't exist, create it
                if (!user) {
                    user = await db.user.create({
                        data: {
                            email: profile.email,
                            username: profile.email, // Default username to email
                            isVerified: true, // assuming that email is already verified by Google provider
                            isAcceptingMessage: true,
                            messages: {
                                create: [], // Create an empty array if you have a one-to-many relationship
                            },
                        },
                    });
                }

                // Return the user object
                return {
                    id: user.id,
                    name: profile.name,
                    email: profile.email,
                    image: profile.picture,
                };
            },
        }),
    ],
    pages: {
       signIn: "/sign-in"
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
              token.id = user.id?.toString()
              token.isVerified = user.isVerified
              token.isAcceptingMessage = user.isAcceptingMessage
              token.username = user.username
              
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
              session.user.id = token.id
              session.user.isVerified = token.isVerified
              session.user.isAcceptingMessage = token.isAcceptingMessage
              session.user.username = token.username
               
            }
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
};
