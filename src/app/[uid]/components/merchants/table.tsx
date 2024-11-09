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

import { Table, TableBody } from "@/components/ui/table";
import { EmptyRequestTable, LoadingTable } from "@/components/ui/table/empty";
import {
  RowMotion,
  rowStyles,
} from "@/components/ui/table/components/row-motion";
import { Toolbar } from "./toolbar";
import { useState } from "react";
import tw from "tailwind-styled-components";
import { PhCell } from "@/components/ui/table/components/styles";
import { useScrollCtx } from "@/app/ctx/scroll";
import { cn } from "@/lib/utils";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  loading: boolean;
  toolbarActions: [boolean, VoidFunction];
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

  const { scrollPosition } = useScrollCtx();

  return (
    <TableContainer>
      <Toolbar table={table} toolbarActions={toolbarActions} />
      <TableInner
        className={cn({
          "h-[calc(100vh-100px)] overflow-y-scroll": scrollPosition > 230,
        })}
      >
        <Table>
          {/* <PhHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="border-r-[0.33px] border-foreground"
              >
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    colSpan={header.colSpan}
                    className="border-r-[0.33px] border-dashed border-foreground"
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
      {/* <DataTablePagination table={table} /> */}
    </TableContainer>
  );
}
const TableContainer = tw.div`
  w-full overflow-hidden bg-background h-[calc(100vh-84px)]
  `;
const TableInner = tw.div`
  h-fit pb-24
  `;
