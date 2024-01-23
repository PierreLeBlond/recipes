import { getServerAuthSession } from "@/src/server/auth";
import Link from "next/link";

export async function Header() {
  const session = await getServerAuthSession();

  return (
    <header className="grid h-8 w-full grid-cols-3 px-4 py-2 text-center text-sm font-bold sm:grid-cols-8">
      <Link
        href={session ? `/user/${session.user.id}/recipes` : "/api/auth/signin"}
        className="col-span-1"
      >
        mes recettes
      </Link>
      <Link
        href={session ? "/api/auth/signout" : "/api/auth/signin"}
        className="col-span-1 col-start-3 sm:col-start-8"
      >
        {session ? "logout" : "login"}
      </Link>
    </header>
  );
}
