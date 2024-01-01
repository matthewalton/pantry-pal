import { getServerSession } from "next-auth/next";
import { GET } from "@/app/api/auth/[...nextauth]/route";
import LoginButton from "@/components/Buttons/LoginButton";
import { Session } from "next-auth";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = (await getServerSession(GET)) as Session | null;

  if (!session?.user) {
    redirect("/");
  }

  return (
    <div className="flex flex-col gap-5 items-stretch">
      <h1 className="font-bold text-xl">Profile</h1>
      <div className="flex gap-5">
        {session.user.image && (
          <Image
            src={session.user.image}
            alt="User profile picture"
            width={100}
            height={100}
          />
        )}

        <div className="flex flex-col gap-1">
          <h2 className="font-bold text-lg">{session.user.name}</h2>
          <span>{session.user.email}</span>
        </div>
      </div>
    </div>
  );
}
