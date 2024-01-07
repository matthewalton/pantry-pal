import { getServerSession } from "next-auth/next";
import LoginButton from "../Buttons/LoginButton";
import { GET } from "@/app/api/auth/[...nextauth]/route";
import Link from "next/link";
import { Session } from "next-auth";

export default async function Header() {
  const session = (await getServerSession(GET)) as Session | null;

  return (
    <header className="z-20 mx-auto flex h-14 w-full max-w-5xl flex-row flex-nowrap items-center justify-between py-3 duration-1000 ease-in-out animate-in fade-in slide-in-from-top-4">
      <div className="font-bold">Pantry Pal</div>

      <div className="flex flex-wrap items-center gap-x-5 gap-y-1 justify-end">
        <Link href="/" className="transition-colors hover:text-gray-700">
          Home
        </Link>

        {session && (
          <Link
            href="/profile"
            className="transition-colors hover:text-gray-700"
          >
            Profile
          </Link>
        )}

        <LoginButton />
      </div>
    </header>
  );
}
