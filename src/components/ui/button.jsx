import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none  hover:cursor-pointer rounded-[2px] [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-white hover:shadow-xs shadow-primary hover:bg-primary/90 h-[36px] sm:h-[38px] md:h-[40px] lg:h-[42px] xl:h-[44px] 2xl:h-[45px]",
        destructive:
          "bg-destructive text-white dark:bg-destructive/60 hover:shadow-xs shadow-destructive hover:bg-destructive/90 h-[36px] sm:h-[38px] md:h-[40px] lg:h-[42px] xl:h-[44px] 2xl:h-[45px]",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-primary/20 text-primary hover:bg-primary/30",
        ghost:
          "",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "px-4 has-[>svg]:px-3",
        sm: "h-[28px] sm:h-[30px] md:h-[32px] lg:h-[34px] xl:h-[36px] 2xl:h-[40px] gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: " rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props} />
  );
}

export { Button, buttonVariants }
