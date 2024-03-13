import { getServerAuthSession } from "@/src/server/auth";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "./utils/Badge";
import { CircleUserRound, DoorOpen, LogIn, LogOut } from "lucide-react";

export async function Header() {
  const session = await getServerAuthSession();

  return (
    <header className="flex w-full items-center justify-between border-b border-gray-900 p-2 text-center text-sm font-bold shadow-fly sm:p-4 lg:rounded-b-md lg:border-x">
      {session && (
        <>
          <div className="col-span-7 flex items-center gap-x-4">
            {session.user.image ? (
              <Image
                src={session.user.image}
                alt={session.user.name || "image utilisateur"}
                className="h-10 w-10 rounded-full border border-gray-900"
                width={40}
                height={40}
              ></Image>
            ) : (
              <CircleUserRound className="h-10 w-10 text-gray-900"></CircleUserRound>
            )}
            <span>{session.user.name}</span>
            {session.user.role === "ADMIN" && <Badge>admin</Badge>}
          </div>
        </>
      )}
      <Link
        href={session ? "/api/auth/signout" : "/api/auth/signin"}
        className="hidden rounded border border-gray-900 p-1 shadow-fly sm:block"
      >
        {session ? "logout" : "login"}
      </Link>
      <Link
        href={session ? "/api/auth/signout" : "/api/auth/signin"}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-900 p-1 sm:hidden"
      >
        {session ? <DoorOpen></DoorOpen> : <LogIn></LogIn>}
      </Link>
    </header>
  );
}
