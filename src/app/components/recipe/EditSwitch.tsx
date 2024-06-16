"use client";

import { cn } from "@/src/lib/utils";
import { useSession } from "next-auth/react";
import { useQueryState } from "@/src/lib/hooks/useQueryState";
import { Switch } from "@/src/app/components/ui/switch";
import { QueryParamsLink } from "../utils/QueryParamsLink";
import { Typography } from "../ui/typography";

export function EditSwitch() {
  const session = useSession();
  const queryState = useQueryState();

  if (session.data?.user.role !== "ADMIN") {
    return null;
  }

  return (
    <div className="fixed top-16 z-40 flex h-16 w-full items-center justify-center border-b backdrop-blur-md xs:left-8 xs:top-20 xs:w-64 xs:rounded-lg xs:border">
      <QueryParamsLink
        className="flex gap-4"
        props={{
          partialQueryState: {
            edit: !queryState.edit,
          },
        }}
      >
        <Typography
          className={cn("text-primary-foreground transition-colors", {
            "text-primary-foreground/20": queryState.edit,
          })}
        >
          présentation
        </Typography>
        <Switch
          checked={queryState.edit}
          disabled
          className="pointer-events-none"
        />
        <Typography
          className={cn("text-edit transition-colors", {
            "text-edit/20": !queryState.edit,
          })}
        >
          édition
        </Typography>
      </QueryParamsLink>
    </div>
  );
}
