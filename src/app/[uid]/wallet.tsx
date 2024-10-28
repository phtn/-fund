import MotionNumber from "motion-number";
import {
  ArrowDownTrayIcon,
  BanknotesIcon,
  PaperAirplaneIcon,
  PlusCircleIcon,
  CheckBadgeIcon,
  EllipsisHorizontalIcon,
  ArrowUpCircleIcon,
} from "@heroicons/react/24/solid";

import { type DualIcon } from "../types";
import { Button } from "@nextui-org/react";
import { useState } from "react";
import { EyeIcon } from "@heroicons/react/24/outline";
import { EyeOffIcon } from "lucide-react";
import { useConvex } from "../ctx/convex";
import { cn } from "@/lib/utils";

export const Wallet = (props: {
  balance: number | undefined;
  incr: VoidFunction;
  withdraw: VoidFunction;
  masked: boolean | undefined;
}) => {
  const [visible, setVisible] = useState(true);
  const toggleVisible = () => setVisible(!visible);

  const { account, transfer } = useConvex();
  const handleTransfer = () => transfer("test_account_01", 100);

  const wallet_actions: (VoidFunction | undefined)[] = [
    props.incr,
    props.withdraw,
    undefined,
    handleTransfer,
  ];

  return (
    <div className="h-full content-between overflow-hidden rounded-lg bg-gray-300">
      <div className="flex h-[50%] w-full">
        <div className="w-5/6">
          <div className="flex h-[33%] w-full items-end px-3.5 font-inst text-xs font-light text-gray-700">
            <p className="drop-shadow-md">Available balance</p>
          </div>

          <div className="_border-b z-50 h-[67%] w-full font-inter text-3xl font-medium tracking-wider text-gray-900 drop-shadow-lg">
            <div className="flex h-[65%] w-full items-center justify-between px-3">
              {visible && account?.balance ? (
                <MotionNumber
                  value={Number(account.balance)}
                  format={{
                    notation: "standard",
                    currency: "PHP", //₱
                    style: "currency",
                  }}
                />
              ) : (
                <p
                  className={cn("text-gray-900", {
                    "animate-pulse": !account?.balance,
                  })}
                >
                  **********
                </p>
              )}
              <Button
                variant="ghost"
                className="h-fit rounded-full border-0 border-gray-200 stroke-1"
                onPress={toggleVisible}
                isIconOnly
              >
                {visible ? (
                  <EyeIcon className="size-5 shrink-0 stroke-1 text-gray-500" />
                ) : (
                  <EyeOffIcon className="size-5 shrink-0 stroke-1 text-gray-500" />
                )}
              </Button>
            </div>
            <div className="_border-t-[0px] flex h-[35%] w-full items-center gap-3 border-gray-200 px-3 font-jet text-[10px] font-light tracking-[-0.015em] text-gray-600">
              <div className="_border-[0.33px] flex h-[18px] w-fit items-center space-x-1 rounded-full border-gray-400 bg-gray-700 pl-1 pr-1.5 text-[10px] text-gray-300">
                <ArrowUpCircleIcon className="size-3 shrink-0" />
                <p>by 30%</p>
              </div>
            </div>
          </div>
        </div>
        <div className="_border-l block h-full w-1/5 text-xs md:w-1/6">
          <div className="_border-b-[0.33px] flex h-[45%] items-center justify-end border-gray-100 p-1.5">
            <Button
              variant="ghost"
              className="h-full w-fit border-0"
              isIconOnly
            >
              <EllipsisHorizontalIcon className="size-8 text-gray-600" />
            </Button>
          </div>
          <div className="_border-b-[0.33px] flex h-[20%] w-full items-center justify-end border-gray-100">
            <div className="_border-[0.33px] flex h-[18px] w-fit items-center space-x-0.5 rounded-l-full border-gray-400 bg-gray-700 pl-1 pr-1.5 font-inst text-[10px] text-gray-300">
              <CheckBadgeIcon className="size-3 shrink-0" />
              <p>verified</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex h-[10%] w-full items-center font-inst text-[10px] font-light">
        <div className="flex h-full w-[calc((100vw-8px)/4)] items-center justify-center p-0.5"></div>
      </div>
      <div className="flex h-[10%] w-full items-center border-b-[0.33px] border-gray-100 text-xs">
        <div className="flex h-full w-[calc((100vw-8px)/4)] items-center justify-center border-gray-100"></div>
      </div>
      <div className="flex h-[30%] w-full text-gray-800">
        {actions.map((action) => (
          <div
            key={action.id}
            className="_border-r-[0.33px] flex w-[calc((100vw-8px)/4)] flex-col items-center justify-center border-gray-200 bg-gray-400/20 px-1.5 py-1 last:border-0"
          >
            <Button
              variant="ghost"
              className="-mb-[4px] flex h-fit w-full flex-col items-center justify-center border-0 p-1 hover:bg-gray-400"
              isIconOnly
              onPress={wallet_actions[action.id as number]}
            >
              <div className="">
                <action.icon className="size-6 stroke-1 text-gray-700 drop-shadow-lg" />
              </div>
              <div>
                <p className="font-jet text-[10px] font-light tracking-wide text-gray-800">
                  {action.label}
                </p>
              </div>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

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

// const NCard = ({ children }: PropsWithChildren) => (
//   <NeonGradientCard className="relative h-[200px] overflow-hidden border-0 bg-zinc-950">
//     {/* <FlickeringGrid
//       className="absolute inset-0 z-0 size-full [mask:radial-gradient(circle_at_top,#fff_420px,transparent_0)]"
//       squareSize={21}
//       gridGap={42}
//       color="#c7d2fe"
//       maxOpacity={0.5}
//       flickerChance={0.025}
//       height={800}
//       width={800}
//     /> */}
//     {children}
//   </NeonGradientCard>
// );
