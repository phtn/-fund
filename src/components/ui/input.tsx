import {
  AtSignIcon,
  BanknoteIcon,
  CoinsIcon,
  FileSpreadsheetIcon,
  FileTextIcon,
  LockKeyholeIcon,
  type LucideIcon,
  SmartphoneIcon,
  SquareUserIcon,
  UploadCloudIcon,
  UserCircle2Icon,
} from "lucide-react";
import tw from "tailwind-styled-components";
import type { DualIcon } from "@/components/ui/types";
import {
  ArrowDownLeftIcon,
  EyeIcon,
  EyeSlashIcon,
  FolderOpenIcon,
  InformationCircleIcon,
  LockClosedIcon,
  LockOpenIcon,
  PhotoIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { opts, toggleState } from "@/utils/helpers";
import { Button } from "./button";
import {
  useState,
  useCallback,
  type InputHTMLAttributes,
  type ChangeEvent,
  forwardRef,
  type TextareaHTMLAttributes,
} from "react";
import { TheTip } from "./just-the-tip";
import { cn } from "@/lib/utils";
import { Image } from "@nextui-org/react";

export type InputProps = InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-slate-400 bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

// MODERN INPUT
//
export type IconName =
  | "user"
  | "name"
  | "file"
  | "reader"
  | "email"
  | "mobile"
  | "money"
  | "tokens"
  | "upload"
  | "password";

interface IconPrefix {
  name: string;
  icon: DualIcon;
}

export const IconPrefixes: IconPrefix[] = [
  { name: "user", icon: UserCircle2Icon },
  { name: "name", icon: SquareUserIcon },
  { name: "file", icon: FileTextIcon },
  { name: "reader", icon: FileSpreadsheetIcon },
  { name: "email", icon: AtSignIcon },
  { name: "mobile", icon: SmartphoneIcon },
  { name: "money", icon: BanknoteIcon },
  { name: "tokens", icon: CoinsIcon },
  { name: "upload", icon: UploadCloudIcon },
  { name: "password", icon: LockKeyholeIcon },
];

export const InputField = forwardRef<HTMLInputElement, InputProps & IconPrefix>(
  ({ className, type, ...props }, ref) => {
    const [visible, setVisible] = useState(false);
    const toggleVisible = () => toggleState(setVisible);

    const IconOptions = useCallback(() => {
      const options = opts(
        <EyeIcon className="size-[16px] text-cyan-600" />,
        <EyeSlashIcon className="size-[16px]" />,
      );
      return (
        <Button
          variant={`ghost`}
          className="text-neutral-500 hover:text-cyan-600"
          onClick={toggleVisible}
        >
          {options.get(visible)}
        </Button>
      );
    }, [visible]);

    const LockOptions = useCallback(() => {
      const options = opts(
        <LockOpenIcon className="size-[16px] text-cyan-600" />,
        <LockClosedIcon className="size-[16px]" />,
      );
      return (
        <Button
          variant={`ghost`}
          className="mr-[10px] p-0 text-neutral-500 hover:text-cyan-600"
          onClick={toggleVisible}
        >
          {options.get(visible)}
        </Button>
      );
    }, [visible]);

    return (
      <div
        className={cn(
          "flex h-[56px] w-full items-center rounded-xl border-[0.33px] border-neutral-300 bg-background pl-3 focus-within:border focus-within:border-cyan-500 focus-within:ring-offset-0 active:border-neutral-300",
          className,
        )}
      >
        {type === "password" ? (
          <LockOptions />
        ) : (
          <props.icon className="text-clay mr-[10px] h-[16px] w-[16px]" />
        )}

        <input
          {...props}
          type={visible ? "text" : type}
          ref={ref}
          className="placeholder:text-clay/50 h-[44px] w-full rounded-lg bg-transparent px-2 font-sans text-[14px] font-normal tracking-normal focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
        />
        {type === "password" ? <IconOptions /> : null}
      </div>
    );
  },
);
InputField.displayName = "InputField";

export const InputFieldX = forwardRef<
  HTMLInputElement,
  InputProps & { icon?: DualIcon; label?: string }
>(({ className, type, label, ...props }, ref) => {
  const fieldLabel = label?.split("@");
  return (
    <div>
      <div className="flex items-center space-x-4 p-1 font-mono text-[11px] tracking-[0.6px]">
        <p className="whitespace-nowrap opacity-50">{fieldLabel?.[0]}</p>
        <div>
          {fieldLabel?.[1] ? (
            <TheTip tip="required" icon={InformationCircleIcon}>
              <ArrowDownLeftIcon className="size-3 text-red-500" />
            </TheTip>
          ) : null}
        </div>
      </div>
      <div
        className={cn(
          "flex h-[50px] items-center rounded-lg border-[0.33px] border-neutral-400/80 bg-white pl-3 pr-[3px] ring-offset-blue-400 focus-within:ring-1 focus-within:ring-ring focus-within:ring-offset-1",
          className,
        )}
      >
        {props?.icon ? (
          <props.icon className="text-clay mr-[10px] size-5 stroke-1 dark:text-orange-200/80" />
        ) : null}

        <div className="relative w-full">
          <input
            {...props}
            type={type}
            ref={ref}
            className="h-[44px] w-full rounded-lg px-2 font-sans text-[14px] tracking-tight placeholder:font-sans placeholder:tracking-tighter placeholder:text-neutral-500/60 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>
      </div>
    </div>
  );
});
InputFieldX.displayName = "InputFieldX";

export const InputFieldName = forwardRef<
  HTMLInputElement,
  InputProps &
    Omit<IconPrefix, "name"> & { label: string | undefined; index: number }
>(({ className, type, label, index, ...props }, ref) => {
  return (
    <div
      className={cn(
        "border-ash flex h-16 items-center rounded-xl border-[0.0px] bg-white pr-[3px] ring-offset-blue-400 focus-within:ring-1 focus-within:ring-ring focus-within:ring-offset-1 dark:bg-indigo-200/20",
        className,
      )}
    >
      <p className="text-clay/60 mx-4 text-xs">{index + 1}</p>
      <span className="text-clay w-64 text-xs font-medium uppercase leading-none">
        {label}
      </span>

      <input
        {...props}
        type={type}
        ref={ref}
        className="shadow-i-br-lg/80 border-ash bg-paper m-1 w-full rounded-lg border-0 p-3 font-mono text-[15px] uppercase tracking-widest text-zinc-600 placeholder:text-slate-400 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
      />
    </div>
  );
});
InputFieldName.displayName = "InputFieldName";

export const InputFile = forwardRef<HTMLInputElement, InputProps & IconPrefix>(
  ({ className, type, ...props }, ref) => {
    return (
      <div
        className={cn(
          "border-ash flex w-[calc(100vw-56px)] flex-col items-center justify-center rounded-lg border border-dashed bg-white shadow-inner ring-offset-blue-400 focus-within:ring-1 focus-within:ring-ring focus-within:ring-offset-1 md:h-[200px] md:justify-end",
          className,
        )}
      >
        <div className="absolute flex flex-col items-center justify-center">
          <div className="flex items-center justify-center">
            {/* <div className="size-[32px] bg-[url('/svg/sky-upload.svg')] bg-cover md:mr-[16px] md:size-[48px] portrait:size-[24px]" /> */}
            <div className="text-md">
              <p className="text-coal max-w-[20ch]">
                <span className="text-coal font-semibold">Click</span> here to
                select a file or{" "}
                <span className="text-coal font-semibold">drag and drop</span>{" "}
                it here.
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center space-x-4 md:pb-2 md:pt-24">
            <span className="text-clay/80 text-xs italic">
              Supported formats:
            </span>

            <span className="text-clay py-1 text-[12px]">JPG, PNG or PDF</span>
          </div>
        </div>

        <input
          {...props}
          type={type}
          ref={ref}
          className="w-full text-[15px] opacity-0 placeholder:text-slate-400 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:h-[200px] md:py-3"
        />
      </div>
    );
  },
);
InputFile.displayName = "InputFile";

export const InputLight = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-full w-full rounded-lg border-[0.33px] border-primary-300 bg-primary-100 px-3 py-1.5 text-xs ring-primary-700/40 ring-offset-primary-700 transition-all duration-300 ease-in-out placeholder:text-foreground/50 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:focus-visible:ring-1 md:focus-visible:ring-offset-1",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
InputLight.displayName = "InputLight";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  icon?: DualIcon;
}
export const InputArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, label, ...props }, ref) => {
    return (
      <div className="">
        <div className="flex h-10 items-center space-x-2 px-1">
          {props.icon ? (
            <props.icon className="size-4 fill-primary-50 stroke-1 text-foreground" />
          ) : null}
          <p className="text-sm font-medium text-primary-700">{label}</p>
        </div>
        <textarea
          className={cn(
            "flex h-[56px] w-full rounded-xl border-[0.33px] border-primary-300 bg-background px-3 py-1.5 text-sm ring-0 transition-all duration-300 ease-in-out placeholder:text-foreground/50 focus-within:border focus-within:border-cyan-500 focus-visible:outline-0 disabled:cursor-not-allowed disabled:opacity-50",
            className,
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  },
);
InputArea.displayName = "InputArea";

export const InputCode = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => (
    <CodeInput type={type} className={cn(className)} ref={ref} {...props} />
  ),
);

export const CodeInput = tw.input`
  flex h-14 w-full px-3 py-2 bg-[#EFEFEF]/50
  border-[0.33px] border-clay/60 rounded-xl
  placeholder:text-neutral-400 placeholder:tracking-tight placeholder:lowercase placeholder:font-normal
  text-[16px] tracking-widest text-center font-medium font-mono
  transition-all duration-300 ease-in-out uppercase
  ring-offset-sky-300 ring-neutral-100 focus-visible:outline-none

  disabled:cursor-not-allowed disabled:opacity-50 md:focus-visible:ring-1 md:focus-visible:ring-offset-1
  `;
InputCode.displayName = "InputCode";

export const ImageFile = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        className={cn(
          "relative flex w-full cursor-pointer flex-col items-center justify-center px-4 portrait:justify-center",
          className,
        )}
      >
        <div className="border-dyan/30 flex h-[450px] w-full flex-col items-center justify-center space-y-2 rounded-lg border-[0.33px] bg-gradient-to-r from-gray-200 via-gray-300 to-gray-400 p-2 text-gray-500">
          <PhotoIcon className="size-24 stroke-[0.33px]" />
          <div className="flex items-center space-x-2 text-xs font-semibold tracking-tighter">
            <p className="text-coal">Browse files</p>
            <FolderOpenIcon className="size-4 stroke-1" />
          </div>
        </div>

        <input
          ref={ref}
          {...props}
          type={`file`}
          accept={`image/*,application/pdf`}
          className="absolute z-50 flex h-[400px] w-full border bg-transparent text-[15px] opacity-0 placeholder:text-slate-400 focus-visible:outline-none"
        />
      </div>
    );
  },
);

ImageFile.displayName = "ImageFile";

type FieldProps = {
  icon?: LucideIcon;
  label?: string;
  isValid?: boolean;
};

export const InputFieldPayments = forwardRef<
  HTMLInputElement,
  InputProps & FieldProps
>(({ className, type, label, ...props }, ref) => {
  return (
    <div
      className={cn(
        "flex h-[64px] items-center overflow-clip rounded-[5px]",
        className,
      )}
    >
      <div className="">
        {props.icon ? (
          <props.icon
            className="size-5 w-14 text-neutral-50"
            strokeWidth={1.5}
          />
        ) : (
          <div className="text-dyan size-5 w-14" />
        )}
      </div>
      <div className="flex h-full w-full flex-col space-y-0 bg-white">
        <InputLabel label={label} />
        <input
          {...props}
          type={type}
          ref={ref}
          className="border-ash/50 flex h-full w-full items-center border-l-[0.33px] bg-white px-3 pb-1.5 pt-0.5 font-sans text-sm font-medium tracking-tight text-cyan-600 placeholder:text-neutral-500/60 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
        />
      </div>
    </div>
  );
});
InputFieldPayments.displayName = "InputFieldPayments";

export const InputFieldMain = forwardRef<
  HTMLInputElement,
  InputProps & FieldProps
>(({ className, type, label, ...props }, ref) => {
  return (
    <div
      className={cn(
        "flex h-[64px] items-center overflow-clip rounded-[5px]",
        className,
      )}
    >
      <div className="">
        {props.icon ? (
          <props.icon
            className="size-5 w-14 text-neutral-50"
            strokeWidth={1.5}
          />
        ) : (
          <div className="text-dyan size-5 w-14" />
        )}
      </div>
      <div className="flex h-full w-full flex-col space-y-0 bg-white">
        <InputLabel label={label} />
        <input
          {...props}
          type={type}
          ref={ref}
          className="border-ash/50 flex h-full w-full items-center border-l-[0.33px] bg-white px-3 pb-1.5 pt-0.5 font-sans text-sm font-medium tracking-tight text-cyan-600 placeholder:text-neutral-500/60 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
        />
      </div>
    </div>
  );
});
InputFieldMain.displayName = "InputFieldMail";

export const InputFieldAmount = forwardRef<
  HTMLInputElement,
  InputProps &
    FieldProps & { onChange: (e: ChangeEvent<HTMLInputElement>) => void }
>(({ className, label, onChange, ...props }, ref) => {
  const withReq = label?.split("@") ?? ["", ""];
  return (
    <div
      className={cn(
        "flex h-[64px] items-center overflow-clip rounded-[5px]",
        className,
      )}
    >
      {props.icon ? (
        <props.icon className="text-dyan size-5 w-14" strokeWidth={1.5} />
      ) : (
        <div className="text-dyan size-5 w-14" />
      )}

      <div className="flex h-full w-full flex-col space-y-0 bg-white/90">
        <p className="border-ash/50 text-dyan/70 flex w-full items-start justify-end whitespace-nowrap border-l-[0.33px] pl-3 pt-1 font-mono text-[10px] font-normal uppercase tracking-widest">
          {withReq[0] ?? label}
          {withReq[1] ? (
            <span
              className={cn(
                withReq[1] ? "mx-2" : "",
                "flex h-fit items-end whitespace-nowrap rounded-full bg-amber-700/10 font-mono font-normal lowercase tracking-wider text-orange-600/80",
              )}
            >
              <ArrowDownLeftIcon className="size-3" />
            </span>
          ) : null}
        </p>
        <input
          {...props}
          ref={ref}
          type="text"
          placeholder="0.00"
          onChange={onChange}
          // className="flex h-full w-full items-center border-l-[0.33px] border-ash/50 bg-white/90 px-3 pb-1.5 pt-0.5 font-sans text-[16px] font-medium tracking-tighter text-dyan placeholder:text-slate-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
          className="border-ash/50 text-dyan flex h-full w-full border-l-[0.33px] px-3 text-right font-sans text-[20px] font-semibold tracking-tight placeholder:text-slate-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
        />
      </div>
    </div>
  );
});
InputFieldAmount.displayName = "InputFieldAmount";

type InputLabelProps = {
  label: string | undefined;
};
export const InputLabel = ({ label }: InputLabelProps) => {
  const withReq = label?.split("@") ?? ["", ""];
  return (
    <p className="border-ash/50 text-coal/60 flex w-full items-center whitespace-nowrap border-l-[0.33px] pl-3 pt-1 font-mono text-[10px] font-medium uppercase tracking-widest">
      {withReq[0] ?? label}
      {withReq[1] ? (
        <span
          className={cn(
            withReq[1] ? "mx-2" : "",
            "flex h-fit items-end whitespace-nowrap rounded-full bg-amber-700/10 font-mono font-normal lowercase tracking-wider text-orange-600/80",
          )}
        >
          <ArrowDownLeftIcon className="size-4" />
        </span>
      ) : null}
    </p>
  );
};

export const SmallImageFile = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        className={cn(
          "relative flex size-24 flex-col items-center justify-center space-y-1 rounded-xl border border-dashed border-primary-300 bg-background",
          className,
        )}
      >
        <PhotoIcon className="size-6 text-primary-400" />
        <p className="font-jet text-xs opacity-80">{props.placeholder}</p>

        <input
          {...props}
          ref={ref}
          type={`file`}
          className="absolute z-50 flex size-24 w-full cursor-pointer border bg-transparent opacity-0 focus-visible:outline-none"
        />
      </div>
    );
  },
);

SmallImageFile.displayName = "SmallImageFile";

export const SmallImageViewer = (props: {
  // imageData: string | undefined;
  alt?: string;
}) => (
  <div className="group relative size-24 overflow-hidden rounded-xl">
    <Image
      id="small-image-file"
      alt={props.alt}
      // src={props.imageData}
      width={96}
      height={96}
      isBlurred
      className="rounded-none"
    >
      click
    </Image>
    <Button variant={`ghost`} color="primary">
      <XMarkIcon
        className={cn("hidden size-4 text-foreground group-hover:block")}
      />
    </Button>
  </div>
);
