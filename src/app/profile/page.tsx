import { User } from "next-auth";
import Image from "next/image";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default function Page() {
  const token = headers().get("x-session-token");

  if (!token) {
    redirect("/");
  }

  const user = JSON.parse(token) as User;

  if (!user) {
    redirect("/");
  }

  return (
    <div className="flex flex-col gap-5 items-stretch">
      <h1 className="font-bold text-xl">Profile</h1>
      <div className="flex gap-5">
        {user.picture && (
          <Image
            src={user.picture}
            alt="User profile picture"
            width={100}
            height={100}
          />
        )}

        <div className="flex flex-col gap-1">
          <h2 className="font-bold text-lg">{user.name}</h2>
          <span>{user.email}</span>
        </div>
      </div>
    </div>
  );
}
