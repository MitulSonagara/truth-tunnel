
import { NextRequest, NextResponse } from "next/server"
import db from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";


export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams; // Fixed typo
    const query = searchParams.get("q");
    const session = await getServerSession(authOptions);
    const user = session?.user;

    // Check for user session
    if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }


    try {

        if (!query) {
            const users = await db.user.findMany({
                where: {
                    NOT: {
                        username: user.username,
                    },
                },
                orderBy: {
                    verifyCodeExpiry: 'desc', // Added only to get a noise in results.
                },
                select: {
                    username: true,
                    image: true,
                    createdAt: true,
                    id: true
                },
                take: 10,
            });

            return NextResponse.json({
                users,
                title: "Suggested Users"
            }, { status: 200 });
        }

        const users = await db.user.findMany({
            where: {
                OR: [
                    {
                        username: {
                            contains: query,
                            mode: 'insensitive'
                        },
                        name: {
                            contains: query,
                            mode: 'insensitive'
                        }
                    },
                ],
                NOT: {
                    username: user.username,
                },
            },
            orderBy: {
                verifyCodeExpiry: 'desc', // Added only to get a noise in results.
            },
            select: {
                username: true,
                image: true,
                createdAt: true,
                id: true
            }
        })

        return NextResponse.json({
            users,
            title: "Search Results"
        }, { status: 200 })

    } catch (e) {
        console.error('Error searching users:', e);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
