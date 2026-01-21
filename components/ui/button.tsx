import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary/90 shadow-soft hover:shadow-elevated",

        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",

        // ✅ token-based outline (works in light + deck)
        outline:
          "border-2 border-border bg-transparent text-foreground hover:bg-muted",

        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",

        // ✅ ghost no longer tied to accent
        ghost: "bg-transparent text-foreground hover:bg-muted",

        // ✅ link can be accent OR just foreground; pick one
        link: "text-foreground/80 underline-offset-4 hover:text-foreground hover:underline",

        // Keep accent for “special” actions
        accent:
          "bg-accent text-accent-foreground hover:bg-accent/90 shadow-soft hover:shadow-glow",

        // ✅ hero becomes “primary CTA” (in deck, primary should be white)
        hero: "bg-primary text-primary-foreground shadow-lg hover:shadow-elevated hover:-translate-y-0.5",

        // ✅ hero-outline token-based, subtle glass optional
        "hero-outline":
          "border-2 border-border bg-card/40 text-foreground hover:bg-card/60 backdrop-blur-sm",
      },

      size: {
        default: "h-10 px-5 py-2",
        sm: "h-9 rounded-md px-4 text-xs",
        lg: "h-12 rounded-lg px-8 text-base",
        xl: "h-14 rounded-xl px-10 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
