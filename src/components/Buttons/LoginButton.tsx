"use client";

import { useSession, signIn, signOut } from "next-auth/react";

export default function LoginButton() {
  const { data: session } = useSession();

  const handleClick = () => {
    if (session) {
      signOut();
      return;
    }

    signIn();
  };

  const text = session ? "Sign out" : "Sign in";
  const colours = session
    ? "bg-red-500 hover:bg-red-700"
    : "bg-blue-500 hover:bg-blue-700";

  return (
    <button
      className={`transition-colors text-white font-bold py-1 px-4 rounded ${colours}`}
      onClick={() => handleClick()}
    >
      {text}
    </button>
  );
}
