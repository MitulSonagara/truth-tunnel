import db from "@/lib/db";
import { getServerSession, User } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";


export async function POST(request: Request) {

  const { username } = await request.json();

  try {
    const session = await getServerSession(authOptions);
    const user: User = session?.user;
    if (!session || !user) {
      return new Response(JSON.stringify({
        success: false,
        message: "Not authenticated"
      }), { status: 401 });
    }

    if (user.username == username) {
      return new Response(JSON.stringify({
        success: true,
        message: "Same username"
      }));
    }
    const checkUser = await db.user.findUnique({ where: { username } });

    if (checkUser) {
      return new Response(JSON.stringify({
        success: false,
        message: "User with username already exists"
      }), { status: 400 });
    }

    await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        username,
      }
    })


    return new Response(JSON.stringify({
      success: true,
      message: `username changed to ${username}`
    }), { status: 200 });

  } catch (error) {
    console.log("Error changing username", error);

    return new Response(JSON.stringify({
      success: false,
      message: "Internal server error"
    }), { status: 500 });
  }
}
