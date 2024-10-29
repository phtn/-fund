"use client";
import {
  memo,
  type MemoExoticComponent,
  type PropsWithChildren,
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
import { type ClassName } from "../types";
import { Button } from "@nextui-org/react";
// import { useConvex } from "../ctx/convex";

export const AcctContent = (props: { uid: string }) => {
  const { list } = useCryptoCtx();

  const CryptoAssets = memo(() => <ListContent list={list} />);
  CryptoAssets.displayName = "CryptoAssets";

  const Qrcode = memo(() => (
    <VList>
      <ListHeader title="Your QR code" />
      <QrViewer id={props.uid} />
    </VList>
  ));
  Qrcode.displayName = "Qrcode";
  const [content, setContent] = useState<number | string>(0);

  const Contentcomp = useMemo(() => {
    const hlistcontent: MemoExoticComponent<
      (props: PropsWithChildren) => JSX.Element
    >[] = [CryptoAssets, Troves, Events, Shop, Qrcode, Feed];

    return hlistcontent[content as number] ?? null;
  }, [content, CryptoAssets, Qrcode]);

  return (
    <div
      className={cn(
        "h-screen w-full min-w-[385px] border-0 bg-gray-950 sm:w-1/2 md:min-w-[420px] md:p-6 lg:w-1/3",
        {
          "h-fit": !!list,
        },
      )}
    >
      <Wallet />
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
    <ProductList />
  </VList>
));
Troves.displayName = "Troves";

const Events = memo(() => (
  <VList>
    <ListHeader title="Events" />
    <ProductList />
  </VList>
));
Events.displayName = "Events";

const Shop = memo(() => (
  <VList>
    <ListHeader title="Shop" />
    <ProductList />
  </VList>
));
Shop.displayName = "Shop";

const Feed = memo(() => (
  <VList>
    <ListHeader title="Feed" />
    <ProductList />
  </VList>
));
Feed.displayName = "Feed";

const ProductCard = (props: { className?: ClassName }) => (
  <div
    className={cn(
      "flex h-[200px] w-full items-end justify-end rounded-xl p-4 text-gray-400",
      props.className,
    )}
  >
    <Button
      variant="shadow"
      size="lg"
      className="flex w-fit items-center gap-6"
    >
      <p className="font-jet">$200</p>
      <p className="font-inst font-semibold">Redeem</p>
    </Button>
  </div>
);

interface ProductData {
  id: string | number;
  className?: ClassName;
}
const products: ProductData[] = [
  { id: 1, className: "bg-gray-100" },
  { id: 2, className: "bg-gray-200" },
  { id: 3, className: "bg-gray-300" },
  { id: 4, className: "bg-gray-400" },
  { id: 5, className: "bg-gray-500" },
  { id: 6, className: "bg-gray-600" },
  { id: 7, className: "bg-gray-700" },
  { id: 8, className: "bg-gray-800" },
  { id: 9, className: "bg-gray-900" },
  { id: 10, className: "bg-gray-950" },
];

const ProductList = () => (
  <div className="flex h-fit w-full flex-col gap-4 overflow-auto p-3">
    {products.map((product) => (
      <ProductCard key={product.id} className={product.className} />
    ))}
  </div>
);
