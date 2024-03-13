import "@/src/styles/globals.css";

import { Inter } from "next/font/google";
import { cookies } from "next/headers";

import { TRPCReactProvider } from "@/src/trpc/react";

import { ThemeProvider } from "@/src/lib/material";
import { theme } from "@/src/styles/theme";
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider value={theme}>
      <html lang="en" className="relative">
        <body
          className={`font-sans ${inter.variable} flex h-full justify-center bg-gray-100 text-gray-700`}
        >
          <main className="flex min-h-screen w-full max-w-5xl flex-col items-center">
            <TRPCReactProvider cookies={cookies().toString()}>
              <Header></Header>
              {children}
            </TRPCReactProvider>
          </main>
        </body>
      </html>
    </ThemeProvider>
  );
}
