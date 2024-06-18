"use client";

import { cn } from "@/src/lib/utils";
import { useSession } from "next-auth/react";
import { Switch } from "@/src/app/components/ui/switch";
import { useEditQuery } from "@/src/lib/hooks/useEditQuery";
import { QueryParamsLink } from "../utils/QueryParamsLink";
import { Typography } from "../ui/typography";

export function EditSwitch() {
  const session = useSession();
  const edit = useEditQuery(session.data);

  if (session.data?.user.role !== "ADMIN") {
    return null;
  }

  return (
    <div className="fixed top-16 z-40 flex h-16 w-full items-center justify-center border-b backdrop-blur-md xs:left-8 xs:top-20 xs:w-64 xs:rounded-lg xs:border">
      <QueryParamsLink
        className="flex gap-4"
        props={{ name: "edit", value: edit ? "false" : "true" }}
      >
        <Typography
          className={cn("text-primary-foreground transition-colors", {
            "text-primary-foreground/20": edit,
          })}
        >
          présentation
        </Typography>
        <Switch checked={edit} disabled className="pointer-events-none" />
        <Typography
          className={cn("text-edit transition-colors", {
            "text-edit/20": !edit,
          })}
        >
          édition
        </Typography>
      </QueryParamsLink>
    </div>
  );
}
