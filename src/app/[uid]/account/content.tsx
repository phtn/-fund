"use client";
import { useConvex } from "@/app/ctx/convex";
import { InputArea, InputField, SmallImageFile } from "@/components/ui/input";
import {
  CalendarIcon,
  CheckBadgeIcon,
  CubeIcon,
  BuildingStorefrontIcon,
  MegaphoneIcon,
  DocumentTextIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Button, Image } from "@nextui-org/react";
import {
  type FormEvent,
  memo,
  type MemoExoticComponent,
  type PropsWithChildren,
  useCallback,
  useMemo,
  useState,
} from "react";
import { useFile } from "../hooks/useFile";
import { opts } from "@/utils/helpers";
import { CreateMerchantSchema } from "./schema";
import { getUID } from "@/app/actions";

export const AccountContent = () => {
  const { account } = useConvex();
  const [component, setComponent] = useState<number>(0);

  const handleSetupMerchantAccount = () => {
    setComponent(1);
  };

  const ContentComponent = useMemo(() => {
    const componentList: MemoExoticComponent<
      (props: PropsWithChildren) => JSX.Element
    >[] = [AccountInfo, SetupMerchant];

    return componentList[component] ?? null;
  }, [component]);

  return (
    <main className="h-fit bg-background pb-56">
      <section id="top-section" className="relative h-72 w-full">
        <div id="cover-photo" className="h-56 w-full bg-primary-200"></div>
        <div
          id="cover-bottom-padding"
          className="flex h-16 w-full items-center justify-end bg-background px-4"
        >
          <div className="flex h-10 w-fit items-center justify-end space-x-4">
            <Button
              variant="shadow"
              color="primary"
              size="md"
              className="font-bold"
            >
              Edit Profile
            </Button>
            {account?.is_merchant ? (
              <Button
                variant="shadow"
                color="secondary"
                size="md"
                className="font-bold"
              >
                Merchant Account
              </Button>
            ) : (
              <Button
                variant="bordered"
                color="warning"
                size="md"
                className="font-bold"
                onPress={handleSetupMerchantAccount}
              >
                Setup Merchant Account
              </Button>
            )}
          </div>
        </div>
        <div
          id="user-pfp"
          className="absolute bottom-0 mx-10 size-32 rounded-full bg-background p-1"
        >
          <div className="flex size-full items-center justify-center overflow-clip rounded-full bg-primary-400">
            <Image
              alt="user-pfp"
              src={account?.photo_url}
              width={124}
              height={124}
            />
          </div>
        </div>
      </section>
      <AccountSummary
        name={account?.name}
        uid={account?.uid}
        verified={account?.verified}
      />
      <div className="pb-24">
        {ContentComponent ? <ContentComponent /> : null}
      </div>
    </main>
  );
};

interface AccountDetailProps {
  name: string | undefined;
  uid: string | undefined;
  verified: boolean | undefined;
}
const AccountSummary = (props: AccountDetailProps) => {
  return (
    <div className="h-32 w-full p-6">
      <div className="h-full w-full p-6">
        <div className="flex items-center space-x-4 py-2">
          <p className="text-lg font-bold">{props.name}</p>
          <Button
            variant="bordered"
            color="secondary"
            size="sm"
            className="space-x-0.5"
          >
            <CheckBadgeIcon className="size-4 text-foreground" />
            <p className="text-foreground">
              {props.verified ? "Verified" : "Get verified"}
            </p>
          </Button>
        </div>
        <div className="font-jet text-xs">@{props.uid}</div>
      </div>
    </div>
  );
};

const AccountInfoComponent = () => {
  return (
    <div className="h-full w-full p-6">
      <div className="flex flex-col space-y-4">
        <div className="text-lg font-bold">Account</div>
        <div className="text-sm">
          Your account is your gateway to the world of Convex. Here you can
          manage your profile, view your activity, and more.
        </div>

        <Button
          variant="bordered"
          color="secondary"
          size="md"
          className="font-bold"
        >
          View Activity
        </Button>
      </div>
    </div>
  );
};
const AccountInfo = memo(AccountInfoComponent);

const SetupMerchantComponent = () => {
  const { handleFileChange, imageData, clearFile, inputRef, selectedFile } =
    useFile();
  const { createMerchant, generateLogoUrl } = useConvex();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const postUrl = await generateLogoUrl();

    const result = (
      await fetch(postUrl, {
        method: "POST",
        body: selectedFile,
        headers: {
          "Content-Type": selectedFile?.type ?? "image/png",
        },
      })
    ).json() as Promise<{ storageId: string }>;

    const storageId = (await result).storageId;

    const uid = await getUID();
    const formData = new FormData(e.currentTarget);
    const validatedFields = CreateMerchantSchema.safeParse({
      merchant_name: formData.get("merchant_name"),
      category: formData.get("category"),
      year_opened: formData.get("year_opened"),
      slogan: formData.get("slogan"),
      mission_statement: formData.get("mission_statement"),
      merchant_logo: storageId,
    });

    if (!validatedFields.success) {
      await createMerchant({ uid: uid!, ...validatedFields });
    }
  };

  const LogoOptions = useCallback(() => {
    const withImage = typeof imageData !== "undefined";
    const options = opts(
      <div className="group relative size-24 cursor-pointer overflow-hidden rounded-md">
        <Image width={96} height={96} src={imageData} alt="logo" />
        <Button
          isIconOnly
          size="sm"
          color="primary"
          variant={`solid`}
          onPress={clearFile}
          className="absolute right-1 top-1 z-50 hidden size-6 items-center rounded-full border group-hover:flex"
        >
          <XMarkIcon className={"size-4 text-background"} />
        </Button>
      </div>,

      <SmallImageFile
        ref={inputRef}
        accept="image/*"
        placeholder="add logo"
        onChange={handleFileChange}
      />,
    );
    return <>{options.get(withImage)}</>;
  }, [handleFileChange, imageData, clearFile, inputRef]);

  return (
    <div className="h-fit w-full p-6">
      <div className="flex flex-col space-y-4 rounded-2xl border-[0.33px] border-primary-100 bg-primary-50 p-6">
        <section className="flex items-start justify-between">
          <div className="w-1/3 space-y-2">
            <div className="text-xl font-bold">Setup Merchant Account</div>
            <div className="text-sm">
              You can setup your merchant account to start posting products,
              services, and events.
            </div>
          </div>
          <div className="flex w-fit items-center justify-center">
            <LogoOptions />
          </div>
        </section>

        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField
            name="merchant_name"
            icon={BuildingStorefrontIcon}
            placeholder="Enter your business name"
          />
          <div className="flex w-full items-center justify-center space-x-6">
            <InputField
              name="category"
              icon={CubeIcon}
              placeholder="Category / Industry"
            />
            <InputField
              name="year_opened"
              icon={CalendarIcon}
              placeholder="In business since what year"
            />
          </div>
          <InputArea
            name="slogan"
            icon={MegaphoneIcon}
            label="What's your business slogan"
          />
          <InputArea
            name="mission_statement"
            icon={DocumentTextIcon}
            label="Your business mission statement"
          />
          <div className="flex h-16 w-full items-end justify-end">
            <Button
              variant="shadow"
              color="primary"
              size="md"
              className="w-fit font-bold"
              type="submit"
            >
              Create Merchant Account
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

const SetupMerchant = memo(SetupMerchantComponent);
