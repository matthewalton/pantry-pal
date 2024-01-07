"use client";

import { ClientSafeProvider, signIn } from "next-auth/react";

type Props = {
  provider: ClientSafeProvider;
};

export default function SignInOptionButton({ provider }: Props) {
  return (
    <div>
      <button onClick={() => signIn(provider.id)}>
        Sign in with {provider.name}
      </button>
    </div>
  );
}
