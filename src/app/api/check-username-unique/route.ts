
import { z } from "zod";
import { usernameValidation } from "@/schemas/signUpSchema";
import db from "@/lib/db";

const UsernameQuerySchema = z.object({
    username: usernameValidation
});

export async function GET(request: Request) {


    try {
        const { searchParams } = new URL(request.url);
        const queryParams = {
            username: searchParams.get("username")
        };

        const result = UsernameQuerySchema.safeParse(queryParams);

        if (!result.success) {
            const usernameErrors = result.error.format().username?._errors;
            return new Response(JSON.stringify({
                success: false,
                message: `${usernameErrors}`
            }), { status: 400 });
        }

        const { username } = result.data;

        const existingVerifiedUser = await db.user.findUnique({
            where: { username }
        });

        if (existingVerifiedUser) {
            return new Response(JSON.stringify({
                success: false,
                message: "Username already taken"
            }), { status: 400 });
        } else {
            return new Response(JSON.stringify({
                success: true,
                message: "Username is available"
            }), { status: 200 });
        }

    } catch (error) {
        console.error("Error checking username", error);
        return new Response(JSON.stringify({
            success: false,
            message: "Error checking username"
        }), { status: 500 });
    }
}
