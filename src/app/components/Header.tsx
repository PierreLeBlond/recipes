"use client";

import Link from "next/link";
import Image from "next/image";
import { CircleUserRound, UtensilsCrossed } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { usePathname } from "next/navigation";
import { Session } from "next-auth";
import { Badge } from "./utils/Badge";
import SignIn from "./SignIn";
import Logout from "./Logout";

type HeaderProps = {
  session: Session | null;
};

export function Header({ props: { session } }: { props: HeaderProps }) {
  const pathname = usePathname();

  return (
    <header className="border-border bg-primary/20 xs:grid-cols-7 xs:px-4 fixed z-40 grid h-16 w-full grid-cols-5 items-center justify-between border-b px-2 text-center text-sm font-bold backdrop-blur-md">
      {session && (
        <div className="flex items-center gap-x-4">
          {session?.user.image ? (
            <Image
              src={session?.user.image}
              alt={session?.user.name || "image utilisateur"}
              className={cn("h-10 w-10 rounded-full", {
                "border-edit border-2 md:border-0":
                  session?.user.role === "ADMIN",
              })}
              width={40}
              height={40}
            />
          ) : (
            <CircleUserRound className="h-10 w-10" />
          )}
          <span className="hidden items-center gap-x-4 md:flex">
            {session?.user.name}
            {session?.user.role === "ADMIN" && <Badge>admin</Badge>}
          </span>
        </div>
      )}
      <div className="xs:col-span-5 xs:col-start-2 xs:text-sm col-span-3 col-start-2 flex items-center justify-center gap-x-4 text-xs">
        <Link
          href="/"
          className={cn(
            "border-primary-foreground hover:bg-primary-foreground/10 rounded-md p-2 transition-colors",
            {
              "bg-primary-foreground/10":
                pathname === `${process.env.NEXT_PUBLIC_BASE_PATH}/recipes`,
            },
          )}
        >
          Recettes
        </Link>
        <UtensilsCrossed />
        <Link
          href="/foods"
          className={cn(
            "border-primary-foreground hover:bg-primary-foreground/10 rounded-md p-2 transition-colors",
            {
              "bg-primary-foreground/10":
                pathname === `${process.env.NEXT_PUBLIC_BASE_PATH}/foods`,
            },
          )}
        >
          Aliments
        </Link>
      </div>
      <div className="flex items-center justify-end gap-x-4">
        {session ? <Logout /> : <SignIn />}
      </div>
    </header>
  );
}
