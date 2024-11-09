"use client";

import { cn } from "@/lib/utils";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";

import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef,
} from "react";

/**
 * UI - Checkbox
 * from shadcn-ui
 */
const Checkbox = forwardRef<
  ElementRef<typeof CheckboxPrimitive.Root>,
  ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "border-ash data-[state=checked]:bg-void peer h-4 w-4 shrink-0 rounded-md border shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:text-cyan-500 data-[state=checked]:animate-in data-[state=unchecked]:animate-out data-[state=checked]:zoom-in-100 data-[state=unchecked]:zoom-out-0",
    )}
    {...props}
  ></CheckboxPrimitive.Root>
));
Checkbox.displayName = "Checkbox";

export const CheckBx = forwardRef<
  ElementRef<typeof CheckboxPrimitive.Root>,
  ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer flex size-5 shrink-0 items-center justify-center rounded-md border focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-sky-500 data-[state=unchecked]:border-neutral-400 data-[state=checked]:bg-sky-500 data-[state=checked]:animate-in data-[state=unchecked]:animate-out",
    )}
    {...props}
  ></CheckboxPrimitive.Root>
));
CheckBx.displayName = "CheckBx";

export { Checkbox };
