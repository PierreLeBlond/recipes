"use client";

import { cn } from "@/src/lib/utils";
import { useSession } from "next-auth/react";
import { useQueryState } from "@/src/lib/hooks/useQueryState";
import { Switch } from "@/src/app/components/ui/switch";
import { QueryParamsLink } from "../utils/QueryParamsLink";

export function EditSwitch() {
  const session = useSession();
  const queryState = useQueryState();

  if (session.data?.user.role !== "ADMIN") {
    return null;
  }

  return (
    <QueryParamsLink
      className="flex gap-4"
      props={{
        partialQueryState: {
          edit: !queryState.edit,
        },
      }}
    >
      <p
        className={cn("text-gray-800 transition-colors", {
          "text-gray-800/20": queryState.edit,
        })}
      >
        présentation
      </p>
      <Switch
        checked={queryState.edit}
        disabled
        className="pointer-events-none"
      />
      <p
        className={cn("text-edit transition-colors", {
          "text-edit/50": !queryState.edit,
        })}
      >
        édition
      </p>
    </QueryParamsLink>
  );
}
