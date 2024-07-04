"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/src/app/components/ui/input";
import { Search } from "lucide-react";

type SearchInputProps = {
  label: string;
};

export function SearchInput({ props: { label } }: { props: SearchInputProps }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleChange = (search: string) => {
    const params = new URLSearchParams(searchParams);
    if (search) {
      params.set("search", search);
    } else {
      params.delete("search");
    }
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <Input
      onChange={(e) => handleChange(e.target.value)}
      type="search"
      label={label}
      icon={<Search className="-translate-x-1 -translate-y-0.5" />}
      defaultValue={searchParams.get("search") || ""}
    />
  );
}
