import "@/src/styles/globals.css";

import { Inter } from "next/font/google";
import { cookies } from "next/headers";

import { TRPCReactProvider } from "@/src/trpc/react";

import { ThemeProvider } from "@/src/lib/material";
import { theme } from "@/src/styles/theme";
import { getServerAuthSession } from "@/src/server/auth";
import { cn } from "@/src/lib/utils";
import { Header } from "./components/Header";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "R-CP",
  description: "Site de recettes",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuthSession();
  const cookieData = cookies();

  return (
    <ThemeProvider value={theme}>
      <html lang="en" className="relative">
        <body
          className={cn(
            `flex h-full justify-center border-gray-500 bg-gray-50 font-sans text-gray-900`,
            inter.variable,
          )}
        >
          <TRPCReactProvider cookies={cookieData.toString()}>
            <Header props={{ session }} />
            <main className="relative w-full max-w-72 pb-16 pt-16 sm:max-w-lg lg:max-w-4xl">
              {children}
            </main>
          </TRPCReactProvider>
        </body>
      </html>
    </ThemeProvider>
  );
}
