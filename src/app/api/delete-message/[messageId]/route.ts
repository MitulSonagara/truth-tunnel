
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import { User } from "next-auth";
import db from "@/lib/db";

export async function DELETE(request: Request, { params }: { params: { messageId: string } }) {
    const messageId = params.messageId

    const session = await getServerSession(authOptions)

    const user: User = session?.user

    if (!session || !session.user) {
        return Response.json({
            success: false,
            message: "Not authenticated"
        }, { status: 401 })
    }

    try {

        const updateResult = await db.message.findUnique({
            where: {
                id: messageId
            },

        })

        if (!updateResult) {

            return Response.json({
                success: false,
                message: "Message not found or already deleted"
            }, { status: 404 })
        } else {
            await db.message.delete({
                where: {
                    id: messageId
                },

            });
            return Response.json({
                success: true,
                message: "Message deleted"
            }, { status: 200 })
        }
    } catch (error) {
        console.log("Errors in deleting route")
        return Response.json({
            success: false,
            message: "Error deleting message"
        }, { status: 500 })
    }
}