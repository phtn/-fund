"use client";

import { createColumnHelper } from "@tanstack/react-table";

import { pagelinkCell, pagelinkHeader } from "./page-link";
import { dateCellMoment, dateHeader } from "./datetime";
import { statuses } from "@/components/ui/table/statuses/request";
import {
  nameCell,
  nameCellHeaderWide,
  nameCellID,
  nameCellWithSubtext,
  nameHeader,
  statusCell,
} from "./name-cells";
import { DocumentTextIcon } from "@heroicons/react/24/outline";
import { FilePenIcon, PencilLineIcon } from "lucide-react";

import type schema from "@schema";
type C = typeof schema.tables.merchant.validator.fieldPaths;

const columnHelper = createColumnHelper();

export const columns = [
  columnHelper.accessor("uid" as C, {
    header: pagelinkHeader({ icon: FilePenIcon }),
    cell: pagelinkCell({
      icon: PencilLineIcon,
      secondaryIcon: DocumentTextIcon,
      primaryRoute: "account/request",
      secondaryRoute: "account/request-viewer",
      extraKey: "agentId",
      id: "id",
    }),
    enableSorting: false,
  }),
  columnHelper.accessor("id", {
    header: nameHeader("Ref", true),
    cell: nameCellID({ name: "Request ref#" }),
    enableSorting: false,
  }),
  columnHelper.accessor("assuredName", {
    header: nameHeader("Assured Name"),
    cell: nameCell("assuredName"),
    enableHiding: true,
    enableSorting: false,
  }),
  columnHelper.accessor("agentId", {
    header: nameHeader("Agent Id"),
    cell: nameCell("agentId"),
    enableHiding: true,
    enableSorting: false,
  }),
  columnHelper.accessor("agentName", {
    header: nameHeader("Agent"),
    cell: nameCellWithSubtext({
      primaryKey: "agentName",
      secondaryKey: "agentId",
    }),
    enableSorting: false,
    enableHiding: true,
  }),
  columnHelper.accessor("underwriter", {
    header: nameHeader("Underwriter"),
    cell: nameCell("Underwriter"),
    enableSorting: false,
    enableHiding: true,
  }),
  columnHelper.accessor("updatedAt", {
    header: dateHeader("Last update"),
    cell: dateCellMoment("Updated"),
    enableSorting: true,
    enableHiding: true,
  }),
  columnHelper.accessor("status", {
    header: nameCellHeaderWide("Status"),
    cell: statusCell({
      id: "status",
      schema: statuses,
      url: "account/requests",
    }),
    filterFn: (row, value, selectedValues: string[]) =>
      selectedValues.includes(String(row.getValue(value))),
    enableSorting: false,
    enableHiding: true,
  }),
];

// export const column = [
//   {
//     id: "editAndView",
//     accessorKey: "id",
//     header: pagelinkHeader({ icon: FilePenIcon }),
//     cell: pagelinkCell({
//       icon: PencilLineIcon,
//       secondaryIcon: DocumentTextIcon,
//       primaryRoute: "account/request",
//       secondaryRoute: "account/request-viewer",
//       extraKey: "agentId",
//       id: "id",
//     }),
//     enableSorting: false,
//   },
//   {
//     id: "id",
//     accessorKey: "id",
//     header: nameHeader("Ref", true),
//     cell: nameCellID({ name: "Request ref#" }),
//     enableSorting: false,
//   },
//   {
//     id: "assuredName",
//     accessorKey: "assuredName",
//     header: nameHeader("Assured Name"),
//     cell: nameCell("assuredName"),
//     enableHiding: true,
//     enableSorting: false,
//   },
//   {
//     id: "agentId",
//     accessorKey: "agentId",
//     header: nameHeader("Agent Id"),
//     cell: nameCell("agentId"),
//     enableHiding: true,
//     enableSorting: false,
//   },
//   {
//     id: "agentName",
//     accessorKey: "agentName",
//     header: nameHeader("Agent"),
//     cell: nameCellWithSubtext({
//       primaryKey: "agentName",
//       secondaryKey: "agentId",
//     }),
//     enableSorting: false,
//     enableHiding: true,
//   },
//   {
//     id: "Underwriter",
//     accessorKey: "underwriterName",
//     header: nameHeader("Underwriter"),
//     cell: nameCell("Underwriter"),
//     enableSorting: false,
//     enableHiding: true,
//   },
//   {
//     id: "Updated",
//     accessorKey: "updatedAt",
//     header: dateHeader("Last update"),
//     cell: dateCellMoment("Updated"),
//     enableSorting: true,
//     enableHiding: true,
//   },
//   {
//     id: "status",
//     accessorKey: "status",
//     header: nameCellHeaderWide("Status"),
//     cell: statusCell({
//       id: "status",
//       schema: statuses,
//       url: "account/requests",
//     }),
//     filterFn: (row, value, selectedValues: string[]) =>
//       selectedValues.includes(String(row.getValue(value))),
//     enableSorting: false,
//     enableHiding: true,
//   },
//   {
//     id: "more",
//     accessorKey: "more",
//     header: pagelinkHeader({ icon: Cog8ToothIcon }),
//     cell: activityOptions("id"),
//     enableSorting: false,
//   },
// ]);
