import { useQueryState } from "@/src/lib/hooks/useQueryState";
import { QueryState } from "@/src/lib/queryState/QueryState";
import { serializeQueryState } from "@/src/lib/queryState/serializeQueryState";
import Link from "next/link";
import { usePathname } from "next/navigation";

type QueryParamsLinkProps = {
  partialQueryState: Partial<QueryState>;
};

export const QueryParamsLink = ({
  props: { partialQueryState },
  children,
  className,
}: {
  props: QueryParamsLinkProps;
  children: React.ReactNode;
  className: string;
}) => {
  const pathname = usePathname();
  const queryState = useQueryState();

  return (
    <Link
      className={className}
      href={{
        pathname,
        query: serializeQueryState({
          ...queryState,
          ...partialQueryState,
        }),
      }}
      replace
      scroll={false}
    >
      {children}
    </Link>
  );
};
