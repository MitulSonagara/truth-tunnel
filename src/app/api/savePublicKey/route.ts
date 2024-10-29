
import db from "@/lib/db";
import { getServerSession, User } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import { encryptMessage } from "@/lib/crypto";


export async function POST(request: Request) {


  try {
    const { publicKey, privateKey } = await request.json();
    if (!publicKey || !privateKey) {
      return new Response(JSON.stringify({
        success: false,
        message: "keys are required"
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


    const testEncryption = encryptMessage(publicKey, "secured")

    const encriptionKey = await db.encryptionKey.create({
      data: {
        publicKey,
        userId: user.id!,
        testEncryption,
        // encryptedPrivateKey: privateKey,
      }
    })


    return new Response(JSON.stringify({
      success: true,
      message: "both keys are saved successfully"
    }), { status: 200 });

  } catch (error) {
    console.log("Error adding keys", error);

    return new Response(JSON.stringify({
      success: false,
      message: "Internal server error"
    }), { status: 500 });
  }
}