import { Alert } from "@/src/lib/material";
import { Leaf } from "lucide-react";

export function SuccessAlert({ children }: { children: React.ReactNode }) {
  return (
    <Alert color="green" icon={<Leaf />} className="flex-wrap justify-center">
      {children}
    </Alert>
  );
}
