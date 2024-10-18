
import { getServerSession } from "next-auth";
import { User } from "next-auth";
import db from "@/lib/db";
import { authOptions } from "../../auth/[...nextauth]/options";

export async function POST(request: Request) {


    const session = await getServerSession(authOptions)

    const user: User = session?.user

    if (!session || !session.user) {
        return Response.json({
            success: false,
            message: "Not authenticated"
        }, { status: 401 })
    }

    const userId = user.id;
    const { acceptMessages } = await request.json()

    try {


        const updatedUser = await db.user.update({
            where: { id: userId },
            data: {
                isAcceptingMessage: acceptMessages,
            }
        })

        if (!updatedUser) {
            return Response.json({
                success: false,
                message: "Failed to update user status to accept messages"
            }, { status: 401 })
        }

        return Response.json({
            success: true,
            message: "Message acceptance status updated successfully",
            updatedUser
        }, { status: 200 })

    } catch (error) {
        console.log("Failed to update user status to accept messages")
        return Response.json({
            success: false,
            message: "Failed to update user status to accept messages"
        }, { status: 500 })
    }

}

export async function GET(request: Request) {

    const session = await getServerSession(authOptions)

    const user: User = session?.user

    if (!session || !session.user) {
        return Response.json({
            success: false,
            message: "Not authenticated"
        }, { status: 401 })
    }

    const userId = user.id;
    try {
        const foundUser = await db.user.findUnique({ where: { id: userId } })

        if (!foundUser) {
            return Response.json({
                success: false,
                message: "User not found"
            }, { status: 404 })
        }

        return Response.json({
            success: true,
            isAcceptingMessages: foundUser.isAcceptingMessage
        }, { status: 200 })
    } catch (error) {
        // console.log("Error in getting message acceptance status, ",error)
        return Response.json({
            success: false,
            message: "Error in getting message acceptance status"
        }, { status: 500 })
    }
}