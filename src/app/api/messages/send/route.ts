import { encryptMessage } from "@/lib/crypto";
import db from "@/lib/db";


export async function POST(request: Request) {

    const { username, content } = await request.json();

    try {
        const user = await db.user.findUnique({ where: { username }, include: { encryptionKey: true } });

        if (!user) {
            return new Response(JSON.stringify({
                success: false,
                message: "User not found"
            }), { status: 404 });
        }

        // Check if the user is accepting messages
        if (!user.isAcceptingMessage) {
            return new Response(JSON.stringify({
                success: false,
                message: "User is not accepting messages"
            }), { status: 403 });
        }

        const newMessage = await db.message.create({
            data: {
                content: content,
                userId: user.id
            }
        })

        return new Response(JSON.stringify({
            success: true,
            message: "Message sent successfully"
        }), { status: 200 });

    } catch (error) {
        console.log("Error adding messages", error);

        return new Response(JSON.stringify({
            success: false,
            message: "Internal server error"
        }), { status: 500 });
    }
}
