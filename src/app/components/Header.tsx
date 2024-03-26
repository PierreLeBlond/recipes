import { getServerAuthSession } from "@/src/server/auth";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "./utils/Badge";
import { CircleUserRound, DoorOpen, LogIn } from "lucide-react";
import { Button } from "@/src/lib/material";

export async function Header() {
  const session = await getServerAuthSession();

  return (
    <header className="fixed z-40 flex h-16 w-full items-center justify-between border-b border-gray-500 px-4 text-center text-sm font-bold backdrop-blur-md">
      {session && (
        <>
          <div className="col-span-7 flex items-center gap-x-4">
            {session.user.image ? (
              <Image
                src={session.user.image}
                alt={session.user.name || "image utilisateur"}
                className="h-10 w-10 rounded-full"
                width={40}
                height={40}
              ></Image>
            ) : (
              <CircleUserRound className="h-10 w-10"></CircleUserRound>
            )}
            <span>{session.user.name}</span>
            {session.user.role === "ADMIN" && <Badge>admin</Badge>}
          </div>
        </>
      )}
      <Button className="hidden sm:block" color="brown">
        <Link href={session ? "/api/auth/signout" : "/api/auth/signin"}>
          {session ? "logout" : "login"}
        </Link>
      </Button>
      <Button className="block sm:hidden" color="brown">
        <Link href={session ? "/api/auth/signout" : "/api/auth/signin"}>
          {session ? (
            <DoorOpen size={16}></DoorOpen>
          ) : (
            <LogIn size={16}></LogIn>
          )}
        </Link>
      </Button>
    </header>
  );
}
