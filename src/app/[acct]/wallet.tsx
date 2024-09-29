import FlickeringGrid from "@/components/magicui/flickering-grid";
import MotionNumber from "motion-number";
import {
  ArrowDownTrayIcon,
  BanknotesIcon,
  PaperAirplaneIcon,
  PlusCircleIcon,
  CheckBadgeIcon,
} from "@heroicons/react/24/solid";

import { type DualIcon } from "../types";
import { NeonGradientCard } from "@/components/magicui/neon-gradient-card";
import { Button } from "@nextui-org/react";
import { type PropsWithChildren } from "react";

export const Wallet = (props: { balance: number | undefined }) => (
  <NCard>
    <div className="h-full content-between overflow-hidden">
      <div className="flex h-[20%] w-full items-end font-mono text-xs tracking-tight text-gray-800/60">
        <p className="drop-shadow-md">Available balance</p>
      </div>

      <MotionNumber
        value={Number(props.balance)}
        format={{
          notation: "standard",
          currency: "USD", //₱
          currencyDisplay: "narrowSymbol",
          style: "currency",
        }}
        className="z-50 h-[30%] font-mono text-3xl font-bold tracking-wider text-gray-800 drop-shadow-lg"
      />

      <div className="flex h-[10%] w-full items-center space-x-2 text-xs">
        <div className="flex items-center space-x-0.5 rounded-full bg-indigo-400 pl-0.5 pr-1.5 text-white">
          <CheckBadgeIcon className="size-3 shrink-0" />
          <p>verified</p>
        </div>
      </div>
      <div className="flex h-[40%] w-full items-end justify-between text-gray-800">
        {actions.map((action) => (
          <div key={action.id} className="flex flex-col items-center space-y-1">
            <Button
              variant="ghost"
              className="h-fit w-fit rounded-full border-0 hover:bg-transparent"
              isIconOnly
            >
              <div className="flex w-fit flex-col items-center opacity-80">
                <action.icon className="size-6 stroke-[1.75px] drop-shadow-lg" />
              </div>
            </Button>

            <p className="font-mono text-xs font-light tracking-tight">
              {action.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  </NCard>
);

interface Action {
  id: number | string;
  icon: DualIcon;
  fn?: VoidFunction;
  label?: string;
}
const actions: Action[] = [
  { id: 0, icon: BanknotesIcon, label: "earn" },
  { id: 1, icon: ArrowDownTrayIcon, label: "withdraw" },
  { id: 2, icon: PlusCircleIcon, label: "deposit" },
  { id: 3, icon: PaperAirplaneIcon, label: "send" },
];

const NCard = ({ children }: PropsWithChildren) => (
  <NeonGradientCard className="relative h-[200px] overflow-hidden">
    <FlickeringGrid
      className="absolute inset-0 z-0 size-full [mask:radial-gradient(circle_at_top,#fff_420px,transparent_0)]"
      squareSize={21}
      gridGap={42}
      color="#c7d2fe"
      maxOpacity={0.5}
      flickerChance={0.025}
      height={800}
      width={800}
    />
    {children}
  </NeonGradientCard>
);
