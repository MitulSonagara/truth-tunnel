
import db from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {

    try {
        const { username, password } = await request.json();
        
        const existingUser = await db.user.findUnique({
            where: {
                username
            }
        })
        if (!existingUser) {
            return new Response(JSON.stringify({
                success: false,
                message: "user not found"
            }), {
                status: 400
            });
        }
        
        const hashPassword = await bcrypt.hash(password, 10);

        await db.user.update({
            where: {
                username,
            },
            data: {
                password: hashPassword,
            }
        })

        return new Response(JSON.stringify({
            success: true,
            message: "password changed successfully."
        }), { status: 201 });

    } catch (error) {
        console.error("Error sending mail", error);
        return new Response(JSON.stringify({
            success: false,
            message: "Password updation unsuccessful, try again later"
        }), {
            status: 500
        });
    }
}
