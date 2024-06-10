import * as React from "react";

import { cn } from "@/src/lib/utils";
import { VariantProps, cva } from "class-variance-authority";

const inputVariants = cva(
  "peer h-full w-full rounded-[7px] border bg-transparent px-3 py-2.5 !pr-9 font-sans text-sm font-normal outline outline-0 transition-all placeholder:opacity-0 placeholder-shown:border focus:border-2 focus:outline-0 focus:placeholder:opacity-100 disabled:cursor-not-allowed disabled:border-0 ",
  {
    variants: {
      variant: {
        default:
          "border-secondary border-t-transparent text-secondary placeholder-shown:border-secondary placeholder-shown:border-t-secondary focus:border-secondary focus:border-t-transparent disabled:bg-secondary/20",
        edit: "border-edit border-t-transparent text-edit placeholder-shown:border-edit placeholder-shown:border-t-edit focus:border-edit focus:border-t-transparent disabled:bg-edit/20",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

const labelVariants = cva(
  "before:content[' '] after:content[' '] pointer-events-none absolute -top-1.5 left-0 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight transition-all before:pointer-events-none before:mr-1 before:mt-[6.5px] before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-l before:border-t  before:transition-all after:pointer-events-none after:ml-1 after:mt-[6.5px] after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-r after:border-t after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:before:border-l-2 peer-focus:before:border-t-2  peer-focus:after:border-r-2 peer-focus:after:border-t-2 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent",
  {
    variants: {
      variant: {
        default:
          "text-secondary before:border-secondary peer-disabled:peer-placeholder-shown:text-secondary peer-focus:after:!border-secondary after:border-secondary peer-placeholder-shown:text-secondary peer-focus:text-secondary peer-focus:before:!border-secondary",
        edit: "text-edit before:border-edit peer-disabled:peer-placeholder-shown:text-edit peer-focus:after:!border-edit after:border-edit peer-placeholder-shown:text-edit peer-focus:text-edit peer-focus:before:!border-edit",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
) satisfies typeof inputVariants;

const iconVariants = cva(
  "absolute right-3 top-2/4 grid h-5 w-5 -translate-y-2/4 place-items-center",
  {
    variants: {
      variant: {
        default: "text-secondary",
        edit: "text-edit",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
) satisfies typeof inputVariants;

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  label: string;
  placeholder?: string;
  icon?: React.ReactNode;
  variant?: "default" | "edit";
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, placeholder, icon, variant, ...props }, ref) => (
    <div className="!min-w-auto relative h-10 w-full min-w-[200px]">
      {icon && <div className={cn(iconVariants({ variant }))}>{icon}</div>}
      <input
        id={label}
        type={type}
        className={cn(inputVariants({ variant }), className)}
        placeholder={placeholder || " "}
        ref={ref}
        {...props}
      />
      <label htmlFor={label} className={cn(labelVariants({ variant }))}>
        {label}
      </label>
    </div>
  ),
);
Input.displayName = "Input";

export { Input };
