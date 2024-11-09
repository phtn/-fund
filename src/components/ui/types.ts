import type { HTMLProps } from "react";
import type { LucideIcon } from "lucide-react";
import type { HeartIcon } from "@heroicons/react/24/outline";

export type ClassName = HTMLProps<HTMLElement>["className"];
export type DualIcon = LucideIcon | typeof HeartIcon;

import type { AcademicCapIcon } from "@heroicons/react/24/solid";
import type { Column, ColumnDef } from "@tanstack/react-table";

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  loading: boolean;
}

export type HeroIcon = typeof AcademicCapIcon;

export type Option = {
  value: string;
  label: string;
  icon: LucideIcon | HeroIcon;
  color: string;
  cell: string;
};

export type ImageOption = {
  value: string;
  label: string;
  icon: LucideIcon | HeroIcon;
  color: string;
  cell: string;
  url: string;
  complete: string;
};

export interface DataTableFacetedFilterProps<TData, TValue> {
  column?: Column<TData, TValue>;
  title?: string;
  options?: Option[];
}
