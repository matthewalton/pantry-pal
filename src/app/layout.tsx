import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NextAuthProvider from "@/app/_components/Providers/NextAuthProvider";
import Header from "@/app/_components/Header/Header";
import SignInPanel from "@/app/_components/Auth/SignIn/Panel/SignInPanel";
import { SignInPanelProvider } from "@/app/_components/Providers/SignInPanelProvider";
import SignInOptions from "@/app/_components/Auth/SignIn/Options/SignInOptions";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pantry Pal",
  description: "Got food at home? See what you can make!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>
          <SignInPanelProvider>
            <Header />

            <main className="mx-auto flex max-w-3xl flex-col grow items-stretch justify-center px-4 sm:px-6">
              {children}
            </main>

            <SignInPanel>
              <SignInOptions />
            </SignInPanel>
          </SignInPanelProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
