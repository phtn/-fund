import {
  CubeIcon,
  NewspaperIcon,
  QrCodeIcon,
  RectangleStackIcon,
  ShoppingBagIcon,
  TicketIcon,
} from "@heroicons/react/24/solid";
import { Button } from "@nextui-org/react";
import {
  type Dispatch,
  type PropsWithChildren,
  type SetStateAction,
  type ReactElement,
  useMemo,
} from "react";
import { type DualIcon } from "../types";
import { cn } from "@/lib/utils";

const Component = ({ children }: PropsWithChildren) => (
  <div className="h-[64px]">
    <div className="_pt-2.5 w-full overflow-auto scroll-smooth">{children}</div>
  </div>
);

const HWrap = ({ children }: PropsWithChildren) => (
  <div className="flex w-fit items-center gap-2 pb-4 first:ml-4 last:mr-4 sm:w-1/3">
    {children}
  </div>
);

interface IconComponentProps {
  icon: DualIcon;
  id: number | string;
  setter: Dispatch<SetStateAction<string | number>>;
  contentid: number | string;
}

const IconComponent = (props: IconComponentProps) => {
  const { id, contentid, setter } = props;
  const handleSet = (id: string | number) => () => {
    setter(id);
  };
  const isActive = useMemo(() => id === contentid, [id, contentid]);

  return (
    <Button
      variant={isActive ? "shadow" : "ghost"}
      className={cn(
        "group w-fit border-0 duration-300 active:scale-[90%] md:hover:bg-gray-400",
        { "bg-gray-300 text-gray-900": isActive },
      )}
      onPress={handleSet(props.id)}
      isIconOnly
      size="sm"
    >
      <props.icon
        className={cn("size-6 text-gray-300 md:group-hover:text-gray-900", {
          "text-gray-900": isActive,
        })}
      />
    </Button>
  );
};

interface TRender {
  id: string | number;
  icon: DualIcon;
}

interface RenderProps<T> {
  data: T[];
  setter: Dispatch<SetStateAction<string | number>>;
  contentid: number | string;
}

const Render = <T extends TRender>({
  data,
  setter,
  contentid,
}: RenderProps<T>) =>
  data.map((item) => (
    <div
      key={item.id}
      className="flex h-[64px] w-[calc((100vw-56px)/5)] flex-shrink-0 items-center justify-center rounded-2xl sm:w-1/2"
    >
      <IconComponent
        icon={item.icon}
        id={item.id}
        contentid={contentid}
        setter={setter}
      />
    </div>
  ));

type THList = typeof Component & {
  Render: typeof Render;
  Wrap: typeof HWrap;
};

export const HList = Component as THList;
HList.Render = Render;
HList.Wrap = HWrap;

interface MidbarItem {
  id: number | string;
  icon: DualIcon;
  size: number;
  label?: string;
  content?: ReactElement;
}

export const midbar_data: MidbarItem[] = [
  {
    id: 0,
    icon: CubeIcon,
    size: 40,
    label: "Troves",
  },
  {
    id: 1,
    icon: RectangleStackIcon,
    size: 40,
    label: "Troves",
  },
  {
    id: 2,
    icon: TicketIcon,
    size: 40,
    label: "Events",
  },
  {
    id: 3,
    icon: ShoppingBagIcon,
    size: 56,
    label: "Shop",
  },
  {
    id: 4,
    icon: QrCodeIcon,
    size: 40,
    label: "Qrcode",
  },
  {
    id: 5,
    icon: NewspaperIcon,
    size: 40,
    label: "feed",
  },
];
