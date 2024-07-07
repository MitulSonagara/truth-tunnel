import dbConnect from "@/lib/dbConnect";
import UserModel, { Message } from "@/model/User";

export async function POST(request: Request) {
    await dbConnect();
    const { username, content } = await request.json();

    try {
        const user = await UserModel.findOne({ username });
        
        if (!user) {
            return new Response(JSON.stringify({
                success: false,
                message: "User not found"
            }), { status: 404 });
        }

        // Check if the user is accepting messages
        if (!user.isAcceptingMessages) {
            return new Response(JSON.stringify({
                success: false,
                message: "User is not accepting messages"
            }), { status: 403 });
        }

        const newMessage = { content, createdAt: new Date() };
        user.messages.push(newMessage);
        await user.save();
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
