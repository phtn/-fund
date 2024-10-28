import CryptoList from "@/components/ui/table";
import { type CryptoAsset } from "../ctx/crypto";
import { HistoryIcon } from "lucide-react";

export const ListContent = (props: { list: CryptoAsset[] | undefined }) => {
  return (
    <div className="">
      <div className="flex h-[36px] w-full items-center justify-between px-4 font-inst text-xs font-light text-zinc-300">
        <div>Crypto Assets</div>
        <div className="flex items-center font-mono text-[10px] font-thin opacity-60">
          <HistoryIcon className="mr-1 size-2.5 stroke-1" />
          <p>updated 1 min ago</p>
        </div>
      </div>

      <div className="w-full overflow-auto">
        <CryptoList {...props} />
      </div>
    </div>
  );
};
