import { logout } from "@/src/lib/actions/logout";
import { Button } from "./ui/button";
import { DoorOpen } from "lucide-react";

export default function Logout() {
  return (
    <form action={logout}>
      <Button className="hidden md:block" variant="link" size="sm">
        Logout
      </Button>
      <Button
        className="bg-primary flex h-10 w-10 items-center justify-center rounded-full md:hidden"
        variant="link"
        size="sm"
      >
        <DoorOpen size={14} />
      </Button>
    </form>
  );
}
