
import db from "@/lib/db";
import { getServerSession, User } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import { encryptMessage } from "@/lib/crypto";


export async function GET(request: Request) {

  try {
    const session = await getServerSession(authOptions);
    const user: User = session?.user;


    if (!session || !user) {
      return new Response(JSON.stringify({
        success: false,
        message: "Not authenticated"
      }), { status: 401 });
    }

    const keys = await db.encryptionKey.findUnique({
      where: {
        userId: user.id,
      }
    })

    if (!keys) {
      return new Response(JSON.stringify({
        success: false,
        message: "Keys not found"
      }), { status: 404 });
    }
    return new Response(JSON.stringify({
      success: true,
      encryptedKey: keys.encryptedPrivateKey,

    }), { status: 200 });

  } catch (error) {
    console.log("Error fetching keys", error);

    return new Response(JSON.stringify({
      success: false,
      message: "Internal server error"
    }), { status: 500 });
  }
}
