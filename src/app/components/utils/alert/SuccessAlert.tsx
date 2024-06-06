import { Leaf } from "lucide-react";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/src/app/components/ui/alert";

export function SuccessAlert({ children }: { children: React.ReactNode }) {
  return (
    <Alert
      className="flex flex-wrap items-center justify-center gap-2"
      variant="success"
    >
      <AlertTitle>
        <Leaf />
      </AlertTitle>
      <AlertDescription>{children}</AlertDescription>
    </Alert>
  );
}
