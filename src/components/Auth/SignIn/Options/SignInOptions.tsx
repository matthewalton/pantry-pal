import { getProviders } from "next-auth/react";
import SignInOptionButton from "./SignInOptionButton";

export default async function SignInOptions() {
  const providers = await getProviders();

  if (!providers) {
    return "";
  }

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-xl font-medium">Welcome to Pantry Pal</h2>

      <p className="mb-2 text-base text-zinc-600">
        Sign in for unlimited access, ability to save your recipes, and access
        them from any device.
      </p>

      <div className="flex items-center justify-center sm:justify-start">
        {Object.values(providers).map((provider) => (
          <SignInOptionButton key={provider.id} provider={provider} />
        ))}
      </div>
    </div>
  );
}
