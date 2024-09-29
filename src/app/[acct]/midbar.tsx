import { Button, Image } from "@nextui-org/react";
import { type ReactElement } from "react";
import { Drawer } from "vaul";

export const History = () => {
  return (
    <Drawer.Root
      direction="bottom"
      setBackgroundColorOnScale
      shouldScaleBackground
      modal={false}
    >
      <Drawer.Trigger asChild>
        <Button
          variant="ghost"
          className="w-full rounded-full border-0 duration-300 hover:bg-transparent active:scale-[90%]"
          isIconOnly
        >
          <Image
            alt="history"
            src="/svg/history.svg"
            isBlurred
            width={56}
            height={56}
            className="aspect-square w-full shrink-0 drop-shadow-lg"
          />
        </Button>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="inset-0 bg-black/40" />
        <Drawer.Content className="fixed bottom-0 right-0 mt-24 flex h-[69%] w-full flex-col overflow-clip rounded-t-3xl bg-gradient-to-tr from-sky-50/30 via-cyan-50/25 to-teal-50/20 backdrop-blur-md">
          <div className="h-full flex-1 bg-gradient-to-t from-white/20 via-white/10 to-white/5 p-4 backdrop-blur-3xl">
            <Drawer.Handle />
            <div className="mx-auto max-w-md">
              <Drawer.Title className="mb-4 font-medium">
                Unstyled drawer for React.
              </Drawer.Title>
              <Drawer.Description className="mb-2 text-zinc-600">
                This component can be used as a replacement for a Dialog on
                mobile and tablet devices.
              </Drawer.Description>
              <p className="mb-8 text-zinc-600">
                It uses{" "}
                <a
                  href="https://www.radix-ui.com/docs/primitives/components/dialog"
                  className="underline"
                  target="_blank"
                >
                  Radix&rsquo;s Dialog primitive
                </a>{" "}
                under the hood and is inspired by{" "}
                <a
                  href="https://twitter.com/devongovett/status/1674470185783402496"
                  className="underline"
                  target="_blank"
                >
                  this tweet.
                </a>
              </p>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

const Sheet = (props: MidbarItem) => {
  const { label, icon, size } = props;
  return (
    <Drawer.Root
      direction="bottom"
      setBackgroundColorOnScale
      shouldScaleBackground
      modal={false}
    >
      <Drawer.Trigger asChild>
        <Button
          variant="ghost"
          className="w-fit border-0 bg-[#1e1e1e] duration-300 hover:bg-transparent active:scale-[90%]"
          isIconOnly
          size="lg"
        >
          <Image
            alt={label}
            src={icon}
            isBlurred
            width={label === "chats" ? 64 : size}
            height={size}
            className="w-fit shrink-0 bg-[#1f1f1f] backdrop-blur-lg"
          />
        </Button>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="inset-0 bg-black/40" />
        <Drawer.Content className="fixed bottom-0 right-0 mt-24 flex h-[69%] w-full flex-col overflow-clip rounded-t-3xl bg-gradient-to-tr from-sky-50/30 via-cyan-50/25 to-teal-50/20 backdrop-blur-md">
          <div className="h-full flex-1 bg-gradient-to-t from-white/20 via-white/10 to-white/5 p-4 backdrop-blur-3xl">
            <Drawer.Handle />
            <div className="mx-auto max-w-md">
              <Drawer.Title className="mb-4 font-medium">
                Unstyled drawer for React.
              </Drawer.Title>
              <Drawer.Description className="mb-2 text-zinc-600">
                This component can be used as a replacement for a Dialog on
                mobile and tablet devices.
              </Drawer.Description>
              <p className="mb-8 text-zinc-600">
                It uses{" "}
                <a
                  href="https://www.radix-ui.com/docs/primitives/components/dialog"
                  className="underline"
                  target="_blank"
                >
                  Radix&rsquo;s Dialog primitive
                </a>{" "}
                under the hood and is inspired by{" "}
                <a
                  href="https://twitter.com/devongovett/status/1674470185783402496"
                  className="underline"
                  target="_blank"
                >
                  this tweet.
                </a>
              </p>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

interface MidbarItem {
  id: number | string;
  icon: string;
  size: number;
  label?: string;
  content?: ReactElement;
}

const midbar_data: MidbarItem[] = [
  {
    id: 0,
    icon: "/svg/history.svg",
    size: 40,
    label: "history",
  },
  {
    id: 1,
    icon: "/svg/contacts.svg",
    size: 40,
    label: "contacts",
  },
  {
    id: 2,
    icon: "/svg/chat.svg",
    size: 56,
    label: "chat",
  },
  {
    id: 3,
    icon: "/svg/lightning.svg",
    size: 40,
    label: "lightning",
  },
];

export const Midbar = () => {
  return (
    <div className="h-[74px]">
      <div className="h-[10px] w-full text-xs">.</div>
      <div className="w-screen overflow-auto pr-4">
        <div className="flex w-full items-center space-x-2 pb-4 first:ml-4 last:mr-8">
          {midbar_data.map((item) => (
            <div
              key={item.id}
              className="_bg-zinc-800 flex h-[64px] w-[calc((100vw-52px)/3)] flex-shrink-0 snap-start items-center justify-center rounded-2xl"
            >
              <Sheet {...item} />
            </div>
          ))}

          <div className="bg h-[64px] w-[calc((100vw-52px)/3)] flex-shrink-0 snap-start rounded-2xl bg-zinc-800 drop-shadow-lg" />
          <div className="bg h-[64px] w-[calc((100vw-52px)/3)] flex-shrink-0 snap-start rounded-2xl bg-zinc-800 drop-shadow-lg" />
        </div>
      </div>
    </div>
  );
};
