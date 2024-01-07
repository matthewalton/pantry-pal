import { getProviders } from "next-auth/react";
import SignInOptionButton from "./SignInOptionButton";

export default async function SignInOptions() {
  const providers = await getProviders();

  if (!providers) {
    return "";
  }

  return Object.values(providers).map((provider) => (
    <SignInOptionButton key={provider.id} provider={provider} />
  ));
}
