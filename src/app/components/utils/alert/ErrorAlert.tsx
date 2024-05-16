import { Alert } from "@/src/lib/material";
import { Ambulance } from "lucide-react";

export function ErrorAlert({ children }: { children: React.ReactNode }) {
  return (
    <Alert
      color="red"
      icon={<Ambulance />}
      className="flex-wrap justify-center"
    >
      {children}
    </Alert>
  );
};
