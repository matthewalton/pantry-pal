import { getServerSession } from "next-auth/next";
import { GET } from "@/app/api/auth/[...nextauth]/route";
import Link from "next/link";
import { Session } from "next-auth";
import HeaderDropdown from "./header-dropdown";

export default async function Header() {
  const session = (await getServerSession(GET)) as Session | null;

  return (
    <header className="z-20 mx-auto flex h-14 w-full max-w-3xl flex-row flex-nowrap items-center justify-between py-3 duration-1000 ease-in-out animate-in fade-in slide-in-from-top-4 px-4 sm:px-6">
      <Link href="/" className="font-bold whitespace-nowrap">
        Pantry Pal
      </Link>

      <div className="flex flex-wrap items-center gap-x-5 gap-y-1 justify-end">
        <HeaderDropdown />
      </div>
    </header>
  );
}
