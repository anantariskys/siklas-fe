"use client";

import React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { DataTableToolbar } from "./data-table-toolbar";
import { DataTablePagination } from "./data-table-pagination";
import DataTableModals from "./data-table-modal";
import { DataTableModalProvider } from "./data-table-context";

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading?: boolean;
  searchKey?: keyof TData;
  title?: string;
  subtitle?: string;
  withPagination?: boolean;
  // tambahan
  onSearchInput?: (value: string) => void;
  page?: number;
  limit?: number;
  total?: number;
  onPageChange?: (newPage: number) => void;
  onLimitChange?: (newLimit: number) => void;
  searchValue?: string;
  toolbarExtra?: React.ReactNode;
  addModal?: React.ReactNode;
  editModal?: (data: TData) => React.ReactNode;
  deleteModal?: (data: TData) => React.ReactNode;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  isLoading = false,
  searchKey,
  title,
  subtitle,
  onSearchInput,
  page,
  limit,
  total,
  onPageChange,
  onLimitChange,
  withPagination = true,
  searchValue,

  /**
   * Slot untuk menambahkan filter tambahan di toolbar
   */
  toolbarExtra,

  /**
   * modal tambahan untuk add, edit, delete
   */
  addModal,
  editModal,
  deleteModal,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: (val) => setSorting(val),
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <DataTableModalProvider>
      <div className="w-full space-y-6">
        {(title || subtitle) && (
          <div className="flex flex-col">
            {title && <h2 className="text-2xl font-semibold">{title}</h2>}
            {subtitle && (
              <p className="text-sm text-muted-foreground">{subtitle}</p>
            )}
          </div>
        )}

        <DataTableToolbar
          searchKey={searchKey}
          onSearchChange={onSearchInput}
          search={searchValue}
          addModal={addModal}
        >
          {toolbarExtra}
        </DataTableToolbar>

        <div className="rounded-2xl border bg-white shadow-sm overflow-hidden">
          <Table>
            <TableHeader className="bg-gray-50">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className="font-medium text-gray-600"
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>

            <TableBody>
              {isLoading ? (
                [...Array(5)].map((_, i) => (
                  <TableRow key={i}>
                    {columns.map((_, j) => (
                      <TableCell key={j}>
                        <Skeleton className="h-5 w-full" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="text-center text-gray-500 py-8"
                  >
                    Tidak ada data untuk ditampilkan.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {withPagination &&
          page !== undefined &&
          limit !== undefined &&
          total !== undefined &&
          onPageChange &&
          onLimitChange && (
            <DataTablePagination
              page={page}
              limit={limit}
              total={total}
              onPageChange={onPageChange}
              onLimitChange={onLimitChange}
            />
          )}

        <DataTableModals
          addModal={addModal}
          editModal={editModal}
          deleteModal={deleteModal}
        />
      </div>
    </DataTableModalProvider>
  );
}
