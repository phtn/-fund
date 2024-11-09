"use client";

import { cn } from "@nextui-org/react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import type { ElementRef, ComponentPropsWithoutRef, ReactNode } from "react";
import { forwardRef } from "react";

/**
 * (ui) - Tooltip
 */
const TooltipProvider = TooltipPrimitive.Provider;

const Tooltip = TooltipPrimitive.Root;

const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipContent = forwardRef<
  ElementRef<typeof TooltipPrimitive.Content>,
  ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      "z-50 overflow-hidden rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className,
    )}
    {...props}
  />
));
TooltipContent.displayName = "TooltipContent";

type TheTipProps = {
  content: string | ReactNode;
  children: ReactNode;
};
const TheTip = ({ content, children }: TheTipProps) => {
  return (
    <Tooltip>
      {children}
      <TooltipContent side="right" sideOffset={4}>
        <div className="bg-void rounded-md rounded-bl-none px-2 py-1 text-xs text-blue-100">
          {content}
        </div>
      </TooltipContent>
    </Tooltip>
  );
};

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider, TheTip };
