import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/24/outline";
import { type Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BeachSelect, BeachSelectItem } from "./styles";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
}

const sizes = [10, 20, 30, 40, 50];

export function DataTablePagination<TData>({
  table,
}: DataTablePaginationProps<TData>) {
  return (
    <div className="flex h-[46px] w-full items-center border-y-[0.33px] bg-white/10 px-4 text-xs">
      {/* <div className="text-muted-foreground flex-1 text-sm">
        {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} row(s) selected.
      </div> */}
      <div className="flex w-full items-center justify-between lg:space-x-8">
        <div className="flex items-center space-x-4 portrait:space-x-2">
          <p className="text-opus font-sans text-xs">Rows</p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value: string) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="bg-dyan/5 flex h-[36px] w-[44px] items-center rounded-md border-[0.6px] px-2 text-cyan-700 portrait:w-fit">
              <SelectValue
                className="font-jet"
                placeholder={table.getState().pagination.pageSize}
              />
            </SelectTrigger>
            <BeachSelect side="top">
              {sizes.map((pageSize) => (
                <BeachSelectItem
                  selected={pageSize === table.getState().pagination.pageSize}
                  key={pageSize}
                  value={`${pageSize}`}
                  className="text-sky-50"
                >
                  {pageSize}
                </BeachSelectItem>
              ))}
            </BeachSelect>
          </Select>
        </div>
        <div className="flex w-fit items-center justify-center whitespace-nowrap font-jet text-[10px] font-light text-primary">
          {table.getState().pagination.pageIndex + 1} / {table.getPageCount()}
        </div>
        <div className="flex items-center space-x-1 px-2 sm:px-0 md:space-x-4">
          <Button
            variant="ghost"
            className="hidden size-7 bg-transparent p-0 lg:flex"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to first page</span>
            <ChevronDoubleLeftIcon className="size-4 stroke-2 text-sky-700" />
          </Button>
          <Button
            variant="ghost"
            className="size-7 p-0"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeftIcon className="size-4 stroke-2 text-cyan-700" />
          </Button>
          <Button
            variant="ghost"
            className="size-7 p-0"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRightIcon className="size-4 stroke-2 text-cyan-700" />
          </Button>
          <Button
            variant="ghost"
            className="hidden w-[36px] p-0 lg:flex"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to last page</span>
            <ChevronDoubleRightIcon className="size-4 stroke-2 text-cyan-700" />
          </Button>
        </div>
      </div>
    </div>
  );
}
