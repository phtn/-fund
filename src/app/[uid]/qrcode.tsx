import { generateAccountNumber, opts } from "@/utils/helpers";
import { Button } from "@nextui-org/react";
import { ScanQrCode } from "lucide-react";
import type {
  CornerSquareType,
  DotType,
  DrawType,
  ErrorCorrectionLevel,
  Mode,
  Options,
  TypeNumber,
} from "qr-code-styling";
import QRCodeStyling from "qr-code-styling";
import { useCallback, useEffect, useRef, useState } from "react";
import { ScanCode } from "./scanner";

export const QrCodegen = (props: {
  code: string | undefined;
  amount: number;
}) => {
  const linkURL = `receiver--${props.amount}--${props.code}`;
  const [options] = useState<Options>({
    width: 256,
    height: 256,
    type: "svg" as DrawType,
    data: linkURL,
    image: "/svg/re-up_logo.svg",
    margin: 2,
    qrOptions: {
      typeNumber: 0 as TypeNumber,
      mode: "Byte" as Mode,
      errorCorrectionLevel: "M" as ErrorCorrectionLevel,
    },
    imageOptions: {
      hideBackgroundDots: true,
      imageSize: 0.5,
      margin: 0.5,
      crossOrigin: "anonymous",
    },
    dotsOptions: {
      color: "#09090b",
      gradient: {
        type: "radial", // 'linear'
        rotation: 0,
        colorStops: [
          { offset: 0.25, color: "#52525b" },
          { offset: 1, color: "#27272a" },
        ],
      },
      type: "dots" as DotType,
    },
    cornersSquareOptions: {
      color: "#18181b",
      type: "extra-rounded" as CornerSquareType,
      // gradient: {
      //   type: 'linear', // 'radial'
      //   rotation: 180,
      //   colorStops: [{ offset: 0, color: '#25456e' }, { offset: 1, color: '#4267b2' }]
      // },
    },
    cornersDotOptions: {
      color: "#0369a1",
      // type: "none" as CornerDotType,
      gradient: {
        type: "radial",
        rotation: 0,
        colorStops: [
          { offset: 0, color: "#475569" },
          { offset: 1, color: "#a1a1aa" },
        ],
      },
    },
    backgroundOptions: {
      color: "transparent",
      // gradient: {
      //   type: 'linear', // 'radial'
      //   rotation: 0,
      //   colorStops: [{ offset: 0, color: '#ededff' }, { offset: 1, color: '#e6e7ff' }]
      // },
    },
  });
  const [qrCode] = useState<QRCodeStyling>(new QRCodeStyling(options));
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      qrCode.append(ref.current);
    }
  }, [qrCode, ref]);

  useEffect(() => {
    if (!qrCode) return;
    qrCode.update(options);
  }, [qrCode, options]);

  return <div className="" ref={ref} />;
};

interface QrViewerProps {
  id: string | undefined;
}
export const QrViewer = ({ id }: QrViewerProps) => {
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState(100);

  const id_set = id + "--" + generateAccountNumber();

  const QrOptions = useCallback(() => {
    const options = opts(
      <ScanCode />,
      <QrCodegen code={id_set} amount={amount} />,
    );
    return <>{options.get(open)}</>;
  }, [id_set, open, amount]);

  const handleOpen = () => setOpen(true);
  const incrAmount = () => setAmount((prev) => prev + 100);

  return (
    <div className="flex w-full flex-col items-center justify-center pt-4">
      <div className="flex h-[256px] items-center justify-center rounded-xl bg-gray-200">
        <QrOptions />
      </div>
      <div className="flex h-12 items-center justify-center font-inter text-gray-200">
        ₱{amount.toFixed(2)}
      </div>
      <div className="flex items-center gap-5">
        <Button
          size="md"
          variant="shadow"
          className="flex bg-gray-200 font-inter text-xs text-black"
          onPress={incrAmount}
        >
          <p>Custom amount</p>
        </Button>
        <Button
          size="md"
          variant="shadow"
          className="flex bg-gray-200 font-inter text-xs text-black"
          onPress={handleOpen}
        >
          <p>Open scanner</p>
          <ScanQrCode className="size-6 stroke-1 text-gray-900" />
        </Button>
      </div>
    </div>
  );
};
