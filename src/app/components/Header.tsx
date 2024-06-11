"use client";

import Link from "next/link";
import Image from "next/image";
import {
  CircleUserRound,
  DoorOpen,
  LogIn,
  UtensilsCrossed,
} from "lucide-react";
import { cn } from "@/src/lib/utils";
import { usePathname } from "next/navigation";
import { Session } from "next-auth";
import { Badge } from "./utils/Badge";
import { Button } from "./ui/button";

type HeaderProps = {
  session: Session | null;
};

export function Header({ props: { session } }: { props: HeaderProps }) {
  const pathname = usePathname();

  return (
    <header className="fixed z-40 grid h-16 w-full grid-cols-5 items-center justify-between border-b border-primary-foreground px-4 text-center text-sm font-bold backdrop-blur-md">
      {session && (
        <div className="flex items-center gap-x-4">
          {session?.user.image ? (
            <Image
              src={session?.user.image}
              alt={session?.user.name || "image utilisateur"}
              className={cn("h-10 w-10 rounded-full", {
                "border-2 border-edit md:border-0":
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
      <div className="col-span-3 col-start-2 flex items-center justify-center gap-x-4">
        <Link
          href="/recipes"
          className={cn(
            "border-primary-foreground transition-colors hover:border-primary-foreground/50 hover:text-primary-foreground/50",
            {
              "border-b-2": pathname === "/recipes",
            },
          )}
        >
          Recettes
        </Link>
        <UtensilsCrossed />
        <Link
          href="/foods"
          className={cn(
            "border-primary-foreground transition-colors hover:border-primary-foreground/50 hover:text-primary-foreground/50",
            {
              "border-b-2": pathname === "/foods",
            },
          )}
        >
          Aliments
        </Link>
      </div>
      <div className="flex items-center justify-end gap-x-4">
        <Button className="hidden md:block" variant="link" size="sm">
          <Link href={session ? "/api/auth/signout" : "/api/auth/signin"}>
            {session ? "logout" : "login"}
          </Link>
        </Button>
        <Button
          className="flex h-10 w-10 items-center justify-center rounded-full md:hidden"
          variant="link"
          size="sm"
        >
          <Link href={session ? "/api/auth/signout" : "/api/auth/signin"}>
            {session ? <DoorOpen size={14} /> : <LogIn size={14} />}
          </Link>
        </Button>
      </div>
    </header>
  );
}
