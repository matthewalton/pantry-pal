"use client";

import { useSession, signOut } from "next-auth/react";
import { useSignInPanel } from "../providers/SignInPanelProvider";

export default function LoginButton() {
  const { data: session } = useSession();
  const { openPanel } = useSignInPanel();

  const handleClick = () => {
    if (session) {
      signOut();
      return;
    }

    openPanel();
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
