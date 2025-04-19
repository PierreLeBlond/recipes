import { signInWithGitHub } from "@/src/lib/actions/signIn";
import { Button } from "./ui/button";
import { LogIn } from "lucide-react";

export default function SignIn() {
  return (
    <form action={signInWithGitHub}>
      <Button className="hidden md:block" variant="link" size="sm">
        Signin with GitHub
      </Button>
      <Button
        className="bg-primary flex h-10 w-10 items-center justify-center rounded-full md:hidden"
        variant="link"
        size="sm"
      >
        <LogIn size={14} />
      </Button>
    </form>
  );
}
