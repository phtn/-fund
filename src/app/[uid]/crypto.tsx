import CryptoList from "@/components/ui/crypto-table";
import { type CryptoAsset } from "../ctx/crypto";
import { HistoryIcon } from "lucide-react";
import moment from "moment";

export const CryptoComponent = (props: { list: CryptoAsset[] | undefined }) => {
  const sometime_ago = moment(Date.now()).fromNow();
  return (
    <div className="">
      <div className="flex h-[36px] w-full items-center justify-between px-4 font-inst text-xs font-light text-zinc-300">
        <div>Crypto Assets</div>
        <div className="flex items-center font-mono text-[10px] font-light opacity-60">
          <HistoryIcon className="mr-1 size-2.5 stroke-1" />
          <p>updated {sometime_ago}</p>
        </div>
      </div>

      <div className="w-full overflow-auto">
        <CryptoList {...props} />
      </div>
    </div>
  );
};
