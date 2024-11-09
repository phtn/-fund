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
import { Button, Image, Link } from "@nextui-org/react";
import { type PropsWithChildren, useCallback, useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useConvex } from "../ctx/convex";
import { cn } from "@/lib/utils";
import { opts } from "@/utils/helpers";
import { useAuth } from "@/lib/auth/useAuth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown";
import { motion } from "framer-motion";

const Component = ({ children }: PropsWithChildren) => (
  <motion.div className="h-[210px] w-full border-0 px-2 pt-3">
    {children}
  </motion.div>
);

const Card = ({ children }: PropsWithChildren) => (
  <div className="h-full content-between overflow-hidden rounded-lg bg-primary-50">
    {children}
  </div>
);

const Top = ({ children }: PropsWithChildren) => (
  <div className="flex h-[50%] w-full">{children}</div>
);

const TopPrimary = ({ children }: PropsWithChildren) => (
  <div className="w-5/6">{children}</div>
);

const TopSecondary = ({ children }: PropsWithChildren) => (
  <div className="_border-l block h-full w-1/5 text-xs md:w-1/6">
    {children}
  </div>
);
const PrimaryLabel = ({ children }: PropsWithChildren) => (
  <div className="flex h-[33%] w-full items-end px-3.5 font-inst text-xs font-light text-gray-700">
    <p className="drop-shadow-md">{children}</p>
  </div>
);

const AccountBalance = ({ children }: PropsWithChildren) => (
  <div className="_border-b z-50 h-[67%] w-full font-inter text-3xl font-medium tracking-wider text-gray-900 drop-shadow-lg">
    {children}
  </div>
);

interface AccountUpdatesProps {
  icon: DualIcon;
  value: string | number;
} //props.value
const AccountUpdates = (props: AccountUpdatesProps) => {
  return (
    <div className="_border-t-[0px] flex h-[35%] w-full items-center gap-3 border-primary-200 px-3 font-jet text-[10px] font-light tracking-[-0.015em] text-primary-600">
      <div className="_border-[0.33px] flex h-[18px] w-fit items-center space-x-1 rounded-full border-primary-400 bg-primary-800 pl-1 pr-1.5 text-[10px] text-primary-300">
        <props.icon className="size-3 shrink-0" />
        <p>{}</p>
      </div>
    </div>
  );
};

interface OptionsMenuProps {
  signOut: VoidFunction;
  photo_url: string | undefined;
} //
const OptionsMenu = (props: OptionsMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <DropdownMenu onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild className="cursor-pointer">
        <EllipsisHorizontalIcon
          className={cn("size-8 rounded-lg text-primary-600", {
            "bg-primary-100": isOpen,
          })}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-fit py-2">
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link
              href="/dashboard/account"
              className="border-0 bg-transparent font-inst"
            >
              <section className="flex items-center space-x-3 font-inst text-sm font-medium tracking-tight">
                <Image
                  alt="user-pfp"
                  src={props.photo_url}
                  width={18}
                  height={18}
                />
                <p>Account</p>
              </section>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Button size="sm" className="border-0 bg-transparent font-inst">
              Transactions
            </Button>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Button
              size="sm"
              onPress={props.signOut}
              className="border-0 bg-transparent font-inst"
            >
              Sign out
            </Button>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const Options = (props: { photo_url: string | undefined }) => {
  const { signOut } = useAuth();
  return (
    <div
      className={cn(
        "flex h-[45%] items-center justify-end overflow-auto border-primary-100 p-1.5",
      )}
    >
      <OptionsMenu signOut={signOut} photo_url={props.photo_url} />
    </div>
  );
};

const Verified = () => (
  <div className="_border-b-[0.33px] flex h-[20%] w-full items-center justify-end border-primary-100">
    <div className="_border-[0.33px] flex h-[20px] w-fit items-center space-x-0.5 rounded-l-full border-primary-400 bg-amber-600/80 pl-1 pr-1.5 font-inst text-[10px] font-medium text-primary-50 backdrop-blur-xl">
      <CheckBadgeIcon className="size-3 shrink-0" />
      <p>verified</p>
    </div>
  </div>
);

const CardNumber = () => (
  <div className="flex h-[20%] w-full items-center border-b-[0.33px] border-gray-100 text-xs text-primary-800">
    <div className="flex h-full w-[calc((100vw-8px)/4)] items-center justify-center border-primary-100"></div>
  </div>
);

interface ActionbarProps {
  functions: (VoidFunction | undefined)[];
}
const ActionBar = ({ functions }: ActionbarProps) => (
  <div className="flex h-[30%] w-full text-primary-800">
    {actions.map((action) => (
      <div
        key={action.id}
        className="_border-r-[0.33px] flex w-[calc((100vw-8px)/4)] flex-col items-center justify-center border-gray-200 bg-primary-400/20 px-1.5 py-1 last:border-0"
      >
        <Button
          variant="flat"
          className="-mb-[4px] flex h-fit w-full flex-col items-center justify-center border-0 bg-transparent p-1 hover:bg-primary-800"
          isIconOnly
          onPress={functions[action.id as number]}
        >
          <div className="">
            <action.icon className="size-6 stroke-1 text-primary-900 drop-shadow-lg" />
          </div>
          <div>
            <p className="font-jet text-[10px] font-light tracking-wide text-primary-800">
              {action.label}
            </p>
          </div>
        </Button>
      </div>
    ))}
  </div>
);

const MaskedBalance = (props: { balance: number | undefined }) => (
  <p
    className={cn("text-primary-800", {
      "animate-pulse": !props.balance,
    })}
  >
    **********
  </p>
);

type TWallet = typeof Component & {
  Card: typeof Card;
  Top: typeof Top;
  TopPrimary: typeof TopPrimary;
  TopSecondary: typeof TopSecondary;
  PrimaryLabel: typeof PrimaryLabel;
  AccountBalance: typeof AccountBalance;
  AccountUpdates: typeof AccountUpdates;
  Options: typeof Options;
  Verified: typeof Verified;
  CardNumber: typeof CardNumber;
  ActionBar: typeof ActionBar;
};

export const W: TWallet = Object.assign(Component, {
  Card,
  Top,
  TopPrimary,
  TopSecondary,
  PrimaryLabel,
  AccountBalance,
  AccountUpdates,
  Options,
  Verified,
  CardNumber,
  ActionBar,
});

export const Wallet = () => {
  const [visible, setVisible] = useState(true);
  const toggleVisible = () => setVisible(!visible);

  const VisibleIconOptions = useCallback(() => {
    const options = opts(
      <EyeIcon className="size-5 shrink-0 stroke-1 text-gray-500" />,
      <EyeSlashIcon className="size-5 shrink-0 stroke-1 text-gray-500" />,
    );
    return <>{options.get(visible)}</>;
  }, [visible]);

  const { account } = useConvex();

  // const wallet_actions: (VoidFunction | undefined)[] = [
  //   undefined,
  //   undefined,
  //   undefined,
  //   undefined,
  // ];

  return (
    <W>
      <W.Card>
        <W.Top>
          <W.TopPrimary>
            <W.PrimaryLabel>Available balance</W.PrimaryLabel>
            <W.AccountBalance>
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
                  <MaskedBalance balance={account?.balance} />
                )}
                <Button
                  variant="ghost"
                  className="h-fit rounded-full border-0 border-gray-200 stroke-1"
                  onPress={toggleVisible}
                  isIconOnly
                >
                  <VisibleIconOptions />
                </Button>
              </div>

              <W.AccountUpdates icon={ArrowUpCircleIcon} value={"30"} />
            </W.AccountBalance>
          </W.TopPrimary>
          <W.TopSecondary>
            <W.Options photo_url={account?.photo_url} />
            <W.Verified />
          </W.TopSecondary>
        </W.Top>
        <W.CardNumber></W.CardNumber>
        {/* <W.ActionBar functions={wallet_actions} /> */}
      </W.Card>
    </W>
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
