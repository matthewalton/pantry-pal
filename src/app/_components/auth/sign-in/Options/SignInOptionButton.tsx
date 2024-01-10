"use client";

import { ClientSafeProvider, signIn } from "next-auth/react";

type Props = {
  provider: ClientSafeProvider;
};

export default function SignInOptionButton({ provider }: Props) {
  return (
    <div>
      <button
        className={`transition-colors text-black font-medium py-1 px-4 rounded hover:bg-gray-100 border`}
        onClick={() => signIn(provider.id)}
      >
        Sign in with {provider.name}
      </button>
    </div>
  );
}
