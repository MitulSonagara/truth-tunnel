import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import { User } from "next-auth";
import mongoose from "mongoose";

export async function GET(request: Request) {
    await dbConnect();

    const session = await getServerSession(authOptions);
    const user: User = session?.user;

    if (!session || !user) {
        return new Response(JSON.stringify({
            success: false,
            message: "Not authenticated"
        }), { status: 401 });
    }

    try {
        const userId = new mongoose.Types.ObjectId(user._id);
        const result = await UserModel.aggregate([
            { $match: { _id: userId } }, // Match by _id, assuming user._id is the correct field
            { $unwind: { path: '$messages', preserveNullAndEmptyArrays: true } }, // Unwind messages array
            { $sort: { 'messages.createdAt': -1 } }, // Sort messages by createdAt
            { $group: { _id: '$_id', messages: { $push: '$messages' } } } // Group by _id, assuming _id is the user's _id
        ]);

        if (!result || result.length === 0) {
            return new Response(JSON.stringify({
                success: false,
                message: "User not found"
            }), { status: 404 });
        }

        return new Response(JSON.stringify({
            success: true,
            messages: result[0].messages
        }), { status: 200 });

    } catch (error) {
        console.error("Unexpected error occurred:", error);
        return new Response(JSON.stringify({
            success: false,
            message: "Unexpected error occurred"
        }), { status: 500 });
    }
}
