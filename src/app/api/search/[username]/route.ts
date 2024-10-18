import { useParams } from "next/navigation"
import { NextRequest, NextResponse } from "next/server"
import db from "@/lib/db";


export async function GET(req: NextRequest) {
    const username = req.nextUrl.pathname.split("/").pop();
    try {
        const user = await db.user.findFirst({

            where: {
                username: username
            }
        })

        if (user) {

            console.log("user found ",user)
            return NextResponse.json({
                user: user,
                message: "user found succefully"
            }, { status: 200 })
        }
        else {
            return NextResponse.json({

                message: "No user found with this username"
            }, { status: 400 })
        }
    } catch (e) {
        console.error('Error searching recipes:', e);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });

    }


}