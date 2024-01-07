import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NextAuthProvider from "@/components/Auth/NextAuthProvider";
import Header from "@/components/Header/Header";

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
          <Header />

          <main className="mx-auto flex min-h-screen max-w-5xl flex-col items-stretch py-28 px-4 sm:px-6">
            {children}
          </main>
        </NextAuthProvider>
      </body>
    </html>
  );
}
