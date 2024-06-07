import { type VariantProps, cva } from "class-variance-authority";
import React from "react";

const typographyVariants = cva("", {
  variants: {
    variant: {
      p: "leading-7",
      h1: "scroll-m-20 text-6xl font-extrabold tracking-tight lg:text-5xl",
      h2: "scroll-m-20 pb-2 text-4xl font-semibold tracking-tight first:mt-0",
      h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
    },
  },
  defaultVariants: {
    variant: "p",
  },
});

export interface TypographyProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof typographyVariants> {}

const Typography = React.forwardRef<HTMLDivElement, TypographyProps>(
  ({ className, variant, ...props }, ref) => {
    const Comp = variant || "p";
    return (
      <Comp
        className={typographyVariants({ variant, className })}
        ref={ref}
        {...props}
      />
    );
  },
);
Typography.displayName = "Typography";

export { Typography, typographyVariants };
