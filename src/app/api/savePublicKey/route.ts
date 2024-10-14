
import db from "@/lib/db";
import { getServerSession, User } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";


export async function POST(request: Request) {


  try {
    const { publicKey } = await request.json();
    if (!publicKey) {
      return new Response(JSON.stringify({
        success: false,
        message: "Public key is required"
      }), { status: 400 });
    }
    const session = await getServerSession(authOptions);
    const user: User = session?.user;


    if (!session || !user) {
      return new Response(JSON.stringify({
        success: false,
        message: "Not authenticated"
      }), { status: 401 });
    }



    const encriptionKey = await db.encryptionKey.create({
      data: {
        publicKey,
        userId: user.id!,
      }
    })


    return new Response(JSON.stringify({
      success: true,
      message: "public key saved successfully"
    }), { status: 200 });

  } catch (error) {
    console.log("Error adding public key", error);

    return new Response(JSON.stringify({
      success: false,
      message: "Internal server error"
    }), { status: 500 });
  }
}
