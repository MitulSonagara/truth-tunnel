import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
import db from "@/lib/db";

export async function POST(request: Request) {


    try {
        const { email} = await request.json();

        const existingUser = await db.user.findUnique({
            where: {
                email
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

        const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

        await db.user.update({
            where: {
                email,
            },
            data: {
                forgotOTP : verifyCode,
            }
        })

        // Send verification email
        const emailResponse = await sendVerificationEmail(email, existingUser.username, verifyCode, true);

        if (!emailResponse.success) {
            return new Response(JSON.stringify({
                success: false,
                message: emailResponse.message,
                
            }), { status: 500 });
        }

        return new Response(JSON.stringify({
            success: true,
            message: "Verification code sent.",
            username: existingUser.username
        }), { status: 201 });

    } catch (error) {
        console.error("Error sending mail", error);
        return new Response(JSON.stringify({
            success: false,
            message: "Error sending mail"
        }), {
            status: 500
        });
    }
}
