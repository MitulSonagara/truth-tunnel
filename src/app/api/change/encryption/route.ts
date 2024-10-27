import db from "@/lib/db";
import { getServerSession, User } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import { encryptMessage } from "@/lib/crypto";


export async function POST(request: Request) {

  const { publicKey, privateKey } = await request.json();

  try {
    const session = await getServerSession(authOptions);
    const user: User = session?.user;
    if (!session || !user) {
      return new Response(JSON.stringify({
        success: false,
        message: "Not authenticated"
      }), { status: 401 });
    }


    const checkUser = await db.encryptionKey.findUnique({ where: { userId: user.id } });

    if (!checkUser) {
      return new Response(JSON.stringify({
        success: false,
        message: "Please generate encryption key before updating."
      }), { status: 400 });
    }


    const testEncryption = encryptMessage(publicKey, "secured")

    await db.encryptionKey.update({
      where: { userId: user.id }, data: {
        publicKey,
        testEncryption,
        encryptedPrivateKey: privateKey,
      }
    });


    await db.message.deleteMany({
      where: {
        userId: user.id
      }
    })



    return new Response(JSON.stringify({
      success: true,
      message: "keys changed!"
    }), { status: 200 });

  } catch (error) {
    console.log("Error changing keys", error);

    return new Response(JSON.stringify({
      success: false,
      message: "Internal server error"
    }), { status: 500 });
  }
}
