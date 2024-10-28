"use client";
import {
  memo,
  type MemoExoticComponent,
  type PropsWithChildren,
  useEffect,
  useMemo,
  useState,
} from "react";
// import type { Doc } from "@vex/dataModel";
import { ListContent } from "./comp";
import { useCryptoCtx } from "../ctx/crypto";
import { cn } from "@/lib/utils";
import { HList, midbar_data } from "./midbar";
import { Wallet } from "./wallet";
import { QrViewer } from "./qrcode";
import { useAuth } from "@/lib/auth/useAuth";
// import { useConvex } from "../ctx/convex";

export const AcctContent = (props: { uid: string }) => {
  const { list } = useCryptoCtx();
  const { signOut } = useAuth();

  const CryptoAssets = memo(() => <ListContent list={list} />);
  CryptoAssets.displayName = "CryptoAssets";

  const Qrcode = memo(() => (
    <VList>
      <ListHeader title="Your QR code" />
      <QrViewer id={props.uid} />
    </VList>
  ));
  Qrcode.displayName = "Qrcode";
  const [value, setValue] = useState<number>(723983);
  const [content, setContent] = useState<number | string>(0);
  const [masked, setMasked] = useState<boolean | undefined>(undefined);

  const Contentcomp = useMemo(() => {
    const hlistcontent: MemoExoticComponent<
      (props: PropsWithChildren) => JSX.Element
    >[] = [CryptoAssets, Troves, Events, Shop, Qrcode, Feed];

    return hlistcontent[content as number] ?? null;
  }, [content, CryptoAssets, Qrcode]);

  useEffect(() => {
    if (content === 4) {
      return setMasked(true);
    }
    setMasked(undefined);
  }, [content]);

  const incr = () => {
    const earned = Math.floor(Math.random() * 30000);
    setValue((prev) => prev + earned);
  };

  // const { transfer } = useConvex();

  return (
    <div
      className={cn(
        "h-screen w-full min-w-[385px] border-0 bg-gray-950 sm:w-1/2 md:min-w-[420px] md:p-6 lg:w-1/3",
        {
          "h-fit": !!list,
        },
      )}
    >
      <div className="h-[210px] w-full border-0 px-2 pt-3">
        <Wallet
          balance={value}
          incr={incr}
          withdraw={signOut}
          masked={masked}
        />
      </div>
      <HList>
        <HList.Wrap>
          <HList.Render
            data={midbar_data}
            setter={setContent}
            contentid={content}
          />
        </HList.Wrap>
      </HList>
      <div className="h-[calc(100vh-284px)] w-full overflow-auto scroll-smooth">
        {Contentcomp ? <Contentcomp /> : null}
      </div>
    </div>
  );
};

const VList = ({ children }: PropsWithChildren) => (
  <div className="h-full w-full bg-gray-950 text-gray-400">{children}</div>
);

const ListHeader = (props: { title?: string }) => (
  <div className="flex h-[36px] w-full items-center px-4 text-xs text-zinc-300">
    {props.title}
  </div>
);

const Troves = memo(() => (
  <VList>
    <ListHeader title="Troves" />
  </VList>
));
Troves.displayName = "Troves";

const Events = memo(() => <VList>Events</VList>);
Events.displayName = "Events";

const Shop = memo(() => <VList>Shop</VList>);
Shop.displayName = "Shop";

const Feed = memo(() => <VList>Feed</VList>);
Feed.displayName = "Feed";
