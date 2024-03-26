import { Typography } from "@/src/lib/material";

type TitleProps = {
  title: string;
};

export function Title({ props: { title } }: { props: TitleProps }) {
  return (
    <Typography
      variant="h1"
      color="blue-gray"
      className="overflow-hidden font-mono shadow-blue-gray-500/20 [text-shadow:0px_1px_3px_var(--tw-shadow-color),_0px_1px_2px_var(--tw-shadow-color)]"
    >
      {title}
    </Typography>
  );
}
