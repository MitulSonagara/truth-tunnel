
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import { User } from "next-auth";
import db from "@/lib/db";

export async function DELETE(request: Request) {

    const session = await getServerSession(authOptions)

    const user: User = session?.user

    if (!session || !session.user) {
        return Response.json({
            success: false,
            message: "Not authenticated"
        }, { status: 401 })
    }

    try {

        await db.message.deleteMany({
            where: {
                userId: user.id
            },

        })


        return Response.json({
            success: true,
            message: "Messages deleted"
        }, { status: 200 })

    } catch (error) {
        console.log("Errors in deleting route")
        return Response.json({
            success: false,
            message: "Error deleting message"
        }, { status: 500 })
    }
}