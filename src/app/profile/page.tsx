import Image from "next/image";
import { redirect } from "next/navigation";
import MyRecipes from "@/app/_components/recipe/my-recipes";
import { Suspense } from "react";
import { getServerSession } from "next-auth";

export default async function Page() {
  const session = await getServerSession();

  if (!session) {
    redirect("/");
  }

  return (
    <div className="flex flex-col flex-wrap gap-5 items-stretch w-full max-w-lg">
      <h1 className="font-bold text-xl">Profile</h1>
      <div className="flex flex-wrap gap-5">
        {session.user?.image && (
          <Image
            src={session.user.image}
            className="shadow-lg"
            alt="User profile picture"
            width={100}
            height={100}
          />
        )}

        <div className="flex flex-col gap-1">
          <h2 className="font-bold text-lg">{session.user?.name}</h2>
          <span>{session.user?.email}</span>
        </div>
      </div>

      <Suspense fallback={<div>Loading recipes...</div>}>
        <MyRecipes />
      </Suspense>
    </div>
  );
}
