import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { MousePointerClickIcon } from "lucide-react";
import tw from "tailwind-styled-components";
import { type DualIcon } from "@/components/ui/types";
import { cn } from "@/lib/utils";

type JustTheTipProps = {
  tip?: string;
  children: React.ReactNode;
  extra?: string;
  icon?: DualIcon;
};

/**
 * (component) - JustTheTip - Tooltip with tip and extra content
 * @description - See? just like I promised. Just the tip.
 */
export const TheTip = (props: JustTheTipProps) => (
  <Tooltip>
    <TooltipTrigger className="w-full">{props.children}</TooltipTrigger>
    <TipContent className={props.extra ? `space-x-3` : ``}>
      <Extra className={cn(props.extra ? `flex` : ``)}>{props.extra}</Extra>{" "}
      <Tip className="text-ghost text-[10px]">
        {props?.icon ? (
          <props.icon className="size-3" />
        ) : (
          <MousePointerClickIcon size={14} />
        )}
        <p>{props.tip ?? `click to copy`}</p>
      </Tip>
    </TipContent>
  </Tooltip>
);

const TipContent = tw(TooltipContent)`
  rounded-md border-[0.33px] border-opus p-2
  bg-[conic-gradient(at_top_left,_var(--tw-gradient-stops))]
  from-slate-900 via-zinc-800/80 to-yellow-500 backdrop-blur-lg
  `;

const Tip = tw.div`
  text-[12px] text-dyan font-semibold font-jet
  flex items-center justify-center space-x-2
  h-[16px]
  `;

const Extra = tw.p`
  text-[10px] text-void font-light font-jet
  hidden
  `;
