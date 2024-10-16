import 'next-auth'

declare module "next-auth" {
    interface User {
        id?: string;
        isVerified?: boolean;
        isAcceptingMessage?: boolean;
        username?: string;
        hasEncryptionKey?: boolean;
    }
    interface Session {
        user: {
            id?: string;
            isVerified?: boolean;
            isAcceptingMessage?: boolean;
            username?: string;
            hasEncryptionKey?: boolean;
        } & DefaultSession["user"]
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id?: string;
        isVerified?: boolean;
        isAcceptingMessage?: boolean;
        username?: string;
        hasEncryptionKey?: boolean;
    }
}