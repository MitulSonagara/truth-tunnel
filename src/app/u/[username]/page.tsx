import MessagingForm from "@/components/MessagingForm";
import Navbar from "@/components/Navbar";
import db from "@/lib/db";
import { notFound } from "next/navigation";

const fetchUser = async (username: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        username,
      },
      select: {
        username: true,
        encryptionKey: {
          select: {
            publicKey: true,
          },
        },
      },
    });
    return user;
  } catch (error) {
    return null;
  }
};

const Page = async ({ params }: { params: { username: string } }) => {
  const user = await fetchUser(params.username);

  if (user == null) {
    return notFound();
  }

  return (
    <>
      <Navbar />
      <div className="flex justify-center p-8">
        <h1 className="font-bold text-3xl md:text-4xl">Public Profile</h1>
      </div>
      <MessagingForm user={user} />
    </>
  );
};

export default Page;
