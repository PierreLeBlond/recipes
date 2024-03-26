import "@/src/styles/globals.css";

import { Inter, Roboto_Mono } from "next/font/google";
import { cookies } from "next/headers";

import { TRPCReactProvider } from "@/src/trpc/react";

import { ThemeProvider } from "@/src/lib/material";
import { theme } from "@/src/styles/theme";
import { Header } from "./components/Header";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto-mono",
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
          className={`font-sans ${inter.variable} flex h-full justify-center border-gray-500 bg-gray-50 text-gray-900`}
        >
          <TRPCReactProvider cookies={cookies().toString()}>
            <Header></Header>
            <main className="relative w-full max-w-72 pb-16 pt-24 sm:max-w-lg lg:max-w-4xl">
              {children}
            </main>
          </TRPCReactProvider>
        </body>
      </html>
    </ThemeProvider>
  );
}
