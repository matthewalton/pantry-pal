import { getServerSession } from "next-auth/next";
import { GET, POST } from "@/app/api/auth/[...nextauth]/route";
import LoginButton from "@/components/Buttons/LoginButton";

export default async function Page() {
  const session = await getServerSession(GET);

  return (
    <div className="flex flex-col gap-5 items-stretch">
      <h1 className="font-bold text-xl">Profile</h1>
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <LoginButton />
    </div>
  );
}
