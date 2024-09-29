import CryptoList from "@/components/ui/table";
import { type CryptoAsset } from "../ctx/crypto";

export const ListContent = (props: { list: CryptoAsset[] | undefined }) => {
  return (
    <div className="">
      <div className="flex h-[36px] w-full items-center px-4 text-xs text-zinc-300">
        Crypto Assets
      </div>

      <div className="w-screen overflow-auto">
        <CryptoList {...props} />
      </div>
    </div>
  );
};
