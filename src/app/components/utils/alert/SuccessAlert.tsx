import { Leaf } from "lucide-react";
import { Alert, AlertDescription } from "@/src/app/components/ui/alert";

export function SuccessAlert({ children }: { children: React.ReactNode }) {
  return (
    <Alert variant="success">
      <AlertDescription className="flex justify-center gap-2">
        <Leaf size={20} />
        {children}
      </AlertDescription>
    </Alert>
  );
}
