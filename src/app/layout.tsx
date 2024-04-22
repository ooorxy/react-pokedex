import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";
import pokedex from "@/imgs/pokedex.png";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pokedex NEXT",
  description: "Pokedex application with NEXT and Shadcn",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <div className="min-h-full">
          <div className="bg-red-500 rounded-b">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Link href={"/"} className="h-8 w-8">
                      <Image
                        loading="lazy"
                        src={pokedex}
                        alt="pokedex"
                        width={40}
                        height={40}
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <header className="bg-white">
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-medium tracking-tight text-gray-900">
                Pokedex NEXT
              </h1>
            </div>
          </header>
          <main>
            <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
