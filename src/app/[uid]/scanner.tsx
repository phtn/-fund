import { Scanner } from "@yudiel/react-qr-scanner";
import { useConvex } from "../ctx/convex";
import { onSuccess } from "../ctx/toast";

export const ScanCode = () => {
  const { transfer } = useConvex();
  const handleTransfer = (to: string, amount: string | undefined) =>
    transfer(to, Number(amount));
  return (
    <Scanner
      onScan={async (data) => {
        const rawValue = data?.[0]?.rawValue;
        const amount = rawValue?.split("--")[1];
        const to = rawValue?.split("--")[2];
        if (!to) return;
        await handleTransfer(to, amount);
        onSuccess(`Sent ₱${amount}`);
      }}
    />
  );
};
