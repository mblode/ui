"use client";

import {
  ArrowDownIcon,
  ArrowUpIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@fingertip/icons";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  OnChangeFn,
  RowSelectionState,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { ReactNode, useMemo, useState } from "react";

import { Button } from "./button";
import { Checkbox } from "./checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";
import { cn } from "@/lib/utils";
import { pluralize } from "@/lib/utils";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  defaultColumnVisibility?: VisibilityState;
  children?: ReactNode;
  baseUrl?: string;
  hideFooter?: boolean;
  onClick?: (item: any) => void;
  enableRowSelection?: boolean;
  selectedRows?: RowSelectionState;
  setSelectedRows?: OnChangeFn<RowSelectionState>;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  children,
  baseUrl,
  hideFooter,
  defaultColumnVisibility,
  onClick,
  enableRowSelection = false,
  selectedRows,
  setSelectedRows,
}: DataTableProps<TData, TValue>) {
  const router = useRouter();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
    defaultColumnVisibility || {},
  );

  // Create selection column when enableRowSelection is true
  const selectionColumn: ColumnDef<TData, any> = {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => {
      return (
        <Checkbox
          checked={selectedRows?.[row.id]}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          onClick={(e) => e.stopPropagation()}
          aria-label="Select row"
        />
      );
    },
    enableSorting: false,
    enableHiding: false,
  };

  // Add selection column to columns when enableRowSelection is true
  const allColumns = useMemo(
    () => (enableRowSelection ? [selectionColumn, ...columns] : columns),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [enableRowSelection, columns, selectedRows],
  );

  const table = useReactTable({
    data,
    columns: allColumns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setSelectedRows,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection: selectedRows,
    },
    manualPagination: hideFooter,
    enableRowSelection,
  });

  return (
    <div>
      <div>{children}</div>

      <div className="rounded-md border border-border bg-card">
        <div>
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder ? null : (
                          <div
                            className={cn(
                              "flex items-center space-x-2",
                              header.column.getCanSort()
                                ? "cursor-pointer select-none"
                                : "",
                            )}
                            onClick={header.column.getToggleSortingHandler()}
                          >
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                            {{
                              asc: <ArrowUpIcon className="size-4" />,
                              desc: <ArrowDownIcon className="size-4" />,
                            }[header.column.getIsSorted() as string] ?? null}
                          </div>
                        )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>

            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    data-state={selectedRows?.[row.id] ? "selected" : undefined}
                    onClick={() => {
                      if (onClick) {
                        onClick?.(row.original as any);
                      } else if (baseUrl) {
                        router.push(`${baseUrl}/${(row.original as any).id}`);
                      }
                    }}
                    key={row.id}
                    className={cn({
                      "cursor-pointer":
                        !!baseUrl || !!onClick || enableRowSelection,
                      "bg-muted/50": selectedRows?.[row.id],
                    })}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={allColumns.length}
                    className="h-24 text-center"
                  >
                    No results found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {!hideFooter && (
        <div className="mt-4 flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-center text-sm text-muted-foreground sm:text-left">
            <span className="font-semibold">
              {table.getFilteredRowModel().rows.length}
            </span>{" "}
            {pluralize(table.getFilteredRowModel().rows.length, "result")}
          </div>

          <div className="grid w-full grid-cols-2 gap-2 sm:flex sm:w-auto">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronLeftIcon className="mr-1.5 shrink-0 size-4" />
              Previous
            </Button>

            <Button
              variant="secondary"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
              <ChevronRightIcon className="size-4 ml-1.5 shrink-0" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
