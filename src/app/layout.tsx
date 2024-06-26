import "@/src/styles/globals.css";

import { Inter } from "next/font/google";
import { cookies } from "next/headers";

import { ThemeProvider } from "@/src/app/components/ThemeProvider";

import { TRPCReactProvider } from "@/src/trpc/react";

import { getServerAuthSession } from "@/src/server/auth";
import { cn } from "@/src/lib/utils";
import { Header } from "./components/Header";
import { ToastProvider } from "./components/ui/toast";
import { Toaster } from "./components/ui/toaster";

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
    <html lang="en" className="relative" suppressHydrationWarning>
      <body
        className={cn(
          `flex h-full justify-center border-primary-foreground bg-primary font-sans text-primary-foreground`,
          inter.variable,
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <TRPCReactProvider cookies={cookieData.toString()}>
            <ToastProvider>
              <Header props={{ session }} />
              <main className="relative w-full pb-16 pt-16 xs:max-w-[310px] sm:max-w-lg lg:max-w-5xl">
                {children}
              </main>
            </ToastProvider>
            <Toaster />
          </TRPCReactProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
