import { Ambulance } from "lucide-react";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/src/app/components/ui/alert";

export function ErrorAlert({ children }: { children: React.ReactNode }) {
  return (
    <Alert
      className="flex flex-wrap items-center justify-center gap-2"
      variant="error"
    >
      <AlertTitle>
        <Ambulance />
      </AlertTitle>
      <AlertDescription>{children}</AlertDescription>
    </Alert>
  );
}
