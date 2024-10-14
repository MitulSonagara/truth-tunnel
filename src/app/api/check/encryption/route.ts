
import db from "@/lib/db";
import { getServerSession, User } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";


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


    const testEncryption = await db.encryptionKey.findUnique({ where: { userId: user.id } })


    if (!testEncryption) {
      return new Response(JSON.stringify({
        success: false,
        message: "Please generate new encryption key"
      }), { status: 404 });
    }


    return new Response(JSON.stringify({
      success: true,
      message: testEncryption.testEncryption,
    }), { status: 200 });

  } catch (error) {
    console.log("Error fetching encryption test", error);

    return new Response(JSON.stringify({
      success: false,
      message: "Internal server error"
    }), { status: 500 });
  }
}
