"use client";

import { Switch, Typography } from "@/src/lib/material";
import { cn } from "@/src/lib/utils";
import { QueryParamsLink } from "../utils/QueryParamsLink";
import { useSession } from "next-auth/react";
import { useQueryState } from "@/src/lib/hooks/useQueryState";

export const EditSwitch = () => {
  const session = useSession();
  const queryState = useQueryState();
  return (
    <>
      {session.data?.user.role === "ADMIN" && (
        <QueryParamsLink
          className="flex gap-4"
          props={{
            partialQueryState: {
              edit: !queryState.edit,
            },
          }}
        >
          <Typography
            className={cn("text-gray-800 transition-colors", {
              "text-gray-800/20": queryState.edit,
            })}
          >
            présentation
          </Typography>
          <Switch
            crossOrigin={""}
            color="blue-gray"
            checked={queryState.edit}
            readOnly
          ></Switch>
          <Typography
            className={cn("text-blue-gray-500 transition-colors", {
              "text-blue-gray-500/20": !queryState.edit,
            })}
          >
            édition
          </Typography>
        </QueryParamsLink>
      )}
    </>
  );
};
