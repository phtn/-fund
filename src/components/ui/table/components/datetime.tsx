import { prettyDate } from "@/utils/helpers";
import type { CellContext, HeaderContext } from "@tanstack/react-table";
import { ColumnHeader } from "./column-header";
import moment from "moment";

/* eslint-disable react/display-name */
export const dateHeader =
  (title: string) =>
  <T,>({ column }: HeaderContext<T, unknown>) => (
    <ColumnHeader
      column={column}
      title={title}
      className="flex w-full justify-end"
    />
  );

export const dateCell =
  (prop: string) =>
  <T,>({ row }: CellContext<T, unknown>) => {
    const date: string | undefined = row.getValue(prop);
    if (!date)
      return (
        <div className="flex items-center justify-center text-[10px]">---</div>
      );
    const timestamp = prettyDate(date);

    const datetime = timestamp.split("at");
    return (
      <div className="flex w-[110px] justify-end">
        <div className="flex w-fit flex-col items-end justify-center -space-y-0.5">
          <p className="font-sans text-xs font-medium">{datetime[0]?.trim()}</p>
          <p className="text-[10px] tracking-wide">{datetime[1]?.trim()}</p>
        </div>
      </div>
    );
  };

export const dateCellMoment =
  (prop: string) =>
  <T,>({ row }: CellContext<T, unknown>) => {
    const date: string | undefined = row.getValue(prop);
    if (!date)
      return (
        <div className="flex items-center justify-center text-[10px]">---</div>
      );
    const timestamp = prettyDate(date);

    const datetime = timestamp.split("at");
    const timeAgo = moment(date).fromNow();
    return (
      <div className="flex w-full justify-end">
        <div className="flex w-fit flex-col items-end justify-center -space-y-0.5">
          <p className="font-sans text-xs font-medium">{timeAgo}</p>
          <p className="text-[10px] tracking-wide">{datetime[0]?.trim()}</p>
        </div>
      </div>
    );
  };
