import React, { useCallback } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
} from "@nextui-org/react";
import type { CryptoAsset } from "@/app/ctx/crypto";
import { ChevronDown } from "lucide-react";
import { ChevronUpIcon } from "@heroicons/react/24/outline";

interface Column {
  uid: keyof CryptoAsset | "actions";
  name: string;
}

const columns: Column[] = [
  { name: "SYMBOL", uid: "symbol" },
  { name: "USD", uid: "usd" },
];

export default function CryptoList(props: { list: CryptoAsset[] | undefined }) {
  const src = (symbol: string) =>
    `https://raw.githubusercontent.com/spothq/cryptocurrency-icons/1a63530be6e374711a8554f31b17e4cb92c25fa5/svg/icon/${symbol}.svg`;
  const renderCell = useCallback(
    (asset: CryptoAsset, columnKey: keyof CryptoAsset | "actions") => {
      const cellValue = asset[columnKey as keyof CryptoAsset];

      switch (columnKey) {
        case "symbol":
          return (
            <User
              avatarProps={{
                size: "sm",
                radius: "full",
                src: src(asset.symbol),
              }}
              description={asset.name}
              name={cellValue.toString().toUpperCase()}
              classNames={{
                wrapper: "bg-transparent -space-y-0.5",
                name: "text-lg font-inter font-extrabold opacity-80",
                description: "text-xs font-mono font-light opacity-60",
              }}
            >
              {asset.name}
            </User>
          );
        case "usd":
          return (
            <div className="flex flex-col -space-y-0.5 font-mono">
              <div className="flex items-center justify-end space-x-2">
                {asset.h_change < 0 ? (
                  <ChevronDown className="size-3 text-rose-400/80" />
                ) : (
                  <ChevronUpIcon className="size-3 text-teal-400/80" />
                )}
                <p className="text-lg text-sky-50/90">
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                    currencyDisplay: "narrowSymbol",
                    maximumFractionDigits: 2,
                  }).format(asset.usd)}
                </p>
              </div>
              <p className="text-[10px] font-light opacity-40">
                <span className="pr-[2px] font-inter">₱</span>
                {new Intl.NumberFormat("en-US", {
                  currencyDisplay: "narrowSymbol",
                  maximumFractionDigits: 2,
                }).format(asset.php)}
              </p>
            </div>
          );
        default:
          return cellValue;
      }
    },
    [],
  );

  return (
    <Table
      removeWrapper
      aria-label="Example table with custom cells"
      classNames={{
        thead: "bg-transparent rounded-[0px]",
        th: "bg-transparent rounded-[0px]",
        tbody: "text-indigo-50 font-bold text-lg",
        wrapper: "bg-[#1e1e1e]",
        emptyWrapper: "bg-[#1d1d1d]",
      }}
      radius="none"
      color="primary"
      hideHeader
      fullWidth
      selectionMode="single"
      selectionBehavior="toggle"
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "usd" ? "end" : "start"}
          >
            .
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={props.list ?? []} isLoading={props.list?.length === 0}>
        {(item) => (
          <TableRow key={item.rank}>
            {(columnKey) => (
              <TableCell>
                {renderCell(item, columnKey as keyof CryptoAsset)}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
