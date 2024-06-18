"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

type QueryParamsLinkProps = {
  name: string;
  value: string;
};

export function QueryParamsLink({
  props: { name, value },
  children,
  className,
}: {
  props: QueryParamsLinkProps;
  children: React.ReactNode;
  className: string;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const params = new URLSearchParams(searchParams.toString());

  params.set(name, value);

  return (
    <Link
      className={className}
      href={{
        pathname,
        query: params.toString(),
      }}
      replace
      scroll={false}
    >
      {children}
    </Link>
  );
}
