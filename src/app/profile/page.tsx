import Image from "next/image";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { JWT } from "next-auth/jwt";
import MyRecipes from "@/components/Recipe/MyRecipes/MyRecipes";
import { Suspense } from "react";

export default function Page() {
  const token = headers().get("x-session-token");

  if (!token) {
    redirect("/");
  }

  const user = JSON.parse(token) as JWT;

  if (!user) {
    redirect("/");
  }

  return (
    <div className="flex flex-col flex-wrap gap-5 items-stretch w-full max-w-lg">
      <h1 className="font-bold text-xl">Profile</h1>
      <div className="flex flex-wrap gap-5">
        {user.picture && (
          <Image
            src={user.picture}
            className="shadow-lg"
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

      <Suspense fallback={<div>Loading recipes...</div>}>
        <MyRecipes />
      </Suspense>
    </div>
  );
}
