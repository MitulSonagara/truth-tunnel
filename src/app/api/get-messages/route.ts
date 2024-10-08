
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import { User } from "next-auth";
import db from "@/lib/db";

export async function GET(request: Request) {

    const session = await getServerSession(authOptions);
    const user: User = session?.user;

    if (!session || !user) {
        return new Response(JSON.stringify({
            success: false,
            message: "Not authenticated"
        }), { status: 401 });
    }

    try {

        const result = await db.message.findMany({
            where: {
                userId: user.id
            }
        })

        if (!result || result.length === 0) {
            return new Response(JSON.stringify({
                success: false,
                message: "Messages not found"
            }), { status: 404 });
        }

        return new Response(JSON.stringify({
            success: true,
            messages: result
        }), { status: 200 });

    } catch (error) {
        console.error("Unexpected error occurred:", error);
        return new Response(JSON.stringify({
            success: false,
            message: "Unexpected error occurred"
        }), { status: 500 });
    }
}
