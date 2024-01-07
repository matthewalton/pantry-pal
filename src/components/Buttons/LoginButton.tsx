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

  return (
    <button
      className={`transition-colors text-black font-medium py-1 px-4 rounded hover:bg-gray-100 border`}
      onClick={() => handleClick()}
    >
      {text}
    </button>
  );
}
