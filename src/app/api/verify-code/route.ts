import db from "@/lib/db";

export async function POST(request: Request) {
    try {
        const { username, code } = await request.json();
        const decodedUsername = decodeURIComponent(username);

        const user = await db.user.findUnique({ where: { username: decodedUsername } });

        if (!user) {
            return new Response(
                JSON.stringify({
                    success: false,
                    message: "User not found",
                }),
                { status: 500 }
            );
        }

        // Check if verifyCodeExpiry is not null before comparing dates
        const isCodeValid = user.verifyCode === code;
        const isCodeNotExpired = user.verifyCodeExpiry && new Date(user.verifyCodeExpiry) > new Date();

        if (isCodeValid && isCodeNotExpired) {
            await db.user.update({
                where: {
                    username: decodedUsername,
                },
                data: {
                    isVerified: true,
                },
            });

            return new Response(
                JSON.stringify({
                    success: true,
                    message: "Account verified successfully",
                }),
                { status: 200 }
            );
        } else if (!isCodeNotExpired) {
            return new Response(
                JSON.stringify({
                    success: false,
                    message: "Verification code expired, Please sign up again to get a new code",
                }),
                { status: 400 }
            );
        } else {
            return new Response(
                JSON.stringify({
                    success: false,
                    message: "Incorrect verification code",
                }),
                { status: 400 }
            );
        }
    } catch (error) {
        console.error("Error verifying code", error);
        return new Response(
            JSON.stringify({
                success: false,
                message: "Error verifying code",
            }),
            { status: 500 }
        );
    }
}
