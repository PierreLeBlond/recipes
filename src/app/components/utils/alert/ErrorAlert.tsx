import { Ambulance } from "lucide-react";
import { Alert, AlertDescription } from "@/src/app/components/ui/alert";

export function ErrorAlert({ children }: { children: React.ReactNode }) {
  return (
    <Alert variant="error">
      <AlertDescription className="flex justify-center gap-2">
        <Ambulance size={20} />
        {children}
      </AlertDescription>
    </Alert>
  );
}
