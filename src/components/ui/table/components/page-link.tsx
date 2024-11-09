import type { CellContext, HeaderContext } from "@tanstack/react-table";
import Link from "next/link";
import { ColumnHeader } from "./column-header";
import { TheTip } from "@/components/ui/just-the-tip";
import { DocumentTextIcon, PencilIcon } from "@heroicons/react/24/solid";
import { useCallback } from "react";
import { opts } from "@/utils/helpers";
// import { useAuthState } from "react-firebase-hooks/auth";
// import { auth } from "@/libs/db";
import { type DualIcon } from "@/components/ui/types";

type PageLinkProps = {
  primaryRoute: string;
  secondaryRoute?: string;
  extraKey?: string;
  id: string;
  icon: DualIcon;
  secondaryIcon?: DualIcon;
  tip?: string;
};

/* eslint-disable react/display-name */
export const pagelinkHeader =
  (props: { icon: DualIcon }) =>
  <T,>({ column }: HeaderContext<T, unknown>) => (
    <ColumnHeader
      column={column}
      element={<props.icon className="size-4 stroke-1 text-neutral-600/90" />}
      className="flex w-full justify-center"
    />
  );

/* eslint-disable react/display-name */
export const pagelinkCell =
  (props: PageLinkProps) =>
  <T,>({ row }: CellContext<T, unknown>) => {
    const id: string | undefined = row.getValue(props.id);
    // const agentId: string | undefined =
    // props?.extraKey && row.getValue(props.extraKey);
    // const [user] = useAuthState(auth);

    const PageRouteOptions = useCallback(() => {
      // const isOwner = !!user?.uid && user.uid === agentId;
      const isOwner = true;
      const options = opts(
        <TheTip tip={`Edit`} icon={PencilIcon}>
          <div className="group flex w-full items-center justify-center group-hover:scale-[110%]">
            <Link
              href={`/${props.primaryRoute}/${id}`}
              className="flex w-full justify-center"
            >
              {isOwner ? (
                <props.icon className="size-4 stroke-1 text-cyan-700" />
              ) : props.secondaryIcon ? (
                <props.secondaryIcon className="size-4 stroke-1 text-cyan-700" />
              ) : null}
            </Link>
          </div>
        </TheTip>,
        <TheTip tip={"View"} icon={DocumentTextIcon}>
          <div className="group flex w-full items-center justify-center group-hover:scale-[110%]">
            <Link
              href={`/${props.secondaryRoute}/${id}`}
              className="flex w-full justify-center"
            >
              {props.secondaryIcon ? (
                <props.secondaryIcon className="size-4 stroke-1 text-cyan-700" />
              ) : (
                <props.icon className="size-4 stroke-1 text-cyan-700" />
              )}
            </Link>
          </div>
        </TheTip>,
      );

      return <>{options.get(isOwner)}</>;
    }, [id]);

    return <PageRouteOptions />;
  };
