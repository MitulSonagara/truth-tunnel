import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { z } from "zod";
import { usernameValidation } from "@/schemas/signUpSchema";

const UsernameQuerySchema = z.object({
    username: usernameValidation
})

export async function GET(request: Request) {
    await dbConnect()

    try {
        const { searchParams } = new URL(request.url)
        const queryParams = {
            username: searchParams.get("username")
        }
        const result = UsernameQuerySchema.safeParse(queryParams)

        if (!result.success) {
            const usernameErrors = result.error.format().username?._errors
            return Response.json({
                success: false,
                message: `Invalid query parameter,,, ${usernameErrors}`
            }, { status: 400 })
        }

        const { username } = result.data

        const existingVerifiedUser = await UserModel.findOne({
            username,
            isVerified: true
        })

        if (existingVerifiedUser) {
            return Response.json({
                success: false,
                message: "Username already taken"
            }, { status: 400 })
        }

    } catch (error) {
        console.error("Error checking username", error);
        return Response.json({
            success: false,
            Message: "Error checking username"
        }, { status: 500 })

    }
}