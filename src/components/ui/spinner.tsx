import { cn } from "@/lib/utils";
import { type VariantProps, cva } from "class-variance-authority";
import React from "react";

const sizeVariants = cva(
  "border-4 border-gray-300 border-t-indigo-500 rounded-full w-8 h-8 animate-spin ease-linear duration-500",
  {
    variants: {
      size: {
        default: "w-5 h-5",
        sm: "w-3 h-3",
        lg: "w-8 h-8",
      },
    },
  },
);

export interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof sizeVariants> {
  className?: string;
  size?: "default" | "sm" | "lg";
}

const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(({ className, size, ...props }, ref) => {
  return <div className={cn(sizeVariants({ size, className }))} ref={ref} {...props} />;
});

Spinner.displayName = "Spinner";

export { Spinner };
