import { getServerSession } from "next-auth/next";
import LoginButton from "../Buttons/LoginButton";
import { GET } from "@/app/api/auth/[...nextauth]/route";
import Link from "next/link";
import { Session } from "next-auth";

export default async function Header() {
  const session = (await getServerSession(GET)) as Session | null;
  console.log(session);

  return (
    <div className="flex items-center gap-5 justify-end">
      <Link href="/" className="transition-colors hover:text-green-200">
        Home
      </Link>

      {session && (
        <Link
          href="/profile"
          className="transition-colors hover:text-green-200"
        >
          Profile
        </Link>
      )}

      <LoginButton />
    </div>
  );
}
