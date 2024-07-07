import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import { User } from "next-auth";

export async function DELETE(request: Request, { params }: { params: { messageId: string } }) {
    const messageId = params.messageId
    await dbConnect()

    const session = await getServerSession(authOptions)

    const user: User = session?.user

    if (!session || !session.user) {
        return Response.json({
            success: false,
            message: "Not authenticated"
        }, { status: 401 })
    }

    try {
        const updateResult = await UserModel.updateOne(
            { _id: user._id },
            { $pull: { messages: { _id: messageId } } }
        )
        if (updateResult.modifiedCount == 0) {
            console.log("message not found or already deleted");
            
            return Response.json({
                success: false,
                message: "Message not found or already deleted"
            }, { status: 404 })
        } else {
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