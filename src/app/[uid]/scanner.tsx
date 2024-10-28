import { Scanner } from "@yudiel/react-qr-scanner";
import { useConvex } from "../ctx/convex";

export const ScanCode = () => {
  const { transfer } = useConvex();
  const handleTransfer = (to: string) => transfer(to, 100);
  return (
    <Scanner
      onScan={async (data) => {
        const rawValue = data?.[0]?.rawValue;
        const to = rawValue?.split("--")[1];
        if (!to) return;
        await handleTransfer(to);
      }}
    />
  );
};
