import {
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
} from "@tanstack/react-table";

import { Table, TableBody } from "./";
import { EmptyRequestTable, LoadingTable } from "./empty";
import { DataTablePagination } from "./components/pagination";
import { RowMotion, rowStyles } from "./components/row-motion";
import { Toolbar } from "./components/toolbar";
import { useState } from "react";
import tw from "tailwind-styled-components";
import { PhCell } from "./components/styles";
import { type MotionValue } from "framer-motion";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  loading: boolean;
  toolbarActions: [boolean, VoidFunction];
  scrollYProgress: MotionValue<number>;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  loading,
  toolbarActions,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = useState({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable<TData>({
    data,
    columns,
    state: {
      sorting,
      columnVisibility: {
        agentId: false,
      },
      rowSelection,
      columnFilters,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  return (
    <TableContainer>
      <Toolbar table={table} toolbarActions={toolbarActions} />
      <TableInner>
        <Table>
          {/* <PhHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="border-dyan/40 border-b-[0.33px]"
              >
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    colSpan={header.colSpan}
                    className="border-dyan/40 border-r-[0.33px] border-dashed"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </PhHeader> */}
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <RowMotion
                  {...rowStyles}
                  transition={{
                    delay: Math.random() / 8,
                  }}
                  key={row.getValue("uid")}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <PhCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </PhCell>
                  ))}
                </RowMotion>
              ))
            ) : loading ? (
              <LoadingTable colSpan={columns.length} />
            ) : (
              <EmptyRequestTable colSpan={columns.length} loading={loading} />
            )}
          </TableBody>
        </Table>
      </TableInner>
      <DataTablePagination table={table} />
    </TableContainer>
  );
}
const TableContainer = tw.div`
  bg-primary-50 h-full
  `;
const TableInner = tw.div`
  h-full overflow-y-scroll
  `;
